import { Component, OnInit } from '@angular/core';
import { GroupLightResponse } from '../../../dtos/groupLightResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { GroupService } from '../../../services/group.service';

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

  constructor(
    private groupService: GroupService
  ) { }

  fa = fa;

  public groups: GroupLightResponse[] = [];
  public searchQuery: string = '';

  ngOnInit(): void {
    this.getGroups();
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

  private getGroups(): void {
    this.groupService.getGroupList().subscribe(
      (response: GroupLightResponse[]) => {
        this.groups = response;
      }
    );
  }
}
