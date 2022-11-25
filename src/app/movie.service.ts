import { Injectable } from '@angular/core';
import { Movie } from './movie';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { MovieJava } from './movie-java';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  localhostURL = 'http://localhost:8080/api';

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      'https://api.themoviedb.org/3/movie/popular?api_key=005e372cbd4dab113edccadcc0ae5dff&page=1'
    );
  }

  getMovieById(id: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=005e372cbd4dab113edccadcc0ae5dff`
    );
  }

  // getMovieByIdDatabase(id: number): Observable<MovieJava[]> {
  //   return this.httpClient.get<any[]>(this.localhostURL+ `/movies/specificId/${id}`)
  // }

  searchMovies(filter: string): Observable<Movie[]> {
    console.log(filter);
    if (filter == ' ') {
      return this.getMovies();
    }
    if (filter.startsWith('*')){
      let newfilter = filter.substring(1)
      return this.httpClient.get<Movie[]>(`https://api.themoviedb.org/3/discover/movie?api_key=005e372cbd4dab113edccadcc0ae5dff&primary_release_year=${newfilter}`)
    }
    else {
      return this.httpClient.get<Movie[]>(
        `https://api.themoviedb.org/3/search/movie?api_key=005e372cbd4dab113edccadcc0ae5dff&query=${filter}`
      );
    }
  }

  searchSpecificRatingDatabase(rating: number): Observable<Movie[]> {
    return this.httpClient.get<any[]>(this.localhostURL+ `/movies/specificRating/${rating}`)
  }

  searchSpecificCommentDatabase(filter: string): Observable<MovieJava[]> {
    if (filter == ' ') {
      return this.getWatchedList()

    }
    else {
      return this.httpClient.get<any[]>(this.localhostURL + `/movies/specificComment/${filter}`)

    }

  }

  searchSpecificTitleDatabase() {}
  // getGenres() {
  //   return this.httpClient.get<any[]>('https://api.themoviedb.org/3/genre/movie/list?api_key=005e372cbd4dab113edccadcc0ae5dff')
  // }

  getWatchlist(): Observable<Movie[]> {
    return this.httpClient.get<any[]>(this.localhostURL + '/movies');
  }

  getWatchedList(): Observable<MovieJava[]> {
    return this.httpClient.get<any[]>(this.localhostURL + '/watchedmovies');
  }

  getSpecificMovieFromDatabase(id: number): Observable<MovieJava[]> {
    return this.httpClient.get<any[]>(this.localhostURL + `/movie/${id}`);
  }

  updateWatchedInDatabase(id: number, change: boolean) {
    return this.httpClient.patch<any[]>(this.localhostURL + `/movies/${id}`, {
      watchedorNot: change,
    });
  }

  updateMovieInDatabase(id: number, change?: boolean, rating =  0, comment = "no comment") {
    return this.httpClient.patch<any[]>(this.localhostURL + `/movies/${id}`, {
      watchedorNot: change,
      rating: rating,
      comment: comment
    });
  }

  addToWatchlist(movieId: number,title: string, poster_path: string,vote_average:number) {
    console.log(movieId);
    // console.log(id);
    return this.httpClient.post<any[]>(this.localhostURL + '/movies', {
      id: movieId,
      watchedorNot: false,
      comment: '',
      rating: 0,
      title: title,
      poster_path: poster_path,
      vote_average: vote_average
    });
  }

  removeFromWatchlist(id: number) {
    return this.httpClient.delete<any[]>(this.localhostURL + `/movies/${id}`);
  }

  // addMovieToWatchlist(id: number){
  //   return this.httpClient()
  // }
}
