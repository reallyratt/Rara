import { GoogleGenAI } from "@google/genai";

export interface FormData {
  rating: number;
  bestActivity: string;

  worstActivity: string;
  fulfilledExpectation: string;
  wishes: string;
}

const createPrompt = (data: FormData): string => {
  return `
    Please format the following answers into a friendly and casual email body. The answers are from a user named Rara.

    The output should be ONLY the email content, ready to be copied and pasted.
    
    Start with a subject line: "Subject: Jawaban Form dari Rara!"
    
    Then, the body should start with a friendly greeting, present the answers clearly, and end with a nice closing.
    
    Here are the answers to include:
    - Collective rating (1-10): ${data.rating}
    - Best activity: ${data.bestActivity}
    - Worst activity: ${data.worstActivity}
    - Fulfilled expectation: ${data.fulfilledExpectation}
    - Wishes for the future: ${data.wishes}
    
    IMPORTANT: Do not add any extra commentary, introduction, or instructions like "Here is the email body" or "Just copy the text below". The output must start directly with "Subject:".
  `;
};

export const formatAnswersForEmail = async (data: FormData): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = createPrompt(data);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to format answers using Gemini API.");
  }
};
