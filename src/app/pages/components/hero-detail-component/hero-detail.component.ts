import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../../../core/data.service';
import { Hero } from '../../../core/interface';


@Component({
  moduleId: 'module.id',
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => this.dataService.getHero(+params['id'])))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
