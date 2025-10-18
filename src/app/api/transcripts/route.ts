import { NextResponse } from 'next/server';
import { fetchTranscript } from 'youtube-transcript-plus';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') || 'tAC_7_H_5kI';
  
  try {
    const transcript = await fetchTranscript(id);
    
    // Fetch video metadata from YouTube
    const videoResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
    );
    const videoData = await videoResponse.json();
    
    return NextResponse.json({ 
      transcript,
      videoTitle: videoData.title,
      videoAuthor: videoData.author_name,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transcript' },
      { status: 500 }
    );
  }
}