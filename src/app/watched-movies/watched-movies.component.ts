import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-watched-movies',
  templateUrl: './watched-movies.component.html',
  styleUrls: ['./watched-movies.component.css']
})
export class WatchedMoviesComponent implements OnInit {
  movies: any = [];

  constructor(private router: Router,private movieService: MovieService, private route: ActivatedRoute,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getAllMoviesFromWatched();
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
