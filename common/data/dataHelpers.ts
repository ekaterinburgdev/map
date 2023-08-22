export async function fetchAPI(url: string) {
    const response = await fetch(url);
    return response.json();
}
