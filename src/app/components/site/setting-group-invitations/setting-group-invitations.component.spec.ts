import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingGroupInvitationsComponent } from './setting-group-invitations.component';

describe('SettingGroupInvitationsComponent', () => {
  let component: SettingGroupInvitationsComponent;
  let fixture: ComponentFixture<SettingGroupInvitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingGroupInvitationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingGroupInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
