import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'explore',
    loadComponent: () => import('./explore/explore.page').then(m => m.ExplorePage),
  },
  {
    path: 'favourites',
    loadComponent: () => import('./favourites/favourites.page').then(m => m.FavouritesPage),
  },
];