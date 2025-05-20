import { Component, OnInit } from '@angular/core';
import { GroupLightResponse } from '../../../dtos/groupLightResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { GroupService } from '../../../services/group.service';
import { PageResponse } from '../../../dtos/PageResponse';

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

  private lastKeyPress: Date = new Date();
  private lastUpdateIntervall: number = .5; // seconds
  private lastUpdateTimeout: any = null;

  ngOnInit(): void {
    this._searchGroup();
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

  public searchGroup() {
    if (!this.lastUpdateTimeout) {
      this.lastUpdateTimeout = setTimeout(() => {
        if (this.lastKeyPress.getTime() + this.lastUpdateIntervall * 1000 < new Date().getTime()) {
          this._searchGroup();
        }
        this.lastUpdateTimeout = null;
      }, this.lastUpdateIntervall * 1000);
    }
  }

  private _searchGroup() {
    this.groupService.serachGroup(this.searchQuery, this.searchQuery == "" ? true : null).subscribe(
      (response: PageResponse<GroupLightResponse>) => {
        this.groups = response.content;
      }
    );
  }
}
