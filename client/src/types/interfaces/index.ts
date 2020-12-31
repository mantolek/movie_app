import { RouteComponentProps } from 'react-router-dom';
export interface MenuMobileProps extends RouteComponentProps {}
export interface MenuDesktopProps extends RouteComponentProps {}

export interface Appstate {
  user: {
    loginSuccess: boolean;
    auth: boolean;
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

export interface MovieDetailPageProps extends RouteComponentProps {}

export interface MovieState {
  overview: string;
  backdrop_path: string;
  original_title: string;
}

export interface CastsState {
  profile_path: string;
  name: string;
}

export interface GridCardsProps {
  image: string;
  name: string;
}

export interface CommentsProps {
  movieTitle: string;
  commentLists: any;
  postId: string;
  refreshFunction: Function;
}

export interface CommentsInterface {
  user: {
    loginSuccess: string;
  };
}

export interface MovieInfoProps {
  movie: {
    original_title: string;
    release_date: number;
    revenue: number;
    runtime: number;
    vote_average: number;
    vote_count: number;
  };
}

export interface LikeDislikesProps {
  ID: string;
  type: string;
}

export interface LikeDislikesInterace {
  user: {
    loginSuccess: boolean;
  };
}

export interface FavoriteProps {
  movieID: string;
  movieInfo: {
    title: string;
    poster_path: string;
    runtime: number;
  };
}

export interface FavoriteInterace {
  user: {
    loginSuccess: boolean;
  };
}

export interface FavoritesState {
  moviePoster: string;
  movieID: string;
  movieTitle: string;
  movieRunTime: number;
}
