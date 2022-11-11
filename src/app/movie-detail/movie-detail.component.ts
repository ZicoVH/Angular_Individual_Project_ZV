import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  public id!: number;
  movie: any







  // movies: any = [];


  constructor(private movieService: MovieService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })

    this.getSingleMoviesDetails(this.id);
  }

  getSingleMoviesDetails(id: number){
    this.movieService.getMovieById(id).subscribe((r:any) => {
      this.movie = r;
    })
  }

  // ngOnInit(): void {
  //   const movieId = this.route.snapshot.paramMap.get('id');
  //   if (movieId != null ) {
  //     this.movieService.getMovieById(+movieId).subscribe((r:any) => {
  //       // console.log(r.title);
  //       // this.movie = r.results;
  //       this.movies.push(r)
  //         console.log(this.movies);
  //         console.log(r.title);
  //     })

  //   }
  // }
}
