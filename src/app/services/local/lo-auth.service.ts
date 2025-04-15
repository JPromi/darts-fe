import { Injectable } from '@angular/core';
import { SessionAccountResponse } from '../../dtos/sessionAccountResponse';
import { PastUser } from '../../entities/pastUser';

@Injectable({
  providedIn: 'root'
})
export class LoAuthService {

  constructor() { }

  public setRememberMe(session: SessionAccountResponse) {
    const user = new PastUser(
      session.uuid,
      session.username,
      session.avatar ? session.avatar : undefined,
    );
    const lastUsers = this.getLastUsers();
    const existingUser = lastUsers.find(user => user.uuid === session.uuid);
    if (!existingUser) {
      lastUsers.push(user);
    }
    if (lastUsers.length > 5) {
      lastUsers.shift();
    }
    localStorage.setItem('b2h.darts.lastUsers', JSON.stringify(lastUsers));
  }

  public getLastUsers() {
    const _lastUsers = localStorage.getItem('b2h.darts.lastUsers');
    var lastUsers: PastUser[] = [];
    if(_lastUsers) {
      lastUsers = JSON.parse(_lastUsers);
    }
    return lastUsers;
  }

  public isRememberMeTmp(): boolean {
    const remmember = localStorage.getItem('b2h.darts.tmp.rememberMe');
    if(remmember) {
      return remmember === 'true';
    } else {
      return false;
    }
  }

  public setRememberMeTmp(status: boolean) {
    if(status) {
      localStorage.setItem('b2h.darts.tmp.rememberMe', status.toString());
    } else {
      localStorage.removeItem('b2h.darts.tmp.rememberMe');
    }
  }
}
