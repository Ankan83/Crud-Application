export type Posts = {
    id: number,
    title: string,
    body: string,
    userId: number
};

export type PostWithoutUserID = Omit<Posts, "userId">;