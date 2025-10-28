import { GoogleGenAI, Type } from "@google/genai";
import { JobData } from "../types";

const fetchJobDataForSkill = async (skill: string): Promise<JobData> => {
    // The API key is injected by the environment.
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const jobDataSchema = {
        type: Type.OBJECT,
        properties: {
            skill: {
                type: Type.STRING,
                description: 'The name of the skill being analyzed.',
            },
            jobs: {
                type: Type.STRING,
                description: 'A comma-separated list of 5-7 common job titles that require this skill.',
            },
            demand: {
                type: Type.INTEGER,
                description: 'An estimated integer between 0 and 100 representing the demand and importance percentage for this skill in the industry.',
            },
            icon: {
                type: Type.STRING,
                description: 'A single, relevant emoji that visually represents the skill category.',
            },
        },
        required: ["skill", "jobs", "demand", "icon"],
    };

    const prompt = `Analyze the skill "${skill}". Provide common job roles that require it and estimate its industry demand.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: jobDataSchema,
            },
        });

        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);

        // Basic validation
        if (typeof data.skill !== 'string' || typeof data.jobs !== 'string' || typeof data.demand !== 'number' || typeof data.icon !== 'string') {
            throw new Error("Invalid data structure received from AI.");
        }

        return data as JobData;

    } catch (error) {
        console.error("Error fetching from Gemini API:", error);
        throw new Error("Failed to get a valid response from the AI model.");
    }
};

export { fetchJobDataForSkill };
