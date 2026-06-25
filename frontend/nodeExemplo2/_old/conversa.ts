import express from "express";
import axios from "axios";
import pg from "pg";

const { Pool } = pg;

const app = express();
const port = 3002;

app.use(express.json());

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
 * Load Persona
 */
async function getPersona(client: any) {
  const result = await client.query(
    `
    SELECT system_prompt
    FROM personas
    WHERE name = $1
    LIMIT 1
  `,
    ["Beatriz"],
  );

  return result.rows[0]?.system_prompt || "";
}

/**
 * Load History
 */
async function getHistory(client: any) {
  const result = await client.query(`
    SELECT role, content
    FROM chat_history
    ORDER BY id ASC
  `);

  return result.rows;
}

/**
 * Save Message
 */
async function saveMessage(client: any, role: string, content: string) {
  await client.query(
    `
    INSERT INTO chat_history
    (role, content)
    VALUES ($1, $2)
  `,
    [role, content],
  );
}

/**
 * Build Prompt
 */
function buildMessages(
  persona: string,
  history: any[],
  currentMessage: string,
) {
  return [
    {
      role: "system",
      content: persona,
    },

    ...history,

    {
      role: "user",
      content: currentMessage,
    },
  ];
}

/**
 * Call Ollama
 */
async function askOllama(messages: any[]) {
  const start = Date.now();

  const persona = messages.find((m) => m.role === "system");

  const chat = messages.filter((m) => m.role !== "system");

  console.log("\n================ PERSONA =================");
  console.log("JSON ENVIADO:", JSON.stringify(persona));

  console.log("\n================ CHAT =================");
  console.log("JSON ENVIADO:", JSON.stringify(chat));

  try {
    const response = await axios.post(OLLAMA_URL, {
      model: MODEL,
      messages,
      stream: false,
    });

    const duration = Date.now() - start;

    console.log("\n================ RESPONSE =================");

    console.log("JSON RECEBIDO:", JSON.stringify(response.data));

    console.log("STATUS CODE:", response.status);

    console.log("RESULTADO: SUCESSO");

    console.log("TIME (ms):", duration);

    console.log("\n---\n");

    return {
      ok: true,
      content: response.data.message.content,
    };
  } catch (err: any) {
    const duration = Date.now() - start;

    console.log("\n================ RESPONSE =================");

    console.log("JSON RECEBIDO:", JSON.stringify(err?.response?.data || err));

    console.log("STATUS CODE:", err?.response?.status || 500);

    console.log("RESULTADO: FALHA");

    console.log("TIME (ms):", duration);

    console.log("\n---\n");

    return {
      ok: false,
      error: err?.message || "Unknown error",
    };
  }
}

/**
 * Health Check
 */
app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "Ollama Memory API",
  });
});

/**
 * Chat Endpoint
 */
app.post("/chat", async (req, res) => {
  const client = await pool.connect();

  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        success: false,
        error: "message is required",
      });
    }

    console.log("\n========================================");
    console.log("USER MESSAGE:", userMessage);
    console.log("========================================\n");

    /**
     * Load Data
     */
    const persona = await getPersona(client);

    const history = await getHistory(client);

    /**
     * Save User Message
     */
    await saveMessage(client, "user", userMessage);

    /**
     * Build Prompt
     */
    const messages = buildMessages(persona, history, userMessage);

    console.log("\n================ FINAL PAYLOAD =================");

    console.log(JSON.stringify(messages));

    /**
     * Ask AI
     */
    const result = await askOllama(messages);

    if (!result.ok) {
      return res.status(500).json({
        success: false,
        error: result.error,
      });
    }

    /**
     * Save Assistant
     */
    await saveMessage(client, "assistant", result.content);

    res.json({
      success: true,
      message: result.content,
    });
  } catch (err: any) {
    console.error("FATAL ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  } finally {
    client.release();
  }
});

/**
 * Start Server
 */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
