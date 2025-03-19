import {firefox} from 'playwright';
import { NextResponse } from "next/server";
import { Solver } from '@2captcha/captcha-solver';
import path from 'path';
import fs from 'fs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  let url = searchParams.get('url') || '';
  if(!key || key == ""){
    const response = NextResponse.json({ error: 'Not found key' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
  const solver = new Solver(key);
  let html = '';

  // const cookiesPath = path.join(process.cwd(), 'cookies.json');
  const domain = new URL(url).hostname.replace(/\./g, '_');
  const cookiesPath = path.join(process.cwd(), `${key}_${domain}_cookies.json`);

  try {
    const browser = await firefox.launch({ headless: true, devtools: false, });

    const context = await browser.newContext({ ignoreHTTPSErrors: true });

    if (fs.existsSync(cookiesPath)) {
      const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf8'));
      await context.addCookies(cookies);
    }

    const page = await context.newPage();

    const injectScriptPath = path.join(process.cwd(), 'inject.js');
    await page.addInitScript({ path: injectScriptPath });

    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    var consoleMessages: any = [];
    page.on('console', async (msg) => {
      const txt = msg.text();
      consoleMessages.push(txt);
    });

    await page.reload({ waitUntil: "networkidle" });
    console.log('Reloaded');
    
    let params;
    for (let msg of consoleMessages) {
      if (msg.includes('intercepted-params:')) {
        params = JSON.parse(msg.replace('intercepted-params:', ''));
        console.log('Found intercepted-params');
      }
    }
    if(params){
      const res = await solver.cloudflareTurnstile(params);

      await page.evaluate((token) => {
        if (typeof window.cfCallback === 'function') {
          console.log("Calling cfCallback with token:", token);
          window.cfCallback(token);
        } else {
          console.error("cfCallback function not found");
        }
      }, res.data);

      console.log(`Solved the captcha ${res.id}`);
      await page.waitForTimeout(5000);
    }

    html = await page.content();

    const cookies = await context.cookies();
    fs.writeFileSync(cookiesPath, JSON.stringify(cookies, null, 2));

    await browser.close();
    const response = NextResponse.json({ html }, { status: 200 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    console.error(error);
    const response = NextResponse.json({ error: error }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}