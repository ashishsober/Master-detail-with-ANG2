import { Component, OnInit } from '@angular/core';
import { Hero } from '../../core/interface';
import { DataService } from '../../core/data.service';

@Component({
  moduleId: 'module.id',
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ["./heroes.component.scss"]
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;
  public heroes: Hero[];
  constructor(private dataService: DataService) { }

  //We pass our callback function as an argument to the promise's {then} method:
  getHeroes(): void {
    this.dataService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero1: Hero): void {
    this.selectedHero = hero1;
  }
}
