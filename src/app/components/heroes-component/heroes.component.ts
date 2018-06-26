import { Component ,OnInit } from '@angular/core';
import { Hero } from '../../service/hero';
import {HeroService} from '../../service/hero.service';

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
  
  //We pass our callback function as an argument to the promise's {then} method:
  getHeroes() :void{
      this.heroService.getHeroes().then(heroes => this.heroes=heroes);
  }

  ngOnInit(){
      this.getHeroes();
  }

  onSelect(hero1: Hero): void {
    this.selectedHero = hero1;
  }
  // //hard coded value
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
}
