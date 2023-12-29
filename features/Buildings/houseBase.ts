export async function getHouseMeta() {
    return fetch('https://map-backend.netlify.app/house-meta.json')
        .then((res) => res.json())
        .then((data) => ({
            years: data.years.map((item) => item.count || null),
            levels: data.levels.map((item) => item.count || null),
            health: data.health.map((item) => item.count || null),
        }));
}
