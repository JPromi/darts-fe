import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupLightResponse } from '../dtos/groupLightResponse';
import { environment } from '../../environments/environment';
import { GroupResponse } from '../dtos/groupResponse';
import { PageResponse } from '../dtos/pageeResponse';

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

  public serachGroup(q: string, isMember: boolean | null = null, isPublic: boolean | null = null, page: number = 0, size: number = 36): Observable<PageResponse<GroupLightResponse>> {
    const params: any = {
      q: q,
      page: page,
      size: size
    };
    if (isMember != null) params.isMember = isMember;
    if (isPublic !== null) params.isPublic = isPublic;

    return this.http.get<PageResponse<GroupLightResponse>>(`${environment.baseUrl}/group/search`, { withCredentials: true, params });
  }
}
