import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase ,FirebaseListObservable} from 'angularfire2/database-deprecated';
// for Observables
//import {FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';



@Injectable()
export class FirebaseLoginService {
    private _messaging: firebase.messaging.Messaging;
    provider = new firebase.auth.GoogleAuthProvider();
    storage = firebase.storage();
    storageRef = this.storage.ref();
    items: FirebaseListObservable<any[]>;
    
    constructor(private af: AngularFireAuth,
                private afdatabase: AngularFireDatabase) { 
      //this.items=af.database.list('/messages');
    }
    
    
    getAuth() {
          return firebase.auth().signInWithPopup(this.provider);
    }

    getLogout(){
      return firebase.auth().signOut();
      // return firebase.auth().signOut().then(function(){
      //      return true;
      // }).catch(function(error){
      //     console.log(error);
      // })
    }
    
    
    UploadFile(fileData) {
       //console.log(fileData+"inside service");  
       var metadata = {
          contentType: fileData[0].type
        }; 
       var uploadTask = this.storageRef.child('images/' + fileData[0].name).put(fileData[0], metadata);
       
       uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
         (snapshot) => {
           var progress=(uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
           console.log('Upload is ' + progress + '% done');
           switch(uploadTask.snapshot.state){
             case firebase.storage.TaskState.PAUSED: console.log('Upload is paused');
             break;
             case firebase.storage.TaskState.RUNNING: console.log('Upload is running');
             break;
           }
         },function(error){
           console.log(error);
         },function(){
           // Upload completed successfully, now we can get the download URL
           var downloadedUrl = uploadTask.snapshot.downloadURL;
           console.log("My downloaded url " + downloadedUrl);
         }
       );
       return "done";   
    }

    getMessageData() : FirebaseListObservable<any[]>{
      return this.items=this.afdatabase.list('/messages');
    }

    submitMessage(message:string){
      this.items.push(message);
    }

    loggedInUser(){

    }



    
 }