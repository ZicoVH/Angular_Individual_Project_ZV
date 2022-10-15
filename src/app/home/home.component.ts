import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // movies: any;
  movies!: Movie[];
  subscription! : Subscription;
  searchBox!: HTMLInputElement;
  typeAhead!: Observable<Movie[]>;
  searchMovies: any = [];

  constructor(private movieService: MovieService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllMovies();

    this.searchBox = document.getElementById('searchMovie') as HTMLInputElement;

    this.typeAhead = fromEvent(this.searchBox, 'input').pipe(
        map(e => (e.target as HTMLInputElement).value),
        filter(text => text.length >= 2),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchTerm => this.movieService.searchMovies(searchTerm))
    );

    //fromEvent: returns observable from event
    //map: the event is the observable value, we map it to the value of HTML element = input text
    //filter: only execute if minimum length >= 2
    //debounceTime: wait for a break in the keystrokes to send request
    //distinctUntilChanged: don't send a request if the value stays the same (rapidly hit a character and then backspace for instance)

    this.subscription = this.typeAhead.subscribe((r:any) => {
        console.log(r)
        this.searchMovies = r.results;
    })
  }


  getAllMovies() {
    this.movieService.getMovies().subscribe((r:any) => {
      this.movies = r.results;
    });
  }


}
