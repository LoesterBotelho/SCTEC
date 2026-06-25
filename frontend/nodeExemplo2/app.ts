import express from "express";

import { pool } from "./src/config/database";
import { getPersona } from "./src/repositories/persona.repository";
import { getHistory, saveMessage } from "./src/repositories/chat.repository";
import { getNotes } from "./src/repositories/notes.repository";

import {
  buildMessages,
  buildNotesText,
} from "./src/services/prompt.service";

import { sendToOllama } from "./src/services/ollama.service";
import { generateMemory } from "./src/services/memory.service";