async function removeDuplicates() {
    const client = new Client(dbConfig);

    await client.connect();

    const deleteDuplicatesQuery = `
  WITH cte AS (
    SELECT id, geom, tags,
      ROW_NUMBER() OVER(PARTITION BY geom, tags ORDER BY id) AS rn
    FROM osm_ways
  )
  DELETE FROM osm_ways
  WHERE id IN (SELECT id FROM cte WHERE rn > 1);
  `;

    try {
        const response = await client.query(deleteDuplicatesQuery);
        console.log('Duplicates deleted successfully', response.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
    }

    await client.end();
}

removeDuplicates();
