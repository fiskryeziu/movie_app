export type DecodeProps = {
    userId: string,
    iat: number,
    exp: number
}

export type UserProps = {
    id: string,
    username: string,
    email: string,
    role: 'ADMIN' | 'USER',
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
    review?: string[]
};

export type Review = {
    id: string;
    userId: string;
    name: string;
    comment: string;
    timestamp: Date;
    movie: Movie;
    movieId: string;
};

