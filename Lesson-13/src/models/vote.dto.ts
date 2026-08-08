import { ImageDto } from './image.dto';

export interface VoteDto {
    id: number;
    image_id: string;
    sub_id: string | null;
    value: number;
    country_code: string | null;
    created_at: string;
    image?: ImageDto;
}

export interface CreateVoteRequestDto {
    image_id: string;
    value: number;
    sub_id?: string;
}

export interface CreateVoteResponseDto {
    message: string;
    id: number;
    image_id: string;
    value: number;
    sub_id?: string;
}
