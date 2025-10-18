"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LearningMaterials } from "@/lib/generateLearningMaterials";

interface Props {
  materials: LearningMaterials;
  videoTitle: string;
}

export default function LearningMaterialsDisplay({ materials, videoTitle }: Props) {
  const [activeTab, setActiveTab] = useState<"summary" | "flashcards" | "exercises">("summary");
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    const newFlipped = new Set(flippedCards);
    newFlipped.has(id) ? newFlipped.delete(id) : newFlipped.add(id);
    setFlippedCards(newFlipped);
  };

  return (
    <div className="max-w-6xl mx-auto text-gray-200">
      <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-spin-gradient drop-shadow-[0_0_15px_rgba(255,0,255,0.2)]">
        {videoTitle}
      </h1>

      {/* Tabs */}
      <div className="flex gap-6 mb-10 border-b border-gray-700/50">
        {["summary", "flashcards", "exercises"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`relative pb-3 px-2 text-lg transition-all ${
              activeTab === tab
                ? "text-fuchsia-400 font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-fuchsia-500 after:to-cyan-500"
                : "text-gray-400 hover:text-fuchsia-400"
            }`}
          >
            {tab === "summary" && "Summary"}
            {tab === "flashcards" && `Flashcards (${materials.flashcards.length})`}
            {tab === "exercises" && `Exercises (${materials.exercises.length})`}
          </button>
        ))}
      </div>

      {/* Summary */}
      {activeTab === "summary" && (
        <Card className="bg-gray-900/60 backdrop-blur-md border border-gray-800 shadow-md hover:shadow-lg transition-all rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">{materials.summary.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <section>
              <h3 className="text-lg font-semibold mb-3 text-fuchsia-400">Main Topics</h3>
              <ul className="space-y-2 text-gray-300">
                {materials.summary.mainTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3 text-fuchsia-400">Key Takeaways</h3>
              <ul className="space-y-2 text-gray-300">
                {materials.summary.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    {takeaway}
                  </li>
                ))}
              </ul>
            </section>
          </CardContent>
        </Card>
      )}

      {/* Flashcards */}
      {activeTab === "flashcards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {materials.flashcards.map((card) => (
            <Card
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className={`relative bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer ${
                flippedCards.has(card.id) ? "rotate-y-180" : ""
              }`}
            >
              <CardHeader>
                
              </CardHeader>
              <CardContent className="transition-transform duration-500 ease-in-out">
                {!flippedCards.has(card.id) ? (
                  <>
                    <p className="text-sm text-gray-400 mb-2">Question:</p>
                    <p className="text-white font-medium">{card.question}</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-400 mb-2 -scale-x-100">Answer:</p>
                    <p className="text-cyan-400 font-semibold  -scale-x-100">{card.answer}</p>
                  </>
                )}
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Click to {flippedCards.has(card.id) ? "see question" : "reveal answer"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Exercises */}
      {activeTab === "exercises" && (
        <div className="space-y-8">
          {materials.exercises.map((exercise) => (
            <Card key={exercise.id} className="bg-gray-900/60 backdrop-blur-md border border-gray-800 shadow-md rounded-2xl">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl text-white">{exercise.title}</CardTitle>
                  <Badge
                    variant={exercise.difficulty === "easy" ? "default" : "secondary"}
                    className="capitalize bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white border-none"
                  >
                    {exercise.difficulty}
                  </Badge>
                </div>
                <div className="flex gap-2 text-sm text-gray-400 flex-wrap">
                  <span>⏱️ {exercise.estimatedMinutes} min</span>
                  <span>•</span>
                  <span>{exercise.concept}</span>
                  <span>•</span>
                  <span>{exercise.timestamp}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 text-gray-300">
                <p>{exercise.description}</p>

                <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700">
                  <h4 className="text-sm font-semibold text-fuchsia-400 mb-1">Example:</h4>
                  <p>{exercise.example}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {exercise.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-cyan-400 mr-2">□</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-yellow-400 mb-2">Hints:</h4>
                  <ul className="space-y-1">
                    {exercise.hints.map((hint, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-yellow-400 mr-2">💡</span>
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-900/30 border border-green-800 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-green-400 mb-2">Success Criteria:</h4>
                  <p>{exercise.successCriteria}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}