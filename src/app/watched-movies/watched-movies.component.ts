import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, fromEvent, map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Movie } from '../movie';
import { MovieJava } from '../movie-java';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-watched-movies',
  templateUrl: './watched-movies.component.html',
  styleUrls: ['./watched-movies.component.css']
})
export class WatchedMoviesComponent implements OnInit {
  movies: any = [];
  searchMovies: any = [];
  showSearchResults: boolean = false;
  opinion: boolean = false;
  change: boolean = false;
  order: boolean = true;


  constructor(private router: Router,private movieService: MovieService, private route: ActivatedRoute,private httpClient: HttpClient) { }

  searchWatched = new FormGroup({
    comment: new FormControl()
  });

  ngOnInit(): void {
    this.getAllMoviesFromWatched();

  }

  refreshRating(changed: boolean): void {
    console.log(this.order);
    this.order = !changed;
  }

  SearchWatched(submitted: boolean) {
    this.searchMovies = [];
    let search = this.searchWatched.value.comment.toLowerCase();
    if (search == ' '){
      search = "";
    }
    else {
      for (var i=0;i < this.movies.length; i++){
        if (this.movies[i].title.toLowerCase().includes(search)) {
          this.searchMovies.push(this.movies[i]);
        }
      }
      this.movieService.getWatchedList().subscribe((r:any)=> {
        for (var i=0; i < r.length; i++) {
          if (r[i].comment.toLowerCase().includes(search) || r[i].rating == search ){
            let movieId = r[i].movieId;
          this.movieService.getMovieById(movieId).subscribe((r:any) => {
            this.searchMovies.push(r)
            console.log(this.movies);
            console.log(r.title);
          })
          }
        }
        this.showSearchResults = !submitted
      })
    }
  }

  getAllMoviesFromWatched() {
    this.movies = []
    this.movieService.getWatchedList().subscribe((t:MovieJava[])=> {
      if (this.order){
        t.sort((a,b) => a.rating - b.rating)
        t.forEach((e) => {
          this.movieService.getMovieById(e.movieId).subscribe((r:Movie[]) => {
            this.movies.push(r);
            console.log(r);
          })
        })
        console.log(t, "test");
      }
      else {
        t.sort((a,b) => b.rating - a.rating)
        t.forEach((e) => {
          this.movieService.getMovieById(e.movieId).subscribe((r:Movie[]) => {
            this.movies.push(r);
            console.log(r);

          })

        })
        console.log(t, "test2")
      }
    })
  }
}
