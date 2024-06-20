import { Movie } from './movie.model';

export interface ScreeningRequestBody {
  movieId: number;
  startTime: string;
};

export interface Screening {
  id: number;
  cinemaName: string;
  screenName: string;
  start: string;
  movie: Movie
};
