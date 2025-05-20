import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupLightResponse } from '../dtos/groupLightResponse';
import { environment } from '../../environments/environment';
import { GroupResponse } from '../dtos/groupResponse';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient
  ) { }

  public getGroupList(): Observable<GroupLightResponse[]> {
    return this.http.get<GroupLightResponse[]>(`${environment.baseUrl}/group`, { withCredentials: true });
  }

  public getGroup(uuid: string): Observable<GroupResponse> {
    return this.http.get<GroupResponse>(`${environment.baseUrl}/group/${uuid}`, { withCredentials: true });
  }
}
