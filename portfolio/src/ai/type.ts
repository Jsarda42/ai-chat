export type ChatResponse =
    | {
        text: string;
        confidence: number;
        needsTraining: false;
        suggestion?: string;
    }
    | {
        text: string;
        confidence: number;
        needsTraining: true;
        input: string;
        suggestion?: string;
    };

export type MemoryMatchResult = {
    bestScore: number;
    bestAnswer: string | null;
};


export type Knowledge = Record<string, string>;