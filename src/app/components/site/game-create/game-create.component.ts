import { CommonModule } from '@angular/common';
import { Component, Host, HostListener, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { GroupLightResponse } from '../../../dtos/groupLightResponse';
import { PageResponse } from '../../../dtos/pageResponse';
import { GameNewRequest } from '../../../dtos/gameNewRequest';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GameModes } from '../../../entities/gameModes';
import { GameTypeEnum } from '../../../enums/gameTypeEnum';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProfileService } from '../../../services/profile.service';
import { ProfileLightResponse } from '../../../dtos/profileLightResponse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    FontAwesomeModule,
    DragDropModule
  ],
  templateUrl: './game-create.component.html',
  styleUrl: './game-create.component.scss',
  animations: [
    // step Animation
    trigger('stepAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-1.5rem)' }),
        animate('200ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('200ms ease-in-out', style({ opacity: 0, transform: 'translateX(1.5rem)' }))
      ])
    ]),
    trigger('playerDisappear', [
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(-3.5rem)' }),
        animate('200ms ease-out', style({ opacity: 0, transform: 'translateX(-5rem)' }))
      ])
    ])
  ]
})
export class GameCreateComponent implements OnInit {

  constructor(
    private groupService: GroupService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
  ) { }

  fa = fa;

  public creationStep: number = 3; // 0: group, 1: location, 2: game Type, 3: settings
  public groups: GroupLightResponse[] = [];
  public profileSearchResults: ProfileLightResponse[] = [];
  public game: GameNewRequest = new GameNewRequest();
  public paramsValue = {
    group: null as string | null,
    location: null as string | null,
  }
  public gameModes: GameModes[] = GameModes.list();

  private lastKeyPress: Date = new Date();
  private lastUpdateIntervall: number = .5; // seconds
  private lastUpdateTimeout: any = null;
  public searchQuery: string = '';

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['group']) {
      this.paramsValue.group = params['group'].toString();
      }
      if (params['location']) {
      this.paramsValue.location = params['location'].toString();
      }
      this._loadGroups();
    });
  }

  public nextStep(): void {
    if (this.creationStep < 3) {
      this.creationStep++;
    }
  }

  public previousStep(): void {
    if (this.creationStep > 0) {
      this.creationStep--;
    }
  }

  public selectGroup(group: GroupLightResponse | null): void {
    if (this.game.groupUuid === group?.uuid || group === null) {
      this.game.groupUuid = null;
    } else {
      this.game.groupUuid = group?.uuid;
    }
  }

  public selectGameMode(gameMode: GameTypeEnum): void {
    this.game.gameType = gameMode;
  }

  public clearSearchProfile() {
    if (this.searchQuery != "") {
      this.searchQuery = '';
      this.profileSearchResults = [];
    }
  }

  public selectProfile(profile: ProfileLightResponse | null): void {
    if (!this.game.players.some(player => player.username === profile?.username)) {
      this.game.players.push(profile);
    }
  }

  public selectProfileAsGuest(): void {
    if(this.searchQuery) {
      const guestProfile: ProfileLightResponse = {
        username: this.searchQuery,
        uuid: 'guest',
        avatar: null,
        visibility: 'PUBLIC'
      }

      this.selectProfile(guestProfile);
      this.searchQuery = '';
    }
  }

  public deleteProfile(profile: ProfileLightResponse): void {
    this.game.players = this.game.players.filter(player => player.username !== profile.username);
  }

  public randomizePlayers(): void {
    if (this.game.players.length > 0) {
      this.game.players = this.game.players.sort(() => Math.random() - 0.5);
    }
  }

  public searchProfile() {
    if (!this.lastUpdateTimeout) {
      this.lastUpdateTimeout = setTimeout(() => {
        if (this.lastKeyPress.getTime() + this.lastUpdateIntervall * 1000 < new Date().getTime()) {
          this._searchProfile();
        }
        this.lastUpdateTimeout = null;
      }, this.lastUpdateIntervall * 1000);
    }
  }

  public drop(event: CdkDragDrop<any[]>) {
    const newPlayers = [...this.game.players];
    moveItemInArray(newPlayers, event.previousIndex, event.currentIndex);
    this.game.players = newPlayers; // neu zuweisen → Angular merkt die Änderung
  }

  private _searchProfile() {
    if (this.searchQuery.length == 0) {
      this.profileSearchResults = [];
      return;
    } else {
      this.profileService.searchProfile(this.searchQuery, 0, 5, true).subscribe(
        (response: PageResponse<ProfileLightResponse>) => {
          this.profileSearchResults = response.content;
        }
      );
    }
  }

  private _loadGroups(): void {
    this.groupService.searchGroup("", true, null, 0, 150).subscribe(
      (response: PageResponse<GroupLightResponse>) => {
        this.groups = response.content;

        // Search if selected group exists
        this.game.groupUuid = this._findGroupByUuid(this.paramsValue.group)?.uuid || null;

        // skip step if group is selected or if no group is available
        if (this.game.groupUuid || this.groups.length === 0) {
          this.creationStep = 1;
        }
      }
    );
  }

  private _loadLocations(): void { // ToDo
    this.game.locationUuid = null;
  }

  private _findGroupByUuid(uuid: string | null): GroupLightResponse | null {
    if (uuid === null) {
      return null;
    }
    return this.groups.find(group => group.uuid === uuid) || null;
  }

  // swipe logic
  swipeStartX = 0;

  onTouchStart(ev: TouchEvent, el: HTMLElement) {
    this.swipeStartX = ev.touches[0].clientX;
  }

  onTouchEnd(ev: TouchEvent, el: HTMLElement) {
    const deltaX = ev.changedTouches[0].clientX - this.swipeStartX;
    if (deltaX < -40) {
      el.classList.add('delete-active');
    } else if (deltaX > 40) {
      el.classList.remove('delete-active');
    }
  }
}
