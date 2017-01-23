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
// export class HeroesComponent implements OnInit{ 

//   selectedHero: Hero;
//   public heroes:Hero[];

//   constructor(private heroService:HeroService){ }
  
//   ngOnInit(){
//       this.getHeroes();
//   }

// //We pass our callback function as an argument to the promise's {then} method:
//   getHeroes() :void{
//       this.heroService.getHeroes()
//                   .subscribe(data => this.heroes=data);
//   }

//   onSelect(hero1: Hero): void {
//     this.selectedHero = hero1;
//   }
  
// }
export class HeroesComponent {
  title   = 'Wikipedia Demo';
  fetches = 'Fetches after each keystroke';
  items: Observable<string[]>;
  search (term: string) {
    this.items = this.wikipediaService.search(term);
  }
  constructor (private wikipediaService: WikipediaService) { }
}
