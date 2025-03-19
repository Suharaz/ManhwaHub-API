let baseUrl = process.env.NEXT_PUBLIC_BASE_API + '/api';
let revalidateTime = Number(process.env.NEXT_PUBLIC_TIME_CACHE) || 60;

let option = { next: {revalidate: revalidateTime, tags: ['Authors']} };
export async function getAllAuthors() {
    const response = await fetch(baseUrl + '/authors/getAllAuthors', option);
    const data = await response.json();
    return data;
}