import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HEROES, FIELDMETADATA, titles, gender, country } from './mock-data';
import { Hero, lov } from './interface';
// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import * as Rx from "rxjs/Rx";


@Injectable()
export class DataService {
      @Output() fire: EventEmitter<any> = new EventEmitter();


      //use promisess here to call asynchronous call,If the data is coming from the remote server
      //so that over code will not get blocked. for the waiting of the respond from the server
      constructor() {
            console.log('shared service started');
      }

      getHeroes(): Promise<Hero[]> {
            return Promise.resolve(HEROES);
      }

      getHero(id: number): Promise<Hero> {
            return this.getHeroes()
                  .then(heroes => heroes.find(hero => hero.id === id));
      }

      show() {
            console.log('show started');
            this.fire.emit(false);
      }

      hide() {
            console.log('hide started');
            this.fire.emit(true);
      }

      getEmittedValue() {
            return this.fire;
      }

      getFieldmetadata(): Promise<any> {
            return Promise.resolve(FIELDMETADATA);
      }

      getLov(lov: string): Promise<lov[]> {
            switch (lov) {
                  case 'Title': return Promise.resolve(titles);
                  case 'Nationality':return Promise.resolve(country);
                  default: return Promise.resolve(gender);
            
            }

      }
}