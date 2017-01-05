import { Component ,OnInit } from '@angular/core';
import { Hero } from '../hero';
import {HeroService} from '../service/hero.service';

@Component({
  selector: 'my-heroes',
  template:`
            
            
            <ul class="heroes">
                <li *ngFor="let hero of heroes" (click)="onSelect(hero)">
                  <span class="badge">{{hero.id}}</span> {{hero.name}}
                </li>
            </ul>
            <hr/>
            <h2>{{hero.name}} details!</h2>
            <div><label>id: </label>{{hero.id}}</div>
            <div>
              <label>name: </label>
              <input [(ngModel)]="hero.name" placeholder="name">
            </div>
            <hr/>
            <my-hero-detail [hero]="selectedHero"></my-hero-detail>


            `,
   styleUrls:["app/css/app.component.css"]
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
  //hard coded value
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}
