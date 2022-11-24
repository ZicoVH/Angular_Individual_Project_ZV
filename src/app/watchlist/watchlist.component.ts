import { Component, Input, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  movies: any = [];
  @Input() movie!: Movie;


  constructor(private movieService: MovieService) { }



  ngOnInit(): void {
    this.getAllMoviesFromWatchlist();
  }


  getAllMoviesFromWatchlist() {
    this.movieService.getWatchlist().subscribe((r:any)=> {
      for (var i=0; i < r.length; i++) {
        let movieId = r[i].movieId;
        console.log(movieId);
        if (!r[i].watchedorNot){
          this.movieService.getMovieById(movieId).subscribe((r:any) => {
            this.movies.push(r)
            console.log(this.movies);
            console.log(r.title);
          })
        }



      }
    })
  }


}
