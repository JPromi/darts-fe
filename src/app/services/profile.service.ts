import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProfileResponse } from '../dtos/profileResponse';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
  ) { }

  public getProfile(username: string): Observable<ProfileResponse> {
      return this.http.get<ProfileResponse>(`${environment.baseUrl}/profile/${username}`, { withCredentials: true });
    }
}
