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
}
export interface Comment {
    id: number;
    creationTimeSeconds: number;
    commentatorHandle: string;
    locale: string;
    text: string;
    parentCommentId: number;
    rating: number;
}
export interface RecentAction {
    timeSeconds: number;
    blogEntry: BlogEntry;
    comment: Comment;
}
export interface CFRecentActionsHttp {
    status: string;
    result: RecentAction[];
}