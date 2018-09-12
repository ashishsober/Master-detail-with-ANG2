import { Component, OnInit } from '@angular/core';
import { HandService } from './hand.service';
import { BotService } from './bot.service';
import { Injectable, Input, Output, EventEmitter } from '@angular/core';

@Injectable()

//holdem.js
export class HoldemService {
  constructor(private handComponent: HandService,
    private botService: BotService) { }
}
