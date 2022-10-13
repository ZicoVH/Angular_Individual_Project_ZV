import { Injectable } from '@angular/core';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getMovies(): Movie[] {
    let movies: Movie[] = [];

    let movie1: Movie = {
      id:1,
      title: "Spiderman HomeComing",
      release_date: "25/09/2022",
      image: "https://images.pexels.com/photos/5691359/pexels-photo-5691359.jpeg?auto=compress&cs=tinysrgb&w=300"
    };

    let movie2: Movie = {
      id:2,
      title: "Thor, Love and Thunder",
      release_date: "17/03/2021",
      image: "https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&w=300"
    };

    movies.push(movie1);
    movies.push(movie2);
    return movies;
  }
}
