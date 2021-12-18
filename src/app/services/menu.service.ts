import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import * as globals from '../globals';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  private url = globals.apiUrl; //"https://localhost:44374/api";

  constructor(private http: HttpClient) { }

  getMenus() {
    return this.http.get<Menu[]>(`${this.url}/menus`);
  }

  getMenuByUser(login: string) {
    return this.http.get<Menu[]>(`${this.url}/menus/${login}`);
  }

  getBreadcrumb(modulo: string, item: string) {
    return of(`${modulo} » ${item}`);
  }


}
