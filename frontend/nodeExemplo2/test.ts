import axios from "axios";

const URL = "http://localhost:3003/chat";

// const payload = {
//   message: "Hello, what is my name?",
// };

const payload = {
message: `
My name is Loester.
I was born on 22/08/2008.
I am a software developer and English student.
I live in Brazil.
I am building an AI memory system using Node.js, TypeScript, PostgreSQL, Express and Ollama.
My main project is called SCTEC.
I prefer TypeScript over JavaScript.
My favorite database is PostgreSQL.
I use VS Code as my primary IDE.
I am learning Kubernetes, Docker and Kind.
I have an Ollama server running locally on Windows.
I often use the models qwen2.5-coder:7b and qwen2.5-coder:1.5b.
I like backend development more than frontend development.
I study English every day and want to become fluent.
important_project_folder=E:\*SCTEC*\*DEV*\___github\SCTEC
important_file=E:\*SCTEC*\*DEV*\___github\SCTEC\README.md
email_perceptron=[perceptron@ml.pert.com](mailto:perceptron@ml.pert.com)
email_adalinen=[adaline@rede.adaline.com](mailto:adaline@rede.adaline.com)
I am currently working on an AI memory system that stores personas, chat history and notes inside PostgreSQL.
My goal is to create a local AI assistant with long term memory.
I frequently work with Express, Axios, PostgreSQL and TypeScript.
I want the AI to remember technologies I use, projects I work on, preferences, goals and important paths.
`
};


async function run() {
  try {
    console.log("\n================ REQUEST ================");
    console.log("JSON ENVIADO:");
    console.log(JSON.stringify(payload));

    const response = await axios.post(URL, payload);

    console.log("\n================ RESPONSE ================");
    console.log("STATUS CODE:");
    console.log(response.status);

    console.log("\nJSON RECEBIDO:");
    console.log(JSON.stringify(response.data));

    console.log("\nRESULTADO:");
    console.log("SUCESSO");

  } catch (err: any) {
    console.log("\n================ RESPONSE ================");

    console.log("STATUS CODE:");
    console.log(err?.response?.status || "UNKNOWN");

    console.log("\nJSON RECEBIDO:");
    console.log(
      JSON.stringify(
        err?.response?.data || err.message || err
      )
    );

    console.log("\nRESULTADO:");
    console.log("FALHA");
  }
}

run();