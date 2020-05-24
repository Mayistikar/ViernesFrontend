import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon?: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/table/users', title: 'Usuarios',  icon:'pe-7s-user', class: '' },
    { path: '/table/devices', title: 'Dispositivos',  icon:'pe-7s-note2', class: '' },
    { path: '/user', title: 'Usuarios', class: 'd-none' },
    { path: '/device', title: 'Dispositivos', class: 'd-none' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
