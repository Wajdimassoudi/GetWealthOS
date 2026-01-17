
import { GoogleGenAI } from "@google/genai";

export class AIService {
  // Model initialization is handled inside the request method to ensure the most current API key is used
  // and to strictly follow the SDK initialization guidelines.
  async getWealthAdvice(query: string, userContext: string) {
    try {
      // Correct initialization using process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are GetWealthOS Assistant. The user is from ${userContext}. Answer the following: ${query}`,
        config: {
          systemInstruction: "You are a professional wealth advisor and marketplace assistant. You help users find real estate, crypto tips, job advice, and product recommendations on GetWealthOS. Keep it concise, helpful, and polite."
        }
      });
      // Correctly accessing the .text property (not a method) from the response
      return response.text || "I'm sorry, I couldn't process that.";
    } catch (error) {
      console.error("AI Error:", error);
      return "The AI assistant is currently taking a break. Please try again later.";
    }
  }
}

export const aiService = new AIService();
