import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Menu } from 'src/app/models/menu';
import { AppSate } from 'src/app/store/app.reducer';
import * as uiActions from '../../store/actions/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, OnDestroy {

  menuLst: Menu[]=[];
  menuSubs: Subscription;
  
  constructor(private store: Store<AppSate>) { }

  ngOnInit(): void {

    this.menuSubs = this.store.select('menu').subscribe( men => {
      if(men.loaded){
          this.menuLst = men.menu;          
      }
    })
  }

  getRuta( it: Menu ) {
    this.store.dispatch( uiActions.getBreadcrumb({ modulo: it.nombrePadre, item: it.nombre}));
    
    //console.log(it);
    //console.log('hace click', this.router);
    // this.router.events.subscribe(event => {
    //   if (event instanceof RoutesRecognized) {
    //     let route = event.state.root.firstChild;
    //     console.log('Page', route.data);
    //   }
    // });

    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => this.menuItems = this.createBreadcrumbs(this.activatedRoute.root));

  }

  ngOnDestroy(): void {
    this.menuSubs.unsubscribe();
  }

 
}