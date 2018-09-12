import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: 'module.id',
  selector: 'ngx-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  sidebarList;
  constructor(private route:Router){}
  ngOnInit(){
    if(this.route.url === '/userapp/UserAppDataComponent/profile' || this.route.url === '/userapp/UserAppDataComponent/location'){
      this.sidebarList = [
        {label:'Profiles',link:'./profile',icon:'fa fa-globe'},
        {label:'Location',link:'./location',icon:'fa fa-th-list'}
       ];
    } else {
      this.sidebarList = [
        {label:'Dashboard',link:'/dashboard',icon:'fa fa-globe'},
        {label:'Heroes',link:'/heroes',icon:'fa fa-th-list'},
        {label:'Form',link:'/basic-information',icon:'fa fa-forumbee'},
        {label:'Messenger',link:'/todoFirebase',icon:'fa fa-envelope'}
       ];
    }
  }
}
