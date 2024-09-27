export type TotalPageViewsResponse = {
    data: {
        name: string;
        period: string;
        values: {
            value: number;
            end_time: string;
        }[];
        title: string;
        description: string;
        id: string;
    }[];
    paging: {
        previous: string;
        next: string;
    };
};

export type FollowersCountResponse = {
    followers_count: number;
    id: string;
};
