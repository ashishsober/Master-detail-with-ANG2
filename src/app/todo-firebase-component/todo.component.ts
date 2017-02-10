import { Component ,OnInit,Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  moduleId: 'module.id',
  selector: 'my-todo',
  templateUrl:'./todo.component.html',
  styleUrls:[]
})
export class TodoComponent {
  textMessage:string;
  items: FirebaseListObservable<any[]>;
  
  constructor(af: AngularFire ) { 
    this.items=af.database.list('/messages');
  }
  
  myMessage(textMessage: string){
    //console.log(this.textMessage);
    this.items.push(textMessage);
    this.textMessage='';
  }

 }