import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingGroupDangerZoneComponent } from './setting-group-danger-zone.component';

describe('SettingGroupDangerZoneComponent', () => {
  let component: SettingGroupDangerZoneComponent;
  let fixture: ComponentFixture<SettingGroupDangerZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingGroupDangerZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingGroupDangerZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
