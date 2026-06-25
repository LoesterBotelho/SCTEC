import { saveNote } from "../repositories/notes.repository";
import { getCategories } from "../repositories/categories.repository";
import { sendToOllama } from "./ollama.service";

export async function generateMemory(
  client: any,
  history: any[],
) {
  const categories = await getCategories(client);

  const categoriesText = categories
    .map((c: any) => `${c.id}=${c.name}`)
    .join("\n");

  const historyText = history
    .map((m: any) => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = `
Analyze the conversation.

Available categories:

${categoriesText}

Extract memories.

Return ONLY:

category_id|key|value

Example:

1|name|Loester
2|country|Brazil
3|favorite_language|TypeScript

Conversation:

${historyText}
`;

  const result = await sendToOllama([
    {
      role: "user",
      content: prompt,
    },
  ]);

  console.log(result);
}