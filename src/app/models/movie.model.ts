export interface MovieRequestBody {
  name: string;
  runtime: number;
}

export interface Movie extends MovieRequestBody {
  id: number;
}
