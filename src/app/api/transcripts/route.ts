import { NextResponse } from 'next/server';
import { Innertube } from 'youtubei.js';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') || 'tAC_7_H_5kI';
  
  try {
    // Initialize Innertube
    const yt = await Innertube.create();
    
    // Get video info
    const info = await yt.getInfo(id);
    
    // Get transcript
    const transcriptData = await info.getTranscript();
    
    // Transform to match your original format
    const transcript = transcriptData?.transcript?.content?.body?.initial_segments.map((segment) => ({
      text: segment.snippet.text,
      duration: Number(segment.end_ms) - Number(segment.start_ms),
      offset: segment.start_ms,
    }));
    
    return NextResponse.json({ 
      transcript,
      videoTitle: info.basic_info.title,
      videoAuthor: info.basic_info.author,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch transcript' },
      { status: 500 }
    );
  }
}