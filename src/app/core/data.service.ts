import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HEROES, FIELDMETADATA, titles, gender, country } from './mock-data';
import { Hero, lov } from './interface';
// import { Observable } from 'rxjs/Rx';
import { Observable, throwError } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as Rx from "rxjs/Rx";


@Injectable()
export class DataService {
      @Output() fire: EventEmitter<any> = new EventEmitter();


      //use promisess here to call asynchronous call,If the data is coming from the remote server
      //so that over code will not get blocked. for the waiting of the respond from the server
      constructor(private http: Http) {
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
                  case 'Title':
                        return Promise.resolve(titles);
                  case 'Nationality':
                        return Promise.resolve(country);
                  default:
                        return Promise.resolve(gender);

            }
      }

      
      /**
       * firring api's
       */

      getHostname(){
            let hostname:string='';
            if (window.location.host === 'localhost:4200'){
                  hostname = "http://localhost:1337";
            } else if (window.location.host === 'angular-project-5cb99.firebaseapp.com'){
                  hostname = "http://ec2-3-16-206-69.us-east-2.compute.amazonaws.com:1337";
            } else {
                  hostname = 'http://ec2-3-16-206-69.us-east-2.compute.amazonaws.com:1337';
            }
            console.log(hostname);
            return hostname;
      }

      postSubmitApplicant(data): Observable<any> {
            let getHostname=this.getHostname();
            let url = getHostname.concat('/register/user')
            return this.http.post(url, data)
                  .map(this.extractData)
                  .catch(this.handleError);
      }

      getUsersCount(): Observable<any> {
            let getHostname=this.getHostname();
            let url = getHostname.concat('/register/users/count')
            return this.http.get(url)
                  .map(this.extractData)
                  .catch(this.handleError);
      }

      getUsers():Observable<any>{
            let getHostname=this.getHostname();
            let url = getHostname.concat('/register/user')
            return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
      }

      private extractData(res: Response) {
            let body = res.json();
            return body || {}
      }

      private handleError(error: Response) {
            // In a real world app, we might use a remote logging infrastructure
            let errMsg: string;
            if (error instanceof Response) {
                  const body = error.json() || '';
                  const err = body.error || JSON.stringify(body);
                  errMsg = err;//`${error.status} - ${error.statusText || ''} ${err}`;
            } else {
                  errMsg = "error";
            }
            return throwError(errMsg);
            //return errMsg;
      }
}