import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  movieId: number = 0;
  movie:any;

  isSubmitted: boolean = false;
  errorMessage: string = "";

  category$: Subscription = new Subscription();
  postCategory$: Subscription = new Subscription();
  putCategory$: Subscription = new Subscription();

  constructor(private router: Router, private movieService: MovieService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.movieId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.movieId != null && this.movieId > 0) {
      this.category$ = this.movieService.getMovieById(this.movieId).subscribe(result => this.movie = result);
    }
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.category$.unsubscribe();
    this.postCategory$.unsubscribe();
    this.putCategory$.unsubscribe();
  }

  // onSubmit() {
  //   this.isSubmitted = true;
  //   if (this.isAdd) {
  //     this.postCategory$ = this.movieService.postCategory(this.movie).subscribe({
  //       next: (v) => this.router.navigateByUrl("/admin/category"),
  //       error: (e) => this.errorMessage = e.message
  //     });
  //   }
  //   if (this.isEdit) {
  //     this.putCategory$ = this.categoryService.putCategory(this.categoryId, this.category).subscribe({
  //       next: (v) => this.router.navigateByUrl("/admin/category"),
  //       error: (e) => this.errorMessage = e.message
  //     });
  //   }
  // }

}
