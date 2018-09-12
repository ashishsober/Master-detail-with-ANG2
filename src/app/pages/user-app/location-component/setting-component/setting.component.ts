import { Component, OnInit } from '@angular/core';
import { HandService } from '../@core/hand.service';
import { BotService } from '../@core/bot.service';
import { HoldemService } from '../@core/holdem.service';
@Component({
  moduleId: 'module.id',
  selector: 'ngx-setting-root',
  templateUrl: './setting.component.html'
})

//holdem.js
export class SettingComponent {

constructor(private holdemService: HoldemService){}


 
}
