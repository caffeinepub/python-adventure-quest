import { motion } from "motion/react";
import type { Question, World } from "../backend.d";

interface LevelMapProps {
  world: World | null;
  questions: Question[];
  selectedQuestion: Question | null;
  completedIds: Set<string>;
  onSelect: (q: Question) => void;
}

export default function LevelMap({
  world,
  questions,
  selectedQuestion,
  completedIds,
  onSelect,
}: LevelMapProps) {
  if (!world) {
    return (
      <div
        className="bg-card-blue rounded-xl shadow-card flex flex-col items-center justify-center p-12 text-center"
        data-ocid="levelmap.empty_state"
      >
        <span className="text-5xl mb-4">🗺️</span>
        <h2 className="text-white font-black text-xl mb-2">Pick a World!</h2>
        <p className="text-white/70 text-sm">
          Select a world from the left to begin your Python adventure.
        </p>
      </div>
    );
  }

  return (
    <section
      className="bg-card-blue rounded-xl shadow-card p-5 flex flex-col"
      data-ocid="levelmap.panel"
    >
      <div className="mb-4">
        <h2 className="text-white font-black text-lg">{world.name}</h2>
        <p className="text-white/70 text-sm">{world.description}</p>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {questions.map((q, i) => {
          const isCompleted = completedIds.has(q.id.toString());
          const isActive = selectedQuestion?.id === q.id;
          const isLocked =
            !isCompleted &&
            selectedQuestion?.id !== q.id &&
            i > 0 &&
            !completedIds.has(questions[i - 1]?.id.toString());

          return (
            <motion.button
              key={q.id.toString()}
              onClick={() => !isLocked && onSelect(q)}
              whileHover={isLocked ? {} : { scale: 1.02 }}
              whileTap={isLocked ? {} : { scale: 0.97 }}
              data-ocid={`levelmap.item.${i + 1}`}
              disabled={isLocked}
              className={`flex items-center gap-4 rounded-lg p-3 transition-all border-2 text-left ${
                isActive
                  ? "bg-white/20 border-gold"
                  : isCompleted
                    ? "bg-white/10 border-success/60 hover:bg-white/15"
                    : isLocked
                      ? "bg-black/10 border-transparent opacity-50 cursor-not-allowed"
                      : "bg-white/10 border-transparent hover:bg-white/15"
              }`}
            >
              {/* Node circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 shadow ${
                  isCompleted
                    ? "bg-success text-white"
                    : isActive
                      ? "bg-gold text-gold-foreground"
                      : "bg-white/20 text-white"
                }`}
              >
                {isCompleted ? "✓" : i + 1}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-white font-bold text-sm truncate">
                  Level {i + 1}
                </p>
                <p className="text-white/70 text-xs line-clamp-1">
                  {q.questionText.replace(/`[^`]+`/g, (m) => m.slice(1, -1))}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-1 text-gold text-xs font-bold">
                <span>⚡</span>
                <span>{q.xpReward.toString()}</span>
              </div>
            </motion.button>
          );
        })}

        {questions.length === 0 && (
          <div
            className="flex-1 flex items-center justify-center py-10"
            data-ocid="levelmap.questions.empty_state"
          >
            <p className="text-white/60 text-sm">Loading levels…</p>
          </div>
        )}
      </div>
    </section>
  );
}
