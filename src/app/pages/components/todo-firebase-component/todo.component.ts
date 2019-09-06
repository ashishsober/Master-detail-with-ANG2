import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  moduleId: 'module.id',
  selector: 'my-todo',
  templateUrl: './todo.component.html',
  styleUrls: []
})
export class TodoComponent implements OnInit, OnChanges {
  textMessage: string;
  items: any[];
  show = true;
  constructor() { }

  ngOnInit() {
    // this.firebaseloginservice.getMessageData()
    //   .subscribe(result => {
    //     this.items = result;
    //     this.show = false;
    //   })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // changes.prop contains the old and the new value...
    console.log("my item list getting updated");
  }

  myMessage(textMessage: string) {
    //this.firebaseloginservice.submitMessage(textMessage);
    //this.textMessage = '';
  }

  // delete(key: string) {
  //   console.log("key to delete---" + key);
  //   this.af.object('/messages/' + key).remove();
  // }
}