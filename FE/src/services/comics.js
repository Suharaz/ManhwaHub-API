import { getAuthToken } from "@/hooks/useAuth";

let baseUrl = process.env.NEXT_PUBLIC_BASE_API + '/api';

let option = { next: {revalidate: 1000, tags: ['Comics']} };
let optionNoStore = { cache: 'no-store' };

export async function getComics() {
  const response = await fetch(baseUrl + '/home', option);
  const data = await response.json();
  return data;
}

export async function getComic(slug) {
  const response = await fetch(baseUrl + '/home/' + slug, optionNoStore);
  const data = await response.json();
  return data;
}

export async function getChapter(slug, chapter) {
  const token = await getAuthToken();
  const response = await fetch(baseUrl + '/comics/getChapter/' + slug + '/' + chapter, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token?.value}`
    }
  }, 3600);
  const data = await response.json();
  return data;
}

export async function getComicsByList(slug, page) {
  const response = await fetch(baseUrl + '/comics/getComicsByList/' + slug + '?page=' + page, optionNoStore);
  const data = await response.json();
  return data;
}

export async function getComicsByCategory(slug, page) {
  const response = await fetch(baseUrl + '/comics/getComicsByCategory/' + slug + '?page=' + page, optionNoStore);
  const data = await response.json();
  return data;
}

export async function getComicsByAuthor(slug, page) {
  const response = await fetch(baseUrl + '/comics/getComicsByAuthor/' + slug + '?page=' + page, optionNoStore);
  const data = await response.json();
  return data;
}

export async function getAllComics() {
  const response = await fetch(baseUrl + '/comics/getAllComics', option);
  const data = await response.json();
  return data;
}

export async function getComicsByPage(page) {
  const response = await fetch(baseUrl + '/comics/getComicsByPage?page=' + page, optionNoStore);
  const data = await response.json();
  return data;
}

export async function getTotalComicAndChapter() {
  const response = await fetch(baseUrl + '/comics/getTotalComicAndChapter', option);
  const data = await response.json();
  return data;
}

export async function getChaptersByPage(page) {
  const response = await fetch(baseUrl + '/comics/getChaptersByPage?page=' + page, optionNoStore);
  const data = await response.json();
  return data;
}

export async function getComicsByLetter(letter, page) {
  const response = await fetch(baseUrl + '/comics/getComicsByLetter/' + letter + '?page=' + page, optionNoStore);
  const data = await response.json();
  return data;
}