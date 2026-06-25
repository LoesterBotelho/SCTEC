import axios from "axios";

const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "qwen2.5-coder:7b";

export async function sendToOllama(messages: any[]) {
  const response = await axios.post(
    OLLAMA_URL,
    {
      model: MODEL,
      messages,
      stream: false,
    },
  );

  return response.data;
}