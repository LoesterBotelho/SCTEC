export function logJson(
  title: string,
  data: any
) {
  console.log(
    `\n========== ${title} ==========`
  );

  console.log(
    JSON.stringify(data)
  );
}