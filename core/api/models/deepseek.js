class Deepseek {
    
    constructor(openai, model, systemPrompt) {
        this.openai = openai;
        this.model = model;
        this.systemPrompt = systemPrompt;
    }
    
    async generateResponse() {
        const completion = await this.generateChatCompletion();
        return completion.choices[0].message.content;
    }

    async generateChoices() {
        const completion = await this.generateChatCompletion();
        return completion.choices;
    }

    async generateResponses() {
        const completion = await this.generateChatCompletion();
        return completion.choices.map(choice => choice.message.content);
    }

    async generateChatCompletion() {
        return await this.openai.chat.completions.create({
            messages: [{
                role: "system", content: this.getSystemPrompt()
            }],
            model: this.model,
        });
    }

    getSystemPrompt() {
        let activeSystemPrompt = this.systemPrompt;

        if (activeSystemPrompt.includes("\.json")) {
            const fs = require("fs");
            try {
                const jsonFileEndIndex = activeSystemPrompt.indexOf(".json") + 5;
                const filePath = activeSystemPrompt.substring(0, jsonFileEndIndex).split(" ").pop();
                const data = fs.readFileSync(filePath, "utf8");
                const systemPromptConfig = this.parseSystemPromptConfig(data);
                activeSystemPrompt += systemPromptConfig;
            } catch (err) {
                console.error(`Error reading system prompt file: ${err}`);
            }
        }
        return activeSystemPrompt;
    }

    parseSystemPromptConfig(data) {
        const systemPromptConfig = JSON.parse(data);
        const formattedPromptConfig = JSON.stringify(systemPromptConfig);
        return `: \n${formattedPromptConfig}`;
    }
}

class DeepseekLegacy extends Deepseek {
    constructor(baseURL, apiKey, model, systemPrompt) {
        const OpenAI = require("openai");
        const openai = new OpenAI({
            baseURL: baseURL,
            apiKey: apiKey,
        });
        super(openai, model, systemPrompt);
    }
}

module.exports.Deepseek = Deepseek;
module.exports.legacy = DeepseekLegacy;