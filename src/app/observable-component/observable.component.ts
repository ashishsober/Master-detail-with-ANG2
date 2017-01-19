import { Component, Input,OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as Rx from "rxjs/Rx";

import {HeroService} from '../service/hero.service';
import { Hero } from '../hero';


@Component({
  moduleId: 'module.id',
  selector: 'my-observable-component',
  template: `{{ title }}`,
  styleUrls:[],
})
export class ObservableComponent implements OnInit{
 title = 'Craze of Observable';
   constructor(){}

   ngOnInit() : void{}

   
              
}
