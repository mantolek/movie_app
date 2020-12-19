export interface Appstate {
  user: {
    a: number;
  };
}

export interface AppProp {
  //   auth: Function;
}

export interface RegisterProp {
  history: {
    push: Function;
  };
}

export interface LoginProp {
  history: {
    push: Function;
  };
}

export interface HomeMovieInterface {
  id: string;
  original_title: string;
  poster_path: string;
}

export interface HomeMainMovieInterface {
//   mainMovieImage: string;
  original_title: string;
  overview: string;
  backdrop_path: string | null;
}

export interface MovieCardsProps {
  movieId: string;
  movieName: string;
  image: string | undefined;
}

export interface MainImageProps {
  image: string | undefined;
  title: string;
  text: string;
}
