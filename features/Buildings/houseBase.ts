export async function getHouseMeta() {
    return fetch('https://tiles-map-kohl.vercel.app/house-meta.json')
        .then((res) => res.json())
        .then((data) => ({
            years: data.years.map((item) => item.count || null),
            levels: data.levels.map((item) => item.count || null),
            health: data.health.map((item) => item.count || null),
        }));
}
