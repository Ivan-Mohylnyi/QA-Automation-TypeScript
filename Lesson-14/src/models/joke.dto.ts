export interface JokeDto {
    id: number;
    type: string;
    setup: string;
    punchline: string;
}

export interface JokeErrorDto {
    type: string;
    message: string;
}
