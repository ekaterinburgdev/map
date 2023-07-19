const fs = require("fs");
const { Pool } = require("pg");

const dbConfig = {
  user: "baremaps",
  host: "localhost",
  database: "baremaps",
  password: "baremaps",
  port: 5432,
};

async function grouByField({ field, dbName }) {
  const pool = new Pool(dbConfig);
  const client = await pool.connect();

  //   SELECT COALESCE(tags->>'${field}', 'unknown') AS group_by_field, COUNT(*) AS count
  const query = `
    SELECT tags->'${field}' AS group_by_field, COUNT(*) AS count
    FROM ${dbName}
    WHERE tags ? 'building'
    GROUP BY group_by_field
  `;
  try {
    const result = await client.query(query);
    // console.log(result.rows);
    return result.rows;
  } catch (e) {
    console.log(" error: ", e.message);
  }
}

function getByOsmField(field) {
  return Promise.all(
    ["osm_ways", "osm_relations"]
      .map((dbName) => grouByField({ field, dbName }))
      .flat()
  ).then((items) => {
    return items.flat().reduce((acc, item) => {
      const key = item.group_by_field || "unknown";
      acc[key] = (acc[key] || 0) + parseInt(item.count);
      return acc;
    }, {});
  });
}

async function main() {
  const years = await getByOsmField("building:year");
  const health = await getByOsmField("building:health");
  const levels = await getByOsmField("building:levels");

  fs.writeFileSync(
    "house-meta.json",
    JSON.stringify({
      years,
      health,
      levels,
    })
  );
}

main();
