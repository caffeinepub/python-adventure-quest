import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Question, World } from "../backend.d";
import { FALLBACK_QUESTIONS, FALLBACK_WORLDS } from "../data/fallback";
import { useActor } from "./useActor";

export function useWorlds() {
  const { actor, isFetching } = useActor();
  return useQuery<World[]>({
    queryKey: ["worlds"],
    queryFn: async () => {
      if (!actor) return FALLBACK_WORLDS as unknown as World[];
      const worlds = await actor.getAllWorlds();
      return worlds.length > 0
        ? worlds
        : (FALLBACK_WORLDS as unknown as World[]);
    },
    enabled: !isFetching,
    placeholderData: FALLBACK_WORLDS as unknown as World[],
  });
}

export function useQuestions(worldId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Question[]>({
    queryKey: ["questions", worldId?.toString()],
    queryFn: async () => {
      if (!worldId) return [];
      if (!actor)
        return FALLBACK_QUESTIONS.filter(
          (q) => q.worldId === worldId,
        ) as unknown as Question[];
      const qs = await actor.getQuestionsForWorld(worldId);
      if (qs.length > 0) return qs;
      return FALLBACK_QUESTIONS.filter(
        (q) => q.worldId === worldId,
      ) as unknown as Question[];
    },
    enabled: worldId !== null && !isFetching,
    placeholderData: [],
  });
}

export function usePlayerStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["playerStats"],
    queryFn: async () => {
      if (!actor) return { xp: 0n, completedQuestions: [] as bigint[] };
      return actor.getPlayerStats();
    },
    enabled: !isFetching,
    placeholderData: { xp: 0n, completedQuestions: [] as bigint[] },
  });
}

export function useSubmitAnswer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      questionId,
      answerIndex,
    }: { questionId: bigint; answerIndex: bigint }) => {
      if (!actor) {
        const q = FALLBACK_QUESTIONS.find((fq) => fq.id === questionId);
        const correct = q ? q.correctAnswerIndex === answerIndex : false;
        return { correct, xpEarned: correct ? (q?.xpReward ?? 0n) : 0n };
      }
      return actor.submitAnswer(questionId, answerIndex);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playerStats"] });
    },
  });
}
