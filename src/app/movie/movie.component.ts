import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie = {
    id: 0,
    title: '',
    image: '',
    release_date: '',
  }

  constructor() { }

  ngOnInit(): void {
  }

}
