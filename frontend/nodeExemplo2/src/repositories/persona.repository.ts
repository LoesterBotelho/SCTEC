export async function getPersona(client: any) {
  const result = await client.query(
    `
    SELECT system_prompt
    FROM personas
    WHERE name = $1
    LIMIT 1
    `,
    ["Beatriz"]
  );

  return result.rows[0]?.system_prompt || "";
}