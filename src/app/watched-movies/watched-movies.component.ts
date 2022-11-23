import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, fromEvent, map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Movie } from '../movie';
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

  constructor(private router: Router,private movieService: MovieService, private route: ActivatedRoute,private httpClient: HttpClient) { }

  searchWatched = new FormGroup({
    type: new FormControl(),
    comment: new FormControl()
  });

  ngOnInit(): void {
    this.getAllMoviesFromWatched();

  }



  SearchWatched(submitted: boolean) {
    this.searchMovies = []
    if (this.searchWatched.value.type == "Comment" || !this.searchWatched.value.type ){
      this.movieService.searchSpecificCommentDatabase(this.searchWatched.value.comment).subscribe((r:any) => {
        for (var i=0; i < r.length; i++) {

          let movieId = r[i].movieId;
          this.movieService.getMovieById(movieId).subscribe((r:any)=> {
            this.searchMovies.push(r);
            console.log(r)
          })
          this.showSearchResults = !submitted;
        }
      })
    }
    if (this.searchWatched.value.type == "Rating" ){
      this.movieService.searchSpecificRatingDatabase(this.searchWatched.value.comment).subscribe((r:any) => {
        for (var i=0; i < r.length; i++) {

          let movieId = r[i].movieId;
          this.movieService.getMovieById(movieId).subscribe((r:any)=> {
            this.searchMovies.push(r);
            console.log(r)
          })
          this.showSearchResults = !submitted;
        }
      })
    }

  }

  getAllMoviesFromWatched() {
    this.movieService.getWatchedList().subscribe((r:any)=> {
      for (var i=0; i < r.length; i++) {
        let movieId = r[i].movieId;
        console.log(movieId);
        this.movieService.getMovieById(movieId).subscribe((r:any) => {
          // this.movies += r.movie_results;
          this.movies.push(r)
          console.log(this.movies);
          console.log(r.title);


          // console.log(r.title);
        })


      }
    })
  }
}
