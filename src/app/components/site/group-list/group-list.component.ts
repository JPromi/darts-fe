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
  public searchQuery: string = '';

  ngOnInit(): void {
    // tmp
    this.groups = [
      {
        uuid: '1',
        avatar: 'https://placehold.co/128',
        banner: "https://static.vecteezy.com/system/resources/thumbnails/002/058/317/small_2x/retro-futuristic-80s-background-free-vector.jpg",
        name: 'Group 1',
        description: 'Description 1',
        membersTotal: 1000,
        isMember: true,
        isPublic: true,
        createdAt: new Date().toUTCString(),
      },
      {
        uuid: '2',
        avatar: 'https://picsum.photos/201',
        banner: "https://static.vecteezy.com/system/resources/thumbnails/002/058/317/small_2x/retro-futuristic-80s-background-free-vector.jpg",
        name: 'Group 2',
        description: 'Description 2',
        membersTotal: 20000000,
        isMember: false,
        isPublic: false,
        createdAt: new Date().toUTCString(),
      },
      {
        uuid: '3',
        avatar: 'https://picsum.photos/200',
        banner: "https://static.vecteezy.com/system/resources/thumbnails/002/058/317/small_2x/retro-futuristic-80s-background-free-vector.jpg",
        name: 'VAMED IT Market',
        description: 'Description',
        membersTotal: 5,
        isMember: true,
        isPublic: false,
        createdAt: new Date().toUTCString(),
      }
    ];
  }

  public getMemberCount(total: number): string {
    if (total < 1000) {
      return total.toString();
    } else if (total < 1000000) {
      return Math.floor(total / 1000) + 'k';
    } else if (total < 1000000000) {
      return Math.floor(total / 1000000) + 'M';
    } else {
      return '+ 100M';
    }
  }
}
