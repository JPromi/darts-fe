import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActiveGameResponse } from '../../../dtos/activeGameResponse';
import { GameTypeEnum } from '../../../enums/gameTypeEnum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { GameThrowMultiplierEnum } from '../../../enums/gameThrowMultiplierEnum';
import { ActiveGamePlayerResponse } from '../../../dtos/activeGamePlayerResponse';
import { GameThrow } from '../../../entities/gameThrow';
import { GameThrowTypeEnum } from '../../../enums/gameThtowTypeEnum';

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
  isOnStartFullscreen = false;
  isFullscreen = false;
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
    this.game.gameTypeClassicInType = "single";
    this.game.gameTypeClassicOutType = "double";
    this.game.players = [
      new ActiveGamePlayerResponse("00000000-0000-0000-0000-000000000001", 1, "Player 1", "https://placehold.co/128", [new GameThrow(20, GameThrowMultiplierEnum.DOUBLE, 0, GameThrowTypeEnum.POINTS)], [new GameThrow(20, GameThrowMultiplierEnum.DOUBLE, 0, GameThrowTypeEnum.POINTS)], 158, 38.5, false, false, false),
      new ActiveGamePlayerResponse("00000000-0000-0000-0000-000000000002", 2, "Player 2", "https://placehold.co/128", [new GameThrow(10, GameThrowMultiplierEnum.SINGLE, 0, GameThrowTypeEnum.POINTS)], [new GameThrow(20, GameThrowMultiplierEnum.DOUBLE, 0, GameThrowTypeEnum.POINTS)], 456, 58.5, true, false, false),
      new ActiveGamePlayerResponse("00000000-0000-0000-0000-000000000003", 3, "Player 3", "https://placehold.co/128", [new GameThrow(18, GameThrowMultiplierEnum.TRIPPLE, 0, GameThrowTypeEnum.POINTS)], [new GameThrow(20, GameThrowMultiplierEnum.DOUBLE, 0, GameThrowTypeEnum.POINTS)], 65, 100.5, false, false, false),
    ]
    this.sortPlayers();

    this.checkIsFullscreen();
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
    if(keyValue === 0) {
      this.multiplier = GameThrowMultiplierEnum.SINGLE;
    }
    this.multiplier = GameThrowMultiplierEnum.SINGLE;
  }

  public toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      this.isFullscreen = false;
    } else {
      document.documentElement.requestFullscreen();
      this.isFullscreen = true;
    }
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

  private sortPlayers() {
    this.game.players.sort((a, b) => {
      if (a.isCurrentPlayer && !b.isCurrentPlayer) {
        return -1;
      } else if (!a.isCurrentPlayer && b.isCurrentPlayer) {
        return 1;
      } else {
        return a.order - b.order;
      }
    });
  }

  private checkIsFullscreen() {
    if(window.innerWidth == screen.width && window.innerHeight == screen.height) {
      this.isOnStartFullscreen = true;
    } else {
      this.isOnStartFullscreen = false;
    }
  }
}
