import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GroupResponse } from '../../../dtos/groupResponse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-group',
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
  animations: [
    // width animation
    trigger('profileExpand', [
      state('none', style({ width: '0', display: 'none' })),
      state('small', style({ width: '2.5rem' })),
      state('small-outside', style({ width: '1.5rem' })),
      state('large-outside', style({ width: '*' })),
      state('large', style({ width: '*' })),
      transition('small <=> large', [
        animate('500ms ease-in-out')
      ]),
      transition('none <=> large', [
        animate('500ms ease-in-out')
      ]),
      transition('small-outside <=> large-outside', [
        animate('500ms ease-in-out')
      ]),
      transition('none <=> large-outside', [
        animate('500ms ease-in-out')
      ]),
    ]),
  ]
})
export class GroupComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public membersPreviewMax: number = 5;
  public isLargeMembersPreview: Boolean = false;
  public activeSubMenu: string = '';
  public fa = fa;

  public group?: GroupResponse;

  ngOnInit(): void {
      this.group = {
        uuid: '3',
        avatar: 'https://picsum.photos/200',
        banner: "https://cdn.pixabay.com/photo/2025/05/04/11/13/california-9577976_1280.jpg",
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
            username: 'testWithAVeryLongName',
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
    
    this.activatedRoute.url.subscribe(
      (url) => {
        this.activeSubMenu = url[2]?.path ?? '';
      }
    )
  }

}
