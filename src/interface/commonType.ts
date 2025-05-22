export const LEVELS = ["Beginner", "Intermediate", "Expert"] as const;
export type Level = (typeof LEVELS)[number];

export const CATEGORIES = ["Programming", "Design", "Marketing"] as const;
export type Category = (typeof CATEGORIES)[number];
