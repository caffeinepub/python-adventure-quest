import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type QuestionId = bigint;
export interface Question {
    id: QuestionId;
    xpReward: bigint;
    questionText: string;
    correctAnswerIndex: bigint;
    worldId: WorldId;
    choices: Array<string>;
}
export interface World {
    id: WorldId;
    name: string;
    description: string;
}
export type WorldId = bigint;
export interface backendInterface {
    addQuestion(worldId: WorldId, questionText: string, choices: Array<string>, correctAnswerIndex: bigint, xpReward: bigint): Promise<QuestionId>;
    addWorld(name: string, description: string): Promise<WorldId>;
    getAllWorlds(): Promise<Array<World>>;
    getPlayerStats(): Promise<{
        xp: bigint;
        completedQuestions: Array<QuestionId>;
    }>;
    getQuestionsForWorld(worldId: WorldId): Promise<Array<Question>>;
    submitAnswer(questionId: QuestionId, answerIndex: bigint): Promise<{
        correct: boolean;
        xpEarned: bigint;
    }>;
}
