let baseUrl = process.env.NEXT_PUBLIC_BASE_API + '/api';
let revalidateTime = Number(process.env.NEXT_PUBLIC_TIME_CACHE) || 60;

let option = { next: {revalidate: revalidateTime, tags: ['Categories']} };
export async function getAllCategories() {
    const response = await fetch(baseUrl + '/genres', { cache: 'no-store' });
    const data = await response.json();
    return data;
}