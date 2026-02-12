import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { GroupService } from '../../../services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupSettingsGeneral } from '../../../entities/groupSettingsGeneral';
import { FileService } from '../../../services/file.service';
import { PopupComponent } from '../../assets/popup/popup.component';

@Component({
  selector: 'app-setting-group-general',
  imports: [
    TranslateModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PopupComponent
  ],
  templateUrl: './setting-group-general.component.html',
  styleUrl: './setting-group-general.component.scss'
})
export class SettingGroupGeneralComponent implements OnInit {

  constructor(
    private groupService: GroupService,
    private fileService: FileService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  fa = fa;

  public isUpdating = false;
  public showDeletePopup = false;

  public group: GroupSettingsGeneral | null = null;

  form: FormGroup = new FormGroup(
    {
      name: new FormControl<string>("",  [Validators.required]),
      description: new FormControl<string>(""),
      isPublic: new FormControl<boolean>(false),
    }
  );

  ngOnInit(): void {
    this.activeRoute.parent?.params.subscribe(
      (params) => {
        const groupUuid = params['uuid'];
        if (groupUuid) {
          this._loadGroup(groupUuid);
        }
      }
    );
  }

  submit() {
    if (this.form.valid && this.group) {
      this.isUpdating = true;
      this.group.name = this.form.value.name;
      this.group.description = this.form.value.description;
      this.group.isPublic = this.form.value.isPublic;
      
      this.groupService.saveGeneralGroupSettings(this.group).subscribe({
        next: (response) => {
          this.isUpdating = false;
          this.group = response;
          
          this.form.patchValue({
            name: response.name,
            description: response.description,
            isPublic: response.isPublic
          });
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  delete(confirmed: boolean) {
    if (confirmed && this.group) {
      this.isUpdating = true;
      this.groupService.deleteGroup(this.group.uuid).subscribe({
        next: () => {
          this.router.navigate(['/groups']);
        },
        error: (error) => {
          console.error("Error deleting group", error);
          this.isUpdating = false;
        }
      });
    }
  }

  updateAvatar(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if(file) {
      this.fileService.uploadImage(file, 512).subscribe(
        (response) => {
          if(this.group) {
            this.group.avatar = response;
          }
        },
        (error) => {
          console.error("Error uploading file", error);
        }
      );
    }
  }

  removeAvatar() {
    if(this.group) {
      this.group.avatar = null;
    }
    this.form.patchValue({
      avatar: null
    });
  }

  updateBanner(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if(file) {
      this.fileService.uploadImage(file).subscribe(
        (response) => {
          if(this.group) {
            this.group.banner = response;
          }
        },
        (error) => {
          console.error("Error uploading file", error);
        }
      );
    }
  }

  removeBanner() {
    if(this.group) {
      this.group.banner = null;
    }
    this.form.patchValue({
      banner: null
    });
  }

  getFirstErrorKey(controlName: string | null | undefined): string | null {
    if(controlName) {
      const errors = this.form.get(controlName)?.errors;
      return errors ? Object.keys(errors)[0] : null;
    } else {
      return null;
    }
  }

  private _loadGroup(groupUuid: string): void {
    this.groupService.getGeneralGroupSettings(groupUuid).subscribe({
      next: (group) => {
        this.group = group;

        this.form.patchValue({
          name: group.name,
          description: group.description,
          isPublic: group.isPublic
        });
      }
    });
  }


}
