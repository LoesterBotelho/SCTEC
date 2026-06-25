export async function getHistory(client: any) {
  const result = await client.query(`
    SELECT role, content
    FROM chat_history
    ORDER BY id ASC
  `);

  return result.rows;
}

export async function saveMessage(
  client: any,
  role: string,
  content: string
) {
  await client.query(
    `
    INSERT INTO chat_history
    (
      role,
      content
    )
    VALUES
    (
      $1,
      $2
    )
    `,
    [role, content]
  );
}