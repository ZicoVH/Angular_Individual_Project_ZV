import { Injectable } from '@angular/core';
import { Movie } from './movie';

import { HttpClient } from '@angular/common/http';
import { Observable,timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private httpClient: HttpClient) {
  }

  localhostURL ='http://localhost:8080/api';

  getMovies() : Observable<Movie[]> {
    return this.httpClient.get<any[]>("https://api.themoviedb.org/3/movie/popular?api_key=005e372cbd4dab113edccadcc0ae5dff&page=1");
  }




  getMovieById(id: number){
    return this.httpClient.get<any[]>(`https://api.themoviedb.org/3/movie/${id}?api_key=005e372cbd4dab113edccadcc0ae5dff`)
  }

  searchMovies(filter: string) : Observable<Movie[]> {
    console.log(filter)
    if (filter == ' ') {
      return this.getMovies();
    }
    else {
      return this.httpClient.get<Movie[]>(`https://api.themoviedb.org/3/search/movie?api_key=005e372cbd4dab113edccadcc0ae5dff&query=${filter}`)
    }
  }

  getWatchlist() : Observable<Movie[]>{
    return this.httpClient.get<any[]>(this.localhostURL +"/movies");
  }



  // addMovieToWatchlist(id: number){
  //   return this.httpClient()
  // }

}

