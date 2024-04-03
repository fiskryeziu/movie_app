import { JwtPayload } from "jwt-decode"

export type DecodeProps = {
    userId: string,
    iat: number,
    exp: number
}

export type UserProps = {
    id: string,
    username: string,
    email: string,
    role: 'ADMIN' | 'USER' | 'NONE',
    createdAt: Date
    token: string
}

export type Movie = {
    id: string;
    createdAt: string;
    title: string;
    description: string;
    quality: string;
    genre: string[];
    rating: number;
    releaseDate: string;
    actors: string[];
    coverImageUrl: string;
    movieURL: string;
    trailerUrl: string;
    duration: number;
    viewCount: number;
    reviews?: Review[]
};

export type Review = {
    id: string;
    userId: string;
    name: string;
    comment: string;
    timestamp: string;
    movieId: string;
};
export interface CustomJwtPayload extends JwtPayload {
    id: string;
    role: string;
}


export type TAdminMovie = {
    id: string;
    title: string;
    releaseDate: string;
}
export type TAdminUserList = {
    id: string;
    username: string;
    email: string;
    role: 'ADMIN' | 'USER'
}

export type TKey = | "title"
    | "description"
    | "quality"
    | "genre"
    | "rating"
    | "releaseDate"
    | "actors"
    | "coverImageUrl"
    | "movieURL"
    | "trailerUrl"
    | "duration";
