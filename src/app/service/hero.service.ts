import {Injectable} from '@angular/core';
import {HEROES} from './mock-heroes';
import { Hero } from '../hero';

import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as Rx from "rxjs/Rx";

@Injectable()
export class HeroService {
private heroesUrl = 'https://jsonplaceholder.typicode.com/photos'; //url to web API 

//use promisess here to call asynchronous call,If the data is coming from the remote server
//so that over code will not get blocked. for the waiting of the respond from the server

  constructor(private http:Http){
    let myObservable = Observable.range(0,10);
    myObservable.subscribe(
        data=>{
          console.log(data);
        }
    )

    let source = Observable.create((observer) => {
      setTimeout(() => {
        console.log('timeout hit');
        observer.next('Observable 101');
      }, 1000);
      console.log('observable initialized');
    });

    source.subscribe(x => console.log("Getting the data sended by the observer " +x));

  }

  getHeroes() : Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
                               .map(this.extractData)
                               .catch(this.handleError)
  }
  
private extractData(res:Response){
  let body=res.json();
  return body || { }
}

private handleError(error:Response){
  // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = "error";
    }
    console.error(errMsg);
    return Observable.throw(errMsg);

}

//   getHero(id: number): Promise<Hero> {
//   return this.getHeroes()
//              .then(heroes => heroes.find(hero => hero.id === id));
// }

}