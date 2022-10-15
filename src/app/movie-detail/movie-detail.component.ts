import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any
  // movie: Movie = {
  //   id: 0,
  //   title: '',
  //   image: '',
  //   release_date: '',
  //   content: ''
  // }

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // const movieId = this.route.snapshot.paramMap.get('id');
    // if (movieId != null) {
    //   let movieTemp = this.movieService.getMovieById(+movieId) ?? null;
    //   if(movieTemp != null) {
    //     this.movieService.getMovieById(+movieId).subscribe(result => this.movie = result)
    //   }
    // }
  }

}
