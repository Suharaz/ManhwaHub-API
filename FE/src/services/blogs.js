let baseUrl = process.env.NEXT_PUBLIC_BASE_API + '/api';

let option = {cache: 'no-cache'}; 
export async function getBlogs(page) {
  const response = await fetch(baseUrl + '/blogs/getBlogs?page=' + page, option);
  const data = await response.json();
  return data;
}

export async function getBlog(slug) {
  const response = await fetch(baseUrl + '/blogs/getBlog/' + slug, option);
  const data = await response.json();
  return data;
}

export async function getAllBlogs() {
  const response = await fetch(baseUrl + '/blogs/getAllBlogs', option);
  const data = await response.json();
  return data;
}