import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActiveGameResponse } from '../../../dtos/activeGameResponse';
import { GameTypeEnum } from '../../../enums/gameTypeEnum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { GameThrowMultiplierEnum } from '../../../enums/gameThrowMultiplierEnum';

@Component({
  selector: 'app-game-input',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FontAwesomeModule
  ],
  templateUrl: './game-input.component.html',
  styleUrl: './game-input.component.scss'
})
export class GameInputComponent implements OnInit, OnDestroy {

  constructor(

  ) { }

  fa = fa;
  gameThrowMultiplierEnum = GameThrowMultiplierEnum;

  game: ActiveGameResponse = new ActiveGameResponse();

  currentGameTime = "";
  inputType = "keys"; // keys, board
  multiplier: GameThrowMultiplierEnum = GameThrowMultiplierEnum.SINGLE;
  keys = [
    { key: "1", value: 1 },
    { key: "2", value: 2 },
    { key: "3", value: 3 },
    { key: "4", value: 4 },
    { key: "5", value: 5 },
    { key: "6", value: 6 },
    { key: "7", value: 7 },
    { key: "8", value: 8 },
    { key: "9", value: 9 },
    { key: "10", value: 10 },
    { key: "11", value: 11 },
    { key: "12", value: 12 },
    { key: "13", value: 13 },
    { key: "14", value: 14 },
    { key: "15", value: 15 },
    { key: "16", value: 16 },
    { key: "17", value: 17 },
    { key: "18", value: 18 },
    { key: "19", value: 19 },
    { key: "20", value: 20 },
    { key: "25", value: 25 }
  ]

  currentGameTimeInterval: any = null;

  ngOnInit(): void {
    // testing
    this.game.uuid = "00000000-0000-0000-0000-000000000001";
    this.game.gameStartTime = new Date(Date.now() - Math.random() * 100000);
    this.game.currentTurn = 5;
    this.game.gameType = GameTypeEnum.CLASSIC;
    this.game.gameTypeClassicPoints = 101;

    this.gameTime();
  }

  ngOnDestroy(): void {
    if (this.currentGameTimeInterval) {
      clearInterval(this.currentGameTimeInterval);
      this.currentGameTimeInterval = null;
    }
  }

  public isButtonDisabled(key: number): boolean {
    if(this.multiplier === GameThrowMultiplierEnum.TRIPPLE && key == 25) {
      return true;
    } else {
      return false;
    }
  }

  public pointsInput(keyValue: number): void {
    if(keyValue === 25 && this.multiplier === GameThrowMultiplierEnum.TRIPPLE) {
      this.multiplier = GameThrowMultiplierEnum.SINGLE;
    }
    this.multiplier = GameThrowMultiplierEnum.SINGLE;
  }

  private gameTime() {
    this.currentGameTimeInterval = setInterval(() => {
      const now = new Date();
      if (this.game.gameStartTime) {
        const elapsed = Math.floor((now.getTime() - this.game.gameStartTime.getTime()) / 1000);
        const time = new Date(elapsed * 1000);
        const hours = time.getUTCHours() > 0 ? time.getUTCHours() + ":" : "";
        const minutes = time.getUTCMinutes().toString().padStart(2, '0');
        const seconds = time.getUTCSeconds().toString().padStart(2, '0');
        this.currentGameTime = hours + minutes + ":" + seconds;
      }
    }, 1000);
  }
}
