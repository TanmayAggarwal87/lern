import { GoogleGenAI } from '@google/genai';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  timestamp: string;
  concept: string;
}

interface Exercise {
  id: number;
  title: string;
  concept: string;
  difficulty: 'easy' | 'medium';
  estimatedMinutes: number;
  timestamp: string;
  description: string;
  example: string;
  requirements: string[];
  hints: string[];
  successCriteria: string;
}

interface LearningMaterials {
  summary: {
    title: string;
    mainTopics: string[];
    keyTakeaways: string[];
  };
  flashcards: Flashcard[];
  exercises: Exercise[];
}

async function generateLearningMaterials(
  videoTitle: string,
  duration: string,
  transcript: string
): Promise<LearningMaterials> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey,
  });

  const maxTranscriptLength = 200000;
  const truncatedTranscript = transcript.length > maxTranscriptLength 
    ? transcript.slice(0, maxTranscriptLength) + '...'
    : transcript;

  const prompt = `You are an expert educator creating study materials from a programming tutorial transcript.

VIDEO: ${videoTitle}
DURATION: ${duration}

COMPLETE TRANSCRIPT:
${truncatedTranscript}

ANALYZE THE TRANSCRIPT DEEPLY and create materials based on ACTUAL content discussed.

FLASHCARD RULES:
- Extract SPECIFIC technical facts, syntax rules, gotchas, and key concepts from the transcript
- Questions must be about concrete information mentioned in the video
- Focus on "must-remember" details that learners often forget
- Examples of GOOD flashcards:
  * "When must you use 'use client' directive in Next.js?" → "When using React hooks (useState, useEffect) or browser APIs"
  * "What's the syntax for dynamic routes in Next.js?" → "Create files like [id].tsx or [slug].tsx"
  * "How do you access route parameters in Next.js 13+?" → "Use const params = await props.params in async components"
- Make every flashcard test real knowledge from THIS specific video

EXERCISE RULES:
- Design CONCRETE coding tasks based on what the tutorial teaches
- Each exercise practices ONE specific technique from the video
- Bad: "Practice hooks"
- Good: "Build a like button that shows count and increments on click using useState"
- Include realistic requirements based on video content
- Match difficulty to what the video actually covers

KEEP TEXT CONCISE (under 120 characters per field).

Return valid JSON with 8 flashcards and 6 exercises:
{
  "summary": {
    "title": "Brief description of what video teaches",
    "mainTopics": ["Specific topic 1", "Specific topic 2", "Specific topic 3"],
    "keyTakeaways": ["Concrete takeaway 1", "Concrete takeaway 2", "Concrete takeaway 3"]
  },
  "flashcards": [
    {
      "id": 1,
      "question": "Specific question from video content?",
      "answer": "Clear factual answer based on transcript",
      "timestamp": "0:00",
      "concept": "Concept name"
    }
  ],
  "exercises": [
    {
      "id": 1,
      "title": "Specific task name",
      "concept": "What skill this practices",
      "difficulty": "easy",
      "estimatedMinutes": 15,
      "timestamp": "0:00",
      "description": "Clear instruction of what to build",
      "example": "What the end result looks like",
      "requirements": ["Specific requirement 1", "Specific requirement 2"],
      "hints": ["Helpful hint 1", "Helpful hint 2"],
      "successCriteria": "How to verify it works correctly"
    }
  ]
}`;

  console.log('Calling Gemini API...');
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      temperature: 0.4,
      maxOutputTokens: 5000,
      responseMimeType: "application/json",
    },
  });

  console.log('Gemini responded');
  console.log('Response has candidates:', !!response.candidates);

  if (!response || !response.candidates || response.candidates.length === 0) {
    throw new Error('No response from Gemini API');
  }

  const responseText = response.text;
  if (!responseText || typeof responseText !== 'string') {
    throw new Error('Invalid response format from Gemini');
  }

  console.log('Response text length:', responseText.length);

  let learningMaterials: LearningMaterials;

  try {
    learningMaterials = JSON.parse(responseText);
    console.log('Successfully parsed JSON');
    console.log('Generated flashcards:', learningMaterials.flashcards?.length);
    console.log('Generated exercises:', learningMaterials.exercises?.length);
  } catch (parseError) {
    console.error(' JSON Parse Error:', parseError);
    console.error('Response preview:', responseText.substring(0, 500));
    throw new Error('Failed to parse AI response as JSON');
  }

  // Validate that we have the required structure
  if (!learningMaterials.summary || 
      !learningMaterials.flashcards || 
      !learningMaterials.exercises) {
    throw new Error('AI response missing required fields');
  }

  // Validate minimum content
  if (learningMaterials.flashcards.length < 3) {
    throw new Error('Insufficient flashcards generated');
  }

  if (learningMaterials.exercises.length < 2) {
    throw new Error('Insufficient exercises generated');
  }

  console.log(' All validations passed');
  
  return learningMaterials;
}

export { generateLearningMaterials };
export type { LearningMaterials, Flashcard, Exercise };