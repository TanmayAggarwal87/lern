import express from "express";
import cors from "cors";
import { Innertube } from "youtubei.js";

const app = express();
app.use(cors());
app.use(express.json());

let ytInstance = null;

// Reuse YouTube client so it doesn't re-init every request
async function getYT() {
  if (!ytInstance) {
    ytInstance = await Innertube.create({
      retrieve_player: false,
      retrieve_patched_scripts: false,
    });
  }
  return ytInstance;
}

app.get("/transcript", async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ error: "Missing video ID" });
  }

  try {
    const yt = await getYT();
    const info = await yt.getInfo(id);

    let transcriptData;
    try {
      transcriptData = await info.getTranscript();
    } catch (err) {
      return res.status(404).json({ error: "Transcript not available" });
    }

    const transcript =
      transcriptData?.transcript?.content?.body?.initial_segments?.map(
        (segment) => ({
          text: segment.snippet.text,
          duration:
            Number(segment.end_ms) - Number(segment.start_ms),
          offset: segment.start_ms,
        })
      );

    res.json({
      transcript,
      videoTitle: info.basic_info.title,
      videoAuthor: info.basic_info.author,
      duration: info.basic_info.duration,
    });
  } catch (err) {
    console.error("Transcript error:", err);
    res.status(500).json({ error: "Failed to fetch transcript" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend up and running --celebrate");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
