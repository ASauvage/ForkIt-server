export interface RequestMetadata {
    request_id: string;
    user_id: string | null;
    current_time: {
        value: string;
        timestamp: number;
    };
    version: string;
    request: {
        method: string;
        path: string;
    };
}
