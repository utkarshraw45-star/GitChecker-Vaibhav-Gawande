import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize the client
const client = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeRepository = async (repoUrl: string): Promise<AnalysisResult> => {
  
  // We use the search tool to get real context about the repo
  const model = "gemini-2.5-flash"; 
  
  const prompt = `
    Act as a strict Senior Code Reviewer.
    Analyze the GitHub repository at this URL: ${repoUrl}

    Use Google Search to find details about this repository (languages, structure, purpose, README content) if you cannot access it directly.

    Task: Generate a "GitChecker" quality report in strictly raw JSON format.

    1. Scoring Logic:
       Analyze the repo based on these 4 metrics (0-100):
       - "Cleanliness": formatting, file naming, absence of clutter.
       - "Documentation": README quality, setup instructions, comments.
       - "Structure": folder organization, modularity.
       - "Best Practices": error handling, modern syntax, git usage.
       
       Score Calculation Instructions:
       The "score" field MUST be the exact integer average of the 4 breakdown values.

    2. Content Requirements:
       - Summary: Simple English, max 2 sentences.
       - Roadmap: 3-4 simple, actionable steps to improve the code.
       - Tech Stack: List languages and frameworks.

    CRITICAL OUTPUT RULE:
    - Return ONLY valid JSON.
    - Start with '{' and end with '}'.
    - NO Markdown code blocks (\`\`\`json).
    - NO conversational filler ("Here is the report").
    
    JSON Structure:
    {
      "score": number,
      "summary": string,
      "roadmap": string[],
      "breakdown": [
        { "name": "Cleanliness", "value": number },
        { "name": "Documentation", "value": number },
        { "name": "Structure", "value": number },
        { "name": "Best Practices", "value": number }
      ],
      "techStack": string[],
      "repositoryName": string
    }

    If the repository is invalid or cannot be analyzed, return a JSON with score 0 and a summary explaining why.
  `;

  try {
    const response = await client.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data received from AI");
    
    // Robust JSON Extraction
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');

    if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
      console.error("Raw AI Response:", text);
      throw new Error("Invalid response format. Please try again.");
    }

    const jsonString = text.substring(startIndex, endIndex + 1);
    
    try {
      const data = JSON.parse(jsonString) as AnalysisResult;
      
      // STRICT SCORE RE-CALCULATION
      // We calculate the score manually to prevent AI math errors or hallucinations.
      if (data.breakdown && Array.isArray(data.breakdown) && data.breakdown.length > 0) {
         // Safety: Ensure values are numbers before summing to avoid string concatenation
         const sum = data.breakdown.reduce((acc, item) => acc + (Number(item.value) || 0), 0);
         data.score = Math.round(sum / data.breakdown.length);
      } else {
         // Fallback if breakdown is missing
         data.score = data.score || 0;
         data.breakdown = [
           { name: "Cleanliness", value: 0 },
           { name: "Documentation", value: 0 },
           { name: "Structure", value: 0 },
           { name: "Best Practices", value: 0 }
         ];
      }
      
      return data;
      
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "String:", jsonString);
      throw new Error("Failed to parse analysis results.");
    }

  } catch (error) {
    console.error("Analysis failed", error);
    throw error;
  }
};