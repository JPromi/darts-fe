import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting-group-router',
  imports: [
    RouterOutlet,
    RouterModule,
    TranslateModule,
    FontAwesomeModule,
    CommonModule
  ],
  templateUrl: './setting-group-router.component.html',
  styleUrl: './setting-group-router.component.scss'
})
export class SettingGroupRouterComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  fa = fa;

  uuid: string = "";

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        const uuid = params['uuid'];
        if (uuid) {
          this.uuid = uuid;
        } else {
          this.router.navigate(['/']);
        }
      }
    );
  }
}
