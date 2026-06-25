import pg from "pg";
import axios from "axios";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "masterkey",
  port: 5432,
});

const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "qwen2.5-coder:7b";

/**
 * Load persona
 */
async function getPersona(client: any) {
  const res = await client.query(
    "SELECT system_prompt FROM personas WHERE name = $1 LIMIT 1",
    ["Beatriz"]
  );

  return res.rows[0]?.system_prompt || "";
}

/**
 * Load chat history
 */
async function getChatHistory(client: any) {
  const res = await client.query(
    "SELECT role, content FROM chat_history ORDER BY id ASC"
  );

  return res.rows;
}

/**
 * Call Ollama with compact logs
 */
async function askOllama(messages: any[]) {
  const start = Date.now();

  const persona = messages.find(m => m.role === "system");
  const chat = messages.filter(m => m.role !== "system");

  console.log("\n================ PERSONA =================");
  console.log("JSON ENVIADO:", JSON.stringify(persona));

  console.log("\n================ CHAT =================");
  console.log("JSON ENVIADO:", JSON.stringify(chat));

  try {
    const res = await axios.post(OLLAMA_URL, {
      model: MODEL,
      messages,
      stream: false,
    });

    const duration = Date.now() - start;

    console.log("\n================ PERSONA RECEIVED =================");
    console.log("JSON RECEBIDO:", JSON.stringify(persona));

    console.log("\n================ CHAT RECEIVED =================");
    console.log("JSON RECEBIDO:", JSON.stringify(chat));

    console.log("\n================ RESPONSE =================");
    console.log("JSON RECEBIDO:", JSON.stringify(res.data));
    console.log("STATUS CODE:", res.status);
    console.log("DEU CERTO: SUCESSO");
    console.log("TIME (ms):", duration);

    console.log("\n---\n");

    return {
      ok: true,
      content: res.data.message.content,
      status: res.status,
      time: duration,
    };

  } catch (err: any) {
    const duration = Date.now() - start;

    console.log("\n================ RESPONSE =================");
    console.log("JSON RECEBIDO:", JSON.stringify(err?.response?.data || err));
    console.log("STATUS CODE:", err?.response?.status || 500);
    console.log("DEU CERTO: FALHA");
    console.log("TIME (ms):", duration);

    console.log("\n---\n");

    return {
      ok: false,
      error: err?.message || err,
      status: err?.response?.status || 500,
      time: duration,
    };
  }
}

/**
 * Main pipeline
 */
async function run() {
  const client = await pool.connect();

  try {
    console.log("\n STARTING AI PIPELINE...\n");

    // 1. Load persona
    const persona = await getPersona(client);

    // 2. Load chat history
    const history = await getChatHistory(client);

    // 3. Build messages
    const messages = [
      {
        role: "system",
        content: persona,
      },
      ...history,
    ];

    console.log("\n================ FINAL PAYLOAD =================");
    console.log(JSON.stringify(messages));

    // 4. Call AI
    const result = await askOllama(messages);

    // 5. Save result
    if (result.ok) {
      await client.query(
        "INSERT INTO chat_history (role, content) VALUES ($1, $2)",
        ["assistant", result.content]
      );

      console.log("\n SAVED TO DATABASE");
    } else {
      console.log("\n NOT SAVED (ERROR)");
    }

  } catch (err) {
    console.error("\n FATAL ERROR:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

run();