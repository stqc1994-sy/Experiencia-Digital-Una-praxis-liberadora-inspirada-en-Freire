// Please install OpenAI SDK first: `npm install openai`

const OpenAI = require("openai");
const envX = require("../../lib/numex97.js");
const DEFAULT_DEEPSEEK_API_URL = "https://api.deepseek.com";
const DEFAULT_DEEPSEEK_SYSTEM_PROMPT = "You are a helpful assistant.";
const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";

// This will decode and load your .env file
envX().then(async (env) => {

  async function load() {
    const openai = new OpenAI({
      baseURL: env.DEEPSEEK_API_BASE_URL || DEFAULT_DEEPSEEK_API_URL,
      apiKey: env.DEEPSEEK_API_KEY,
    });
    return openai;
  }

  async function main() {
    const openai = await load();
    const completion = await openai.chat.completions.create({
      messages: [{
        role: "system", content: env.DEEPSEEK_SYSTEM_PROMPT || DEFAULT_DEEPSEEK_SYSTEM_PROMPT
      }],
      model: env.DEEPSEEK_MODEL || DEFAULT_DEEPSEEK_MODEL,
    });

    console.log(completion.choices[0].message.content);
  }

  main();
});