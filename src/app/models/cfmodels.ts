export interface BlogEntry {
    originalLocale: string;
    allowViewHistory: boolean;
    creationTimeSeconds: number;
    rating: number;
    authorHandle: string;
    modificationTimeSeconds: number;
    id: number;
    title: string;
    locale: string;
    tags: string[];
    updateTimeSeconds: number;
}
