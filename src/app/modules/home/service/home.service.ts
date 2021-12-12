import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HomeService {

  public constructor(
  ) {}

  tag$ = new BehaviorSubject<{}>({type : 'all', filters: ''});
  tag = this.tag$.asObservable();

  setTag(value: any) {
    this.tag$.next(value);
  }


}
