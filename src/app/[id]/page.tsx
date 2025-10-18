import React from "react";
import LearningMaterialsDisplay from "@/components/LearningMaterialsDisplay";
import { fetchTranscript } from "youtube-transcript-plus";
import { generateLearningMaterials } from "@/lib/generateLearningMaterials";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  try {
    const transcript = await fetchTranscript(id);
    const videoResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
    );

    if (!videoResponse.ok) throw new Error("Failed to fetch video metadata");

    const videoData = await videoResponse.json();
    const transcriptText = transcript.map((i: any) => i.text).join(" ");
    const duration =
      transcript.length > 0
        ? `${Math.round(transcript[transcript.length - 1].offset / 60000)} minutes`
        : "N/A";

    const materials = await generateLearningMaterials(videoData.title, duration, transcriptText);

    if (!materials || !materials.flashcards || !materials.exercises)
      throw new Error("Invalid materials structure");

    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
        <LearningMaterialsDisplay materials={materials} videoTitle={videoData.title} />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-300 flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-3">Error Loading Video</h1>
          <p className="text-gray-400 mb-4">
            Failed to load transcript or generate learning materials.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <div className="text-left bg-neutral-900/70 border border-neutral-800 rounded-xl p-4 backdrop-blur-md shadow-md">
            <p className="text-xs text-gray-400 font-semibold mb-2">Troubleshooting:</p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Ensure the video has captions/subtitles</li>
              <li>• Verify your GEMINI_API_KEY in .env.local</li>
              <li>• Check console logs for detailed errors</li>
              <li>• Try a different YouTube video</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
