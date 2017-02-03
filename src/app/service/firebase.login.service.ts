import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as firebase from 'firebase';



@Injectable()
export class FirebaseLoginService {
    private _messaging: firebase.messaging.Messaging;
 }