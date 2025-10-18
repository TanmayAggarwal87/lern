import { NextResponse } from 'next/server';
import { generateLearningMaterials } from '@/lib/generateLearningMaterials';

export async function POST(request: Request) {
  try {
    const { videoTitle, duration, transcript } = await request.json();
    
    const materials = await generateLearningMaterials(
      videoTitle,
      duration,
      transcript
    );
    
    return NextResponse.json({ materials });
  } catch (error) {
    console.error('Error generating materials:', error);
    return NextResponse.json(
      { error: 'Failed to generate learning materials' },
      { status: 500 }
    );
  }
}