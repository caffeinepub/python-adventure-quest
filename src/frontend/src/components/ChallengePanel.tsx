import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Question } from "../backend.d";
import { useSubmitAnswer } from "../hooks/useQueries";

interface ChallengePanelProps {
  question: Question | null;
  completedIds: Set<string>;
  onSubmit: (questionId: bigint, correct: boolean) => void;
  onNext: () => void;
  hasNext: boolean;
}

const CHOICE_KEYS = ["A", "B", "C", "D"];

type TextPart = { type: "code" | "text"; content: string; key: string };

function parseQuestionText(text: string): TextPart[] {
  const parts = text.split(/(`.+?`)/);
  return parts.map((part, i) => ({
    type: part.startsWith("`") && part.endsWith("`") ? "code" : "text",
    content:
      part.startsWith("`") && part.endsWith("`") ? part.slice(1, -1) : part,
    key: `${i}-${part.slice(0, 8)}`,
  }));
}

export default function ChallengePanel({
  question,
  completedIds,
  onSubmit,
  onNext,
  hasNext,
}: ChallengePanelProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<{
    correct: boolean;
    xpEarned: bigint;
  } | null>(null);
  const { mutateAsync: submitAnswer, isPending } = useSubmitAnswer();

  const questionIdStr = question?.id?.toString() ?? "";
  const alreadyDone = question
    ? completedIds.has(question.id.toString())
    : false;

  // biome-ignore lint/correctness/useExhaustiveDependencies: questionIdStr is the change trigger
  useEffect(() => {
    setSelected(null);
    setResult(null);
  }, [questionIdStr]);

  async function handleSubmit() {
    if (selected === null || !question) return;
    const res = await submitAnswer({
      questionId: question.id,
      answerIndex: BigInt(selected),
    });
    setResult(res);
    onSubmit(question.id, res.correct);
  }

  if (!question) {
    return (
      <div
        className="bg-card-blue rounded-xl shadow-card flex flex-col items-center justify-center p-10 text-center"
        data-ocid="challenge.empty_state"
      >
        <span className="text-5xl mb-4">💻</span>
        <h2 className="text-white font-black text-lg mb-2">Ready to Code?</h2>
        <p className="text-white/70 text-sm">
          Select a level node on the map to start a challenge.
        </p>
      </div>
    );
  }

  const submitted = result !== null;
  const canProgress = submitted || alreadyDone;
  const parsedText = parseQuestionText(question.questionText);

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key={question.id.toString()}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25 }}
        className="bg-card-blue rounded-xl shadow-card flex flex-col"
        data-ocid="challenge.panel"
      >
        <div className="bg-nav-gradient rounded-t-xl px-5 py-3 flex items-center justify-between">
          <span className="text-white font-black text-sm">
            🐍 Python Challenge
          </span>
          <span className="bg-gold text-gold-foreground text-xs font-black px-2.5 py-0.5 rounded-full">
            ⚡ {question.xpReward.toString()} XP
          </span>
        </div>

        <div className="flex-1 flex flex-col gap-4 p-5">
          <div className="text-white font-bold text-base leading-snug">
            {parsedText.map((p) =>
              p.type === "code" ? (
                <code
                  key={p.key}
                  className="bg-black/20 text-white font-mono rounded px-1.5 py-0.5 text-sm"
                >
                  {p.content}
                </code>
              ) : (
                <span key={p.key}>{p.content}</span>
              ),
            )}
          </div>

          <div
            className="code-bg rounded-lg p-4 font-mono text-sm text-green-300 leading-relaxed overflow-x-auto"
            data-ocid="challenge.editor"
          >
            <span className="text-white/40 select-none mr-2">{">"}</span>
            <span>{question.questionText.replace(/`([^`]+)`/g, "$1")}</span>
          </div>

          <div
            className="grid grid-cols-2 gap-2"
            data-ocid="challenge.choices.section"
          >
            {question.choices.map((choice, i) => {
              let btnClass =
                "rounded-full border-2 px-3 py-2 text-sm font-semibold transition-all text-left ";
              if (submitted) {
                if (i === Number(question.correctAnswerIndex)) {
                  btnClass += "border-success bg-success/20 text-white";
                } else if (i === selected) {
                  btnClass += "border-destructive bg-destructive/20 text-white";
                } else {
                  btnClass += "border-white/20 text-white/50";
                }
              } else if (selected === i) {
                btnClass += "border-gold bg-gold/20 text-white";
              } else {
                btnClass +=
                  "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/60";
              }
              return (
                <button
                  key={CHOICE_KEYS[i]}
                  type="button"
                  onClick={() => !submitted && setSelected(i)}
                  disabled={submitted}
                  className={btnClass}
                  data-ocid={`challenge.choices.item.${i + 1}`}
                >
                  <span className="font-mono text-white/50 mr-1">
                    {CHOICE_KEYS[i]}.
                  </span>
                  {choice}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {submitted && result && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-lg px-4 py-3 font-bold text-sm ${
                  result.correct
                    ? "bg-success/20 text-white"
                    : "bg-destructive/20 text-white"
                }`}
                data-ocid={
                  result.correct
                    ? "challenge.success_state"
                    : "challenge.error_state"
                }
              >
                {result.correct ? (
                  <>
                    ✅ Correct!{" "}
                    <span className="text-gold">
                      +{result.xpEarned.toString()} XP earned!
                    </span>
                  </>
                ) : (
                  <>
                    ❌ Not quite — the correct answer is highlighted in green.
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto flex gap-3">
            {canProgress ? (
              hasNext ? (
                <Button
                  onClick={onNext}
                  className="flex-1 bg-white text-foreground hover:bg-white/90 font-black text-sm rounded-full"
                  data-ocid="challenge.next.button"
                >
                  Next Level →
                </Button>
              ) : (
                <div className="flex-1 text-center text-white/70 font-bold text-sm py-2">
                  🎉 Completed!
                </div>
              )
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={selected === null || isPending}
                className="flex-1 bg-gold text-gold-foreground hover:bg-gold/90 font-black text-sm rounded-full"
                data-ocid="challenge.submit_button"
              >
                {isPending ? "Checking…" : "Submit Answer"}
              </Button>
            )}
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
