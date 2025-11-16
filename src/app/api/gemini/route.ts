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

    // Call your EXPRESS BACKEND
    const backendRes = await fetch(
      `http://localhost:3001/transcript?id=${videoId}`,
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

    // Now pass transcript → Gemini
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
