import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/data.service';
@Component({
  moduleId: 'module.id',
  selector: 'user-profile-root',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{
  private users;
  searchText: string;
  constructor( private dataService: DataService ){}
  ngOnInit(){
    this.dataService.getUsers()
    .subscribe(data => {
       this.users = data;
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

  search() {
    if (!this.searchText) {
      return this.users;
    }
    if (this.searchText) {
      return this.filterIt(this.users, this.searchText);
    }
  }

}
