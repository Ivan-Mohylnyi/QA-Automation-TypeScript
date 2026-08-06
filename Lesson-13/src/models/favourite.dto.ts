import { ImageDto } from './image.dto';

export interface FavouriteDto {
    id: number;
    image_id: string;
    sub_id: string | null;
    created_at: string;
    image?: ImageDto;
}

export interface CreateFavouriteRequestDto {
    image_id: string;
    sub_id?: string;
}

export interface CreateFavouriteResponseDto {
    message: string;
    id: number;
}
