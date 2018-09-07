import { Component } from '@angular/core';


@Component({
  moduleId: 'module.id',
  selector: 'app-root',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  showMenu : boolean = true;
  constructor() {}

}
