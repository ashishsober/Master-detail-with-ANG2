import { Component, Input,OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as Rx from "rxjs/Rx";

import {HeroService} from '../service/hero.service';
import { Hero } from '../hero';


@Component({
  moduleId: 'module.id',
  selector: 'my-observable-component',
  templateUrl:'./observable.component.html',
  styleUrls:[],
})
export class ObservableComponent implements OnInit{
 
 search : String;
 errorMessage:String;
 heroes :Hero[];
 

   constructor(private heroservice :HeroService){}
   
   ngOnInit() : void{
     this.search = 'Please do something';
    // const sourceTwo = Rx.Observable.timer(0, 5000);

    // //switch to new inner observable when source emits, emit items that are emitted  
    // const example = sourceTwo.switchMap(() => Rx.Observable.interval(500));

    // //output: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
    // const subscribe = example.subscribe(val => console.log(val));
    this.getHeroesFromServer();
   }


   getHeroesFromServer(){
     this.heroservice.getHeroes().subscribe(data=>this.heroes=data);
  
   }
   
              
}
