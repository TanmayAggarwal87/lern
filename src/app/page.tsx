"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Loader2 } from "lucide-react";
import { useState } from "react";
import getYouTubeID from "get-youtube-id";
import { useRouter } from "next/navigation";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleSubmit() {
    const id = getYouTubeID(url);
    if (id) {
      setIsLoading(true);
      setUrl("");
      router.push(`/${id}`);
    }
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-screen w-full bg-[#0a0a0a] px-4">
      <div className="flex justify-center items-center flex-col w-full max-w-md">
        <div className="my-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-[length:300%_300%] bg-clip-text text-transparent animate-spin-gradient">
            What you wanna learn today?
          </h1>
        </div>
        <div className="flex justify-center items-center flex-row sm:flex-row gap-4 w-full">
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-stone-900 to-amber-100 bg-[length:300%_300%] animate-dual w-full sm:w-auto">
            <Input
              type="text"
              placeholder="https://www.youtube.com/watch?v=someid"
              className="w-full sm:w-80 text-white bg-neutral-900 rounded-lg px-4 py-2 outline-none"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSubmit()}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-4 rounded-full sm:w-auto sm:h-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="size-6 animate-spin" />
            ) : (
              <ArrowUp className="size-6" />
            )}
          </Button>
        </div>
        {isLoading && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 animate-pulse">
              Fetching transcript and generating learning materials...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}