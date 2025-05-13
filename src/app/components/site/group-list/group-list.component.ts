import { Component, OnInit } from '@angular/core';
import { GroupLightResponse } from '../../../dtos/groupLightResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group-list',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss'
})
export class GroupListComponent implements OnInit {

  constructor() { }

  fa = fa;

  public groups: GroupLightResponse[] = [];

  ngOnInit(): void {
    // tmp
    this.groups = [
      {
        uuid: '1',
        avatar: 'https://placehold.co/128',
        name: 'Group 1',
        description: 'Description 1',
        membersTotal: 10,
        isMember: true,
        isPublic: true,
        createdAt: new Date().toUTCString(),
      },
      {
        uuid: '2',
        avatar: 'https://placehold.co/128',
        name: 'Group 2',
        description: 'Description 2',
        membersTotal: 20,
        isMember: false,
        isPublic: false,
        createdAt: new Date().toUTCString(),
      }
    ];
  }
}
