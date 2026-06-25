export async function getNotes(client: any) {
  const result = await client.query(`
    SELECT
      category_id,
      note_key,
      note_value
    FROM notes
    ORDER BY id ASC
  `);

  return result.rows;
}

export async function saveNote(
  client: any,
  categoryId: number,
  key: string,
  value: string
) {
  await client.query(
    `
    INSERT INTO notes
    (
      category_id,
      note_key,
      note_value
    )
    VALUES
    (
      $1,
      $2,
      $3
    )
    `,
    [
      categoryId,
      key,
      value,
    ]
  );
}