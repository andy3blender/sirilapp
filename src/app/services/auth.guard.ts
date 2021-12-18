import { Injectable } from '@angular/core';
import { CanActivate, CanLoad ,Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppSate } from '../store/app.reducer';
import { take, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {

  constructor( private store: Store<AppSate>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select('login'),
      map(authed => {
          // `authed` is boolean as we defined in "Actions" as `isAuthenticated`
        if (!authed.authenticated) {
            // Dispatch an event to let "Effects" navigate users to login
          //this.store.dispatch(new Auth.LoginRequired());
          this.router.navigate(['/login'])
          return false;
        }
        // Let "Router" allow user entering the page
        return true;
      })
    );
  }

  canLoad(): Observable<boolean> {
    return this.store.pipe(
      select('login'),
      map(authed => {
          // `authed` is boolean as we defined in "Actions" as `isAuthenticated`
        if (!authed.authenticated) {
            // Dispatch an event to let "Effects" navigate users to login
          //this.store.dispatch(new Auth.LoginRequired());
          //console.log('No esta logeado');
          this.router.navigate(['/login'])
          return false;
        }
        // Let "Router" allow user entering the page
        //console.log('Si esta logeado');
        return true;
      }), take(1)
    );
  }

  
}
