// Please install OpenAI SDK first: `npm install openai`

const OpenAI = require("openai");
const envX = require("../../lib/numex97.js");
const DEFAULT_DEEPSEEK_API_URL = "https://api.deepseek.com";
const DEFAULT_DEEPSEEK_SYSTEM_PROMPT = "You are a helpful assistant.";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
const Deepseek = require("./models/deepseek.js");

// This will decode and load your .env file
envX().then(async (env) => {
  await main(env);
});

async function main(env) {
  const baseURL = env.DEEPSEEK_API_BASE_URL || DEFAULT_DEEPSEEK_API_URL,
    apiKey = env.DEEPSEEK_API_KEY, model = env.DEEPSEEK_MODEL || DEFAULT_DEEPSEEK_MODEL,
    systemPrompt = env.DEEPSEEK_SYSTEM_PROMPT || DEFAULT_DEEPSEEK_SYSTEM_PROMPT;

  const instance = new Deepseek.legacy(baseURL, apiKey, model, systemPrompt);

  console.log(await instance.generateResponse());
}