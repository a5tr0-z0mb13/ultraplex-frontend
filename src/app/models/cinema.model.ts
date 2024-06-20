export interface CinemaRequestBody {
  name: string;
}

export interface Cinema extends CinemaRequestBody {
  id: number;
  screens: Screen[];
}
