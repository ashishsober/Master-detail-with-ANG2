import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { HeroService } from '../../service/hero.service';
import { Hero } from '../../service/hero';


@Component({
  moduleId: 'module.id',
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private heroservice: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => this.heroservice.getHero(+params['id'])))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
