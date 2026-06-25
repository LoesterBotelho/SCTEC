export async function getCategories(client: any) {
  const result = await client.query(`
    SELECT *
    FROM categories
    ORDER BY id
  `);

  return result.rows;
}