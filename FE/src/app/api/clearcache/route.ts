import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath  } from 'next/cache'

export async function GET(request: Request) {
  revalidateTag('Comics');
  revalidatePath('/');
  const response = NextResponse.json({ message: 'Clear success' }, { status: 200 });
  const baseApi = process.env.NEXT_PUBLIC_BASE_API || '*';
  response.headers.set('Access-Control-Allow-Origin', baseApi);

  return response;
}