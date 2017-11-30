import { Component ,OnInit,Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
//import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  moduleId: 'module.id',
  selector: 'my-todo',
  templateUrl:'./todo.component.html',
  styleUrls:[]
})
export class TodoComponent implements OnInit {
  textMessage:string;
  items: FirebaseListObservable<any[]>;
  show=false;
  constructor(private af: AngularFireDatabase ) {  
  }

  ngOnInit(){
    this.items=this.af.list('/messages');
  }
  
  myMessage(textMessage: string){
    //console.log(this.textMessage);
    this.items.push(textMessage);
    this.textMessage='';
  }

 }