import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'watchlist',component: WatchlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
