import { Component ,OnInit } from '@angular/core';
import { Hero } from '../hero';
import {HeroService} from '../service/hero.service';

@Component({
  moduleId: 'module.id',
  selector: 'my-heroes',
  templateUrl:'./heroes.component.html',
  styleUrls:["./heroes.component.css"]
})
export class HeroesComponent implements OnInit{ 

  selectedHero: Hero;
  public heroes:Hero[];

  constructor(private heroService:HeroService){ }
  
  ngOnInit(){
      this.getHeroes();
  }

//We pass our callback function as an argument to the promise's {then} method:
  getHeroes() :void{
      this.heroService.getHeroes()
                  .subscribe(data => this.heroes=data);
  }

  onSelect(hero1: Hero): void {
    this.selectedHero = hero1;
  }
  
}
