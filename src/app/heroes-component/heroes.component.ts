import { Component ,OnInit } from '@angular/core';
import { Hero } from '../hero';
import {HeroService} from '../service/hero.service';
import { Observable }       from 'rxjs/Observable';
import { WikipediaService } from '../service/wiki.service';

@Component({
  moduleId: 'module.id',
  selector: 'my-heroes',
  templateUrl:'./heroes.component.html',
  styleUrls:["./heroes.component.css"]
})
export class HeroesComponent {
  title   = 'Wikipedia Demo';
  fetches = 'Fetches after each keystroke';
  items: Observable<string[]>;
  search (term: string) {
    this.items = this.wikipediaService.search(term);
  }
  constructor (private wikipediaService: WikipediaService) { }
}
