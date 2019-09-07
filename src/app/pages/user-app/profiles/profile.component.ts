import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { User } from './profile.model';
@Component({
  moduleId: 'module.id',
  selector: 'user-profile-root',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{
  private users:Array<User>;
  searchText: string;
  constructor( private dataService: DataService ){}
  ngOnInit(){
    this.dataService.getUsers()
    .subscribe((data:User[]) => {
       this.users = data
    })  
  }


  filterIt(arr, searchKey) {
    var ash= arr.filter((obj) => {
      var lux =  Object.keys(obj).some((key) => {
        var di= obj[key].search(searchKey);
        return di;
      });
      return lux;
    });
    return ash;
  }

  linearSearch(array, toFind){
    for(let i = 0; i < array.length; i++){
      if(array[i].name === toFind) return i;
    }
    return -1;
  }

  search() {
    if (!this.searchText) {
      return this.users;
    }
    if (this.searchText) {
      var position_no = this.linearSearch(this.users, this.searchText);
      var arr = [];
      var newObj = this.users[position_no];
      arr.push(newObj)
      return arr;
    }
  }

}
