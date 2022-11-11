import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params } from '@angular/router';
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







  // movies: any = [];


  constructor(private movieService: MovieService, private route: ActivatedRoute,private httpClient: HttpClient) { }

  localhostURL ='http://localhost:8080/api';


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

  addToWatchlist(id: number) {
    console.log(id);
    return this.httpClient.post<any[]>(this.localhostURL + "/movies",{movieId: id,watchedorNot: true,comment:"no comments for this movie",Rating:7}).subscribe(data => {
      this.movies.push(this.movie);
    });
  }

  removeFromWatchlist(id: number) {
    return this.httpClient.delete<any[]>(this.localhostURL + `/movies/${id}`).subscribe(data => {
      console.log(data);
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
