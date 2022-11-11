import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movies: Movie[] = [];
  public id!: number;
  movie: any
  watchedornot: any;
  comment: string = '';
  inDatabase: boolean = false;

  constructor(private router: Router,private movieService: MovieService, private route: ActivatedRoute,private httpClient: HttpClient) { }

  localhostURL ='http://localhost:8080/api';


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })

    this.getSingleMoviesDetails(this.id);
    this.getSingleMovieFromDatabase(this.id);
  }

  detail(): void {
    window.location.reload();
  }

  getSingleMoviesDetails(id: number){
    this.movieService.getMovieById(id).subscribe((r:any) => {
      this.movie = r;
    })
  }

  getSingleMovieFromDatabase(id: number){
    this.movieService.getSpecificMovieFromDatabase(id).subscribe((r:any) => {
      console.log(this.watchedornot)
      console.log(r.comment)
      this.inDatabase = true;
      this.comment = r.comment;
        return this.watchedornot = r.watchedorNot;

      },
    (error) => {
      console.log('error caught in component');
      return this.watchedornot= false;
    })
  }

  addToWatchlist(id: number) {
    this.movieService.addToWatchlist(id).subscribe(r => {
      this.movies.push(this.movie);
    })
  }

  removeFromWatchlist(id: number){
    this.movieService.removeFromWatchlist(id).subscribe(r => {
      console.log(r);
    })
  }

  updateWatchedOrNot(id: number, change: boolean) {
    this.movieService.updateMovieInDatabase(id,change).subscribe((r:any) => {
      console.log(r);
    })
  }
}
