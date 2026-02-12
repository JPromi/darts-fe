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
import { GroupAdminMember } from '../dtos/groupAdminMember';
import { GroupMemberAdminRequest } from '../dtos/groupMemberAdminRequest';

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
    return this.http.put<void>(`${environment.baseUrl}/group/invitation/${invitationUuid}`, JSON.stringify(response), { withCredentials: true });
  }

  // edit
  public createGroup(data: GroupEditRequest): Observable<GroupResponse> {
    return this.http.post<GroupResponse>(`${environment.baseUrl}/group`, data, { withCredentials: true });
  }

  public getAdminGroupMembers(groupUuid: string): Observable<GroupAdminMember[]> {
    return this.http.get<GroupAdminMember[]>(`${environment.baseUrl}/group/${groupUuid}/members`, { withCredentials: true });
  }

  public inviteMember(groupUuid: string, memberUuid: string): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/group/${groupUuid}/invite`, JSON.stringify(memberUuid), { withCredentials: true, headers: { 'Content-Type': 'application/json' } });
  }

  public saveMemberChanges(groupUuid: string, memberUuid: string, request: GroupMemberAdminRequest): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/group/${groupUuid}/members/${memberUuid}`, request, { withCredentials: true });
  }

  public removeMemberFromGroup(groupUuid: string, memberUuid: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/group/${groupUuid}/members/${memberUuid}`, { withCredentials: true });
  }

  public removeInvitationFromGroup(groupUuid: string, memberUuid: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/group/${groupUuid}/invite/${memberUuid}`, { withCredentials: true });
  }
}
