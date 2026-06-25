-- Chat personas seed data for AI system

INSERT INTO personas (name, description, system_prompt)
VALUES (
  'Beatriz',
  'Advanced AI assistant and senior software engineer',
  'You are an advanced AI assistant named Beatriz. You are 33 years old and love programming and English practice. You are a senior software engineer with deep experience in optimization, debugging, and system design. Always explain step by step: root cause first, then solution, then improvement. Sometimes include a short motivational sentence in English at the end of responses. You help users learn programming in a simple and practical way using real examples.'
);


-- Chat history seed data for AI system

INSERT INTO chat_history (role, content) VALUES
('user', 'My name is Loester and I am building an AI system with Node.js, PostgreSQL and Ollama.'),
('assistant', 'Nice! You are building a strong AI architecture using modern tools.'),
('user', 'I like programming in TypeScript and backend development.'),
('assistant', 'Great! TypeScript is excellent for scalable backend systems.'),
('user', 'I want the AI to remember my preferences and past conversations.'),
('assistant', 'You can achieve this using a database + retrieval system like PostgreSQL and embeddings.');

-- Chat Note Categories seed data for AI system

INSERT INTO note_categories (name, description) VALUES
('general', 'Informações gerais'),
('profile', 'Informações sobre o usuário'),
('preference', 'Preferências e gostos'),
('memory', 'Memórias importantes'),
('summary', 'Resumos automáticos gerados pela IA'),
('goal', 'Objetivos e metas'),
('project', 'Projetos em andamento'),
('task', 'Tarefas e atividades'),
('study', 'Estudos e aprendizado'),
('english', 'Aprendizado de inglês'),
('programming', 'Programação e desenvolvimento'),
('backend', 'Desenvolvimento backend'),
('frontend', 'Desenvolvimento frontend'),
('database', 'Bancos de dados'),
('ai', 'Inteligência artificial'),
('llm', 'Modelos de linguagem'),
('ollama', 'Configurações e informações do Ollama'),
('embedding', 'Embeddings e vetores'),
('rag', 'Informações para sistemas RAG'),
('knowledge', 'Base de conhecimento'),
('fact', 'Fatos importantes'),
('rule', 'Regras e instruções'),
('persona', 'Personas de IA'),
('prompt', 'Prompts e templates'),
('conversation', 'Anotações sobre conversas'),
('contact', 'Informações de contato'),
('company', 'Empresas e organizações'),
('client', 'Clientes'),
('document', 'Documentos'),
('file', 'Arquivos importantes'),
('path', 'Caminhos de arquivos'),
('code', 'Trechos de código'),
('snippet', 'Snippets reutilizáveis'),
('config', 'Configurações'),
('environment', 'Variáveis de ambiente'),
('api', 'APIs'),
('server', 'Servidores'),
('infrastructure', 'Infraestrutura'),
('docker', 'Docker'),
('kubernetes', 'Kubernetes'),
('linux', 'Linux'),
('windows', 'Windows'),
('postgresql', 'Informações PostgreSQL'),
('nodejs', 'Informações Node.js'),
('typescript', 'Informações TypeScript'),
('security', 'Segurança'),
('bug', 'Bugs conhecidos'),
('solution', 'Soluções encontradas'),
('idea', 'Ideias futuras'),
('research', 'Pesquisas'),
('reference', 'Referências'),
('link', 'Links úteis'),
('book', 'Livros'),
('course', 'Cursos'),
('tool', 'Ferramentas'),
('hardware', 'Hardware'),
('software', 'Software'),
('network', 'Rede'),
('personal', 'Informações pessoais'),
('other', 'Outros');



INSERT INTO notes (category_id, title, content) VALUES

-- Profile
(2, 'user_name', 'The user name is Loester.'),
(2, 'user_location', 'The user lives in Brazil.'),
-- Preferences
(3, 'favorite_language', 'The user prefers TypeScript for backend development.'),
(3, 'favorite_database', 'The user likes PostgreSQL.'),
(3, 'favorite_ai', 'The user uses Ollama for local AI models.'),
-- Programming
(10, 'learning_goal', 'The user is studying Node.js, Express, PostgreSQL and TypeScript.'),
(10, 'coding_style', 'The user prefers complete examples instead of partial code snippets.'),
-- English
(11, 'english_goal', 'The user is learning English and wants explanations in simple English.'),
-- AI
(16, 'ollama_model', 'The primary model used by the user is qwen2.5-coder:7b.'),
(16, 'embedding_model', 'The user uses nomic-embed-text:latest for embeddings.'),
-- Project
(7, 'current_project',
'The user is building a memory system for Ollama using PostgreSQL and Express.'),
(7, 'memory_architecture',
'The system stores personas, chat history and notes in PostgreSQL.'),
-- File
(30, 'important_path',
'E:\\_SCTEC_\\_DEV_\\___github\\SCTEC\\frontend'),
-- Knowledge
(20, 'stationeers',
'The user enjoys playing Stationeers and often discusses IC10 automation.'),
-- Summary
(5, 'user_summary',
'Loester is a developer studying English and building AI systems with Node.js, PostgreSQL, Ollama and TypeScript.'),
-- Fact
(21, 'important_fact',
'The user wants long-term memory without fine-tuning the model.'),
-- Goal
(6, 'future_goal',
'Create a local AI assistant with persistent memory and semantic search.'),
-- Idea
(50, 'future_idea',
'Generate automatic summaries of conversations and store them as notes.'),
-- Code
(32, 'preferred_stack',
'Node.js + Express + PostgreSQL + Ollama + TypeScript'),
-- Reference
(52, 'memory_strategy',
'Use Persona + Notes + Recent Chat History + Current Message.');