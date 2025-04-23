import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SettingProfile } from '../entities/settingProfile';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient,
  ) { }

  getProfileSettings(): Observable<SettingProfile> {
    return this.http.get<SettingProfile>(`${environment.baseUrl}/setting/profile`, { withCredentials: true });
  }

  updateProfileSettings(settings: SettingProfile): Observable<SettingProfile> {
    return this.http.put<SettingProfile>(`${environment.baseUrl}/setting/profile`, settings, { withCredentials: true });
  }
}
