import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: 'module.id',
  selector: 'ngx-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  sidebarList;
  constructor(){}
  ngOnInit(){
   this.sidebarList = [
     {label:'Dashboard',link:'dashboard',icon:'fa fa-globe'},
     {label:'Heroes',link:'heroes',icon:'fa fa-th-list'},
     {label:'Form',link:'basic-information',icon:'fa fa-forumbee'},
     {label:'Messenger',link:'todoFirebase',icon:'fa fa-envelope'}
    ];
  }
}
