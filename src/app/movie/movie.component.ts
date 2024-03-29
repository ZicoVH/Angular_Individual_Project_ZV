import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, Subscription, switchMap } from 'rxjs';
import { Movie } from '../movie';
import { MovieJava } from '../movie-java';
import { MovieService } from '../movie.service';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
    movies: any;
    searchBox!: HTMLInputElement;
    typeAhead!: Observable<Movie[]>;
    subscription!: Subscription;

  @Input() movie!: Movie;
  @Input() javamovie!: MovieJava;
  @Input() isDetail: boolean = false;

  movieById: any;
  constructor(private router: Router, private movieService: MovieService,private httpClient: HttpClient) { }

  localhostURL ='http://localhost:8080/api';

  ngOnInit(): void {
  }

  detail(id: number) {
    this.router.navigate(['/movie',id])
  }

  getMovieById(id: number) {
    this.movieService.getMovieById(id).subscribe((r:any) => {
      this.movieById = r.results;
    })
  }

  // addToWatchlist(id: number) {
  //   console.log(id);
  //   return this.httpClient.post<any[]>(this.localhostURL + "/movies",{movieId: id,watchedorNot: true,comment:"no comments for this movie",Rating:7}).subscribe(data => {
  //     this.movies.push(this.movie);
  //   });
  // }

  removeFromWatchlist(id: number) {
    return this.httpClient.delete<any[]>(this.localhostURL + `/movies/${id}`).subscribe(data => {
      console.log(data);
    })
  }




}

