import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl } from '@angular/forms';

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
  rating: number = 0;
  inDatabase: boolean = false;
  ratingNumbers: any;
  emptyNumbers: any



  constructor(private router: Router,private movieService: MovieService, private route: ActivatedRoute,private httpClient: HttpClient) { }

  localhostURL ='http://localhost:8080/api';
  updateMovieDatabase = new FormGroup({
    rating: new FormControl(),
    comment: new FormControl()}
  );

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
      this.rating = r.rating;
      this.ratingNumbers = Array(this.rating).fill(0).map((x,i)=>i);
      this.emptyNumbers = Array(5 - this.rating).fill(0).map((x,i)=>i);
        return this.watchedornot = r.watchedorNot;

      },
    (error) => {
      console.log('movie is not in the database yet');
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
      // console.log(r);
    })
  }

  updateWatchedOrNot(id: number, change: boolean) {
    this.movieService.updateWatchedInDatabase(id,change).subscribe((r:any) => {
      // console.log(r);
    })
  }

  SaveData(){
    this.movieService.updateMovieInDatabase(this.id,this.watchedornot, this.updateMovieDatabase.value.rating, this.updateMovieDatabase.value.comment).subscribe((r:any) => {})
    console.log(this.updateMovieDatabase.value.comment);
    console.log(this.id);
  }
}
