export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { generateLearningMaterials } from "@/lib/generateLearningMaterials";

export async function POST(request: Request) {
  try {
    const { videoId } = await request.json();

    if (!videoId) {
      return NextResponse.json(
        { error: "Missing videoId" },
        { status: 400 }
      );
    }

    // Call backend
    const backendRes = await fetch(
      `lern-production.up.railway.app/transcript?id=${videoId}`,
      {
        method: "GET",
      }
    );

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch transcript from backend" },
        { status: backendRes.status }
      );
    }

    const { transcript, videoTitle, duration } = await backendRes.json();

    // pass transcripts
    const materials = await generateLearningMaterials(
      videoTitle,
      duration,
      transcript
    );

    return NextResponse.json({ materials });
  } catch (error) {
    console.error("Error inside Gemini route:", error);
    return NextResponse.json(
      { error: "Server error in generating materials" },
      { status: 500 }
    );
  }
}
