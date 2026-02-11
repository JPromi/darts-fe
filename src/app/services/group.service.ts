import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupLightResponse } from '../dtos/groupLightResponse';
import { environment } from '../../environments/environment';
import { GroupResponse } from '../dtos/groupResponse';
import { PageResponse } from '../dtos/pageResponse';
import { GroupEditRequest } from '../dtos/groupEditRequest';
import { GroupInvitationResponse } from '../dtos/groupInvitationResponse';
import { InvitationStatusAccountEnum } from '../enums/invitationStatusAccountEnum';

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

  public searchGroup(q: string, isMember: boolean | null = null, isPublic: boolean | null = null, page: number = 0, size: number = 36): Observable<PageResponse<GroupLightResponse>> {
    const params: any = {
      q: q,
      page: page,
      size: size
    };
    if (isMember != null) params.isMember = isMember;
    if (isPublic !== null) params.isPublic = isPublic;

    return this.http.get<PageResponse<GroupLightResponse>>(`${environment.baseUrl}/group/search`, { withCredentials: true, params });
  }

  // invitation
  public getInvitationList(): Observable<GroupInvitationResponse[]> {
    return this.http.get<GroupInvitationResponse[]>(`${environment.baseUrl}/group/invitation`, { withCredentials: true });
  }

  public countInvitationList(): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}/group/invitation/count`, { withCredentials: true });
  }

  public sendInvitationResponse(invitationUuid: string, response: InvitationStatusAccountEnum): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/group/invitation/${invitationUuid}`, JSON.stringify(response), { withCredentials: true, headers: { 'Content-Type': 'application/json' } });
  }

  // edit
  public createGroup(data: GroupEditRequest): Observable<GroupResponse> {
    return this.http.post<GroupResponse>(`${environment.baseUrl}/group`, data, { withCredentials: true });
  }
}
