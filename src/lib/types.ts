// lib/types.ts
export interface VideoMetadata {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  channelTitle: string;
}

export interface TranscriptItem {
  text: string;
  offset: number;
  duration: number;
}

export interface VideoData {
  metadata: VideoMetadata;
  transcript: TranscriptItem[];
  formattedTranscript: string;
}

export interface ApiResponse {
  success: boolean;
  data?: VideoData;
  error?: string;
}