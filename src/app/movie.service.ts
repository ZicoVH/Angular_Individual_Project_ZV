import { Injectable } from '@angular/core';
import { Movie } from './movie';

import { HttpClient } from '@angular/common/http';
import { Observable,timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private httpClient: HttpClient) {
  }

  getMovies() : Observable<Movie[]> {
    return this.httpClient.get<any[]>("https://api.themoviedb.org/3/movie/popular?api_key=005e372cbd4dab113edccadcc0ae5dff&page=1");
  }




  getMovieById(id: number){
    return this.httpClient.get<any[]>(`https://api.themoviedb.org/3/movie/${id}?api_key=005e372cbd4dab113edccadcc0ae5dff`)
  }

  searchMovies(filter: string) : Observable<Movie[]> {
    console.log(filter)
    if (filter == ' ') {
      return this.getMovies();
    }
    else {
      return this.httpClient.get<Movie[]>(`https://api.themoviedb.org/3/search/movie?api_key=005e372cbd4dab113edccadcc0ae5dff&query=${filter}`)
    }
  }

}


// export class MovieService {
//   private movies: Movie[] = [];

//   constructor() {
//     let movie1: Movie = {
//       id:1,
//       title: "Spiderman HomeComing",
//       release_date: "25/09/2022",
//       image: "https://images.pexels.com/photos/5691359/pexels-photo-5691359.jpeg?auto=compress&cs=tinysrgb&w=300",
//       content: "Spider-Man: Homecoming is a 2017 American superhero film based on the Marvel Comics character Spider-Man, co-produced by Columbia Pictures and Marvel Studios, and distributed by Sony Pictures Releasing. It is the second Spider-Man film reboot and the 16th film in the Marvel Cinematic Universe (MCU). The film was directed by Jon Watts, from a screenplay by the writing teams of Jonathan Goldstein and John Francis Daley, Watts and Christopher Ford, and Chris McKenna and Erik Sommers. Tom Holland stars as Peter Parker / Spider-Man, alongside Michael Keaton, Jon Favreau, Gwyneth Paltrow, Zendaya, Donald Glover, Jacob Batalon, Laura Harrier, Tony Revolori, Bokeem Woodbine, Tyne Daly, Marisa Tomei, and Robert Downey Jr. In Spider-Man: Homecoming, Peter Parker tries to balance high school life with being Spider-Man while facing the Vulture (Keaton)."
//     };

//     let movie2: Movie = {
//       id:2,
//       title: "Thor, Love and Thunder",
//       release_date: "17/03/2021",
//       image: "https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&w=300",
//       content: "Thor: Love and Thunder is a 2022 American superhero film based on Marvel Comics featuring the character Thor, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the sequel to Thor: Ragnarok (2017) and the 29th film in the Marvel Cinematic Universe (MCU). The film is directed by Taika Waititi, who co-wrote the script with Jennifer Kaytin Robinson, and stars Chris Hemsworth as Thor alongside Christian Bale, Tessa Thompson, Jaimie Alexander, Waititi, Russell Crowe, and Natalie Portman. In the film, Thor attempts to find inner peace, but must return to action and recruit Valkyrie (Thompson), Korg (Waititi), and Jane Foster (Portman)—who is now the Mighty Thor—to stop Gorr the God Butcher (Bale) from eliminating all gods."
//     };

//     this.movies.push(movie1);
//     this.movies.push(movie2);

//   }

//   getMovies(): Movie[] {
//     return this.movies;
//   }

//   getMovieById(id: number) : Movie | null {
//     return this.movies.find(a=>a.id == id) ?? null;
//   }


// }
