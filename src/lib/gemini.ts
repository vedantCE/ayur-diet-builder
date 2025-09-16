import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export const generateDietSuggestions = async (patientProfile: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `As an Ayurvedic nutrition expert, suggest a personalized diet plan for:
    - Age: ${patientProfile.age}
    - Gender: ${patientProfile.gender}
    - Constitution: ${patientProfile.constitution}
    - Dietary Habits: ${patientProfile.dietaryHabits}
    - Health Issues: ${patientProfile.healthParameters}
    
    Provide 3 meal suggestions (breakfast, lunch, dinner) with Ayurvedic reasoning. Format as JSON:
    {
      "breakfast": {"name": "...", "reason": "..."},
      "lunch": {"name": "...", "reason": "..."},
      "dinner": {"name": "...", "reason": "..."}
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Gemini API error:', error);
    return null;
  }
};

export const analyzeRecipe = async (recipeText: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Analyze this recipe from Ayurvedic perspective:
    "${recipeText}"
    
    Provide analysis as JSON:
    {
      "ingredients": ["..."],
      "dosha_effects": {"vata": "...", "pitta": "...", "kapha": "..."},
      "taste": "...",
      "properties": ["..."],
      "recommendations": "..."
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Recipe analysis error:', error);
    return null;
  }
};