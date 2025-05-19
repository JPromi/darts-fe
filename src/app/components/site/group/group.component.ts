import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GroupResponse } from '../../../dtos/groupResponse';

@Component({
  selector: 'app-group',
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent implements OnInit {

  constructor(

  ) { }

  public membersPreviewMax: number = 5;
  public isLargeMembersPreview: Boolean = false;

  public group?: GroupResponse;

  ngOnInit(): void {
      this.group = {
        uuid: '3',
        avatar: 'https://picsum.photos/200',
        banner: "https://wallpapers.com/images/hd/retro-game-background-9mlhgnzp2db7mccd.jpg",
        name: 'VAMED IT Market',
        description: 'Description',
        members: [
          {
            uuid: '1',
            username: 'test',
            avatar: 'https://picsum.photos/64',
            visibility: 'public',
          },
          {
            uuid: '2',
            username: 'test',
            avatar: 'https://picsum.photos/65',
            visibility: 'public',
          },
          {
            uuid: '3',
            username: 'test',
            avatar: 'https://picsum.photos/66',
            visibility: 'public',
          },
          {
            uuid: '4',
            username: 'test',
            avatar: 'https://picsum.photos/67',
            visibility: 'public',
          },
          {
            uuid: '5',
            username: 'test',
            avatar: 'https://picsum.photos/67',
            visibility: 'public',
          },
          {
            uuid: '6',
            username: 'test',
            avatar: 'https://picsum.photos/67',
            visibility: 'public',
          },
          {
            uuid: '7',
            username: 'test',
            avatar: 'https://picsum.photos/67',
            visibility: 'public',
          },
          {
            uuid: '8',
            username: 'test',
            avatar: 'https://picsum.photos/67',
            visibility: 'public',
          },
          {
            uuid: '9',
            username: 'test',
            avatar: 'https://picsum.photos/67',
            visibility: 'public',
          },

        ],
        isMember: true,
        isPublic: false,
        createdAt: new Date().toUTCString(),
      }
  }

}
