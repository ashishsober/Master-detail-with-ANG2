import {Injectable} from '@angular/core';
import {HEROES} from './mock-heroes';
import { Hero } from '../hero';


@Injectable()
export class HeroService {


//use promisess here to call asynchronous call,If the data is coming from the remote server
//so that over code will not get blocked. for the waiting of the respond from the server
//     getHeroes() {
//     return new Promise<Hero[]>(resolve =>
//       setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
//     );
//   }
  
  getHeroes() : Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }
  
  getHero(id: number): Promise<Hero> {
  return this.getHeroes()
             .then(heroes => heroes.find(hero => hero.id === id));
}

}