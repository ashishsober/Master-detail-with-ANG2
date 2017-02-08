import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class FirebaseLoginService {
    private _messaging: firebase.messaging.Messaging;
    provider = new firebase.auth.GoogleAuthProvider();
    constructor(af: AngularFire) { 
      //this.items=af.database.list('/messages');
        
    }
    getAuth() {
     return firebase.auth().signInWithPopup(this.provider);
    }
 }