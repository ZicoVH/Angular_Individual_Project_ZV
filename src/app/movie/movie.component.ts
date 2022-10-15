import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, Subscription, switchMap } from 'rxjs';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
    countries: Movie[] = [];
    searchBox!: HTMLInputElement;
    typeAhead!: Observable<Movie[]>;
    subscription!: Subscription;

  @Input() movie!: Movie;
  constructor(private router: Router, private movieService: MovieService) { }

  ngOnInit(): void {
  }


}

