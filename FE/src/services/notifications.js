let baseUrl = process.env.NEXT_PUBLIC_BASE_API + '/api';
export async function getNotificationById(id){
    const response = await fetch(baseUrl + '/users/getNotificationById/' + id);
    const data = await response.json();
    return data;
}