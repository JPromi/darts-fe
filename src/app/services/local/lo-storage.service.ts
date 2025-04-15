import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionAccountResponse } from '../../dtos/sessionAccountResponse';

@Injectable({
  providedIn: 'root'
})
export class LoStorageService {

  constructor() { }

  private sessionAccount = new BehaviorSubject<SessionAccountResponse | null>(null);
  public sessionAccount$ = this.sessionAccount.asObservable();

  public setSessionAccount(account: SessionAccountResponse | null): void {
    this.sessionAccount.next(account);
  }
}
