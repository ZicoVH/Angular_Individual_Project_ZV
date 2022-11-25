import { Component, Input, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { Movie } from '../movie';
import { MovieJava } from '../movie-java';
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
    this.movies = []
    this.movieService.getWatchlist().subscribe((r:any)=> {
      r.forEach((e:MovieJava)=> {
        if (!e.watchedorNot){
          this.movies.push(e)
        }
      })
      // for (var i=0; i < r.length; i++) {
      //   if (!r[i].watchedorNot){
      //     this.movieService.getMovieById(r[i].id).subscribe((r:any) => {
      //       this.movies.push(r)
      //       console.log(this.movies);
      //       console.log(r.title);
      //     })
      //   }



      // }
    })
  }


}
