import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // movies: any;
  movies!: Movie[];
  subscription! : Subscription;

  movies$: Observable<any> = new Observable();

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies() {
    this.movieService.getMovies().subscribe((r:any) => {
      this.movies = r.results;
    });

  }

}
