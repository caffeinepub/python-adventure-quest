import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import type { Question, World } from "./backend.d";
import ChallengePanel from "./components/ChallengePanel";
import Header from "./components/Header";
import LevelMap from "./components/LevelMap";
import WorldSelector from "./components/WorldSelector";
import { usePlayerStats, useQuestions, useWorlds } from "./hooks/useQueries";

export default function App() {
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  );
  const [completedLocally, setCompletedLocally] = useState<Set<string>>(
    new Set(),
  );

  const { data: worlds = [] } = useWorlds();
  const { data: questions = [] } = useQuestions(selectedWorld?.id ?? null);
  const { data: stats } = usePlayerStats();

  const xp = Number(stats?.xp ?? 0n);
  const completedIds = new Set([
    ...(stats?.completedQuestions?.map((id: bigint) => id.toString()) ?? []),
    ...completedLocally,
  ]);

  function handleWorldSelect(world: World) {
    setSelectedWorld(world);
    setSelectedQuestion(null);
  }

  function handleQuestionSelect(q: Question) {
    setSelectedQuestion(q);
  }

  function handleAnswerSubmitted(questionId: bigint, correct: boolean) {
    if (correct) {
      setCompletedLocally((prev) => new Set([...prev, questionId.toString()]));
    }
  }

  function handleNext() {
    if (!selectedQuestion || questions.length === 0) return;
    const idx = questions.findIndex(
      (q: Question) => q.id === selectedQuestion.id,
    );
    const next = questions[idx + 1];
    if (next) setSelectedQuestion(next);
    else setSelectedQuestion(null);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header xp={xp} />
      <main className="flex-1 py-6 px-4">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_360px] gap-4">
            {/* Left: World Selector */}
            <WorldSelector
              worlds={worlds}
              selectedWorld={selectedWorld}
              onSelect={handleWorldSelect}
            />
            {/* Center: Level Map */}
            <LevelMap
              world={selectedWorld}
              questions={questions}
              selectedQuestion={selectedQuestion}
              completedIds={completedIds}
              onSelect={handleQuestionSelect}
            />
            {/* Right: Challenge */}
            <ChallengePanel
              question={selectedQuestion}
              completedIds={completedIds}
              onSubmit={handleAnswerSubmitted}
              onNext={handleNext}
              hasNext={
                !!selectedQuestion &&
                questions.findIndex(
                  (q: Question) => q.id === selectedQuestion.id,
                ) <
                  questions.length - 1
              }
            />
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()}. Built with{" "}
        <span className="text-gold">♥</span> using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
      <Toaster />
    </div>
  );
}
