import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class ProfileService {
  //#region Properties
  public currentArticles = new BehaviorSubject<any | null>(null);
  //#end region

  //#region Constructor
  public constructor() { }

  //#end region

  //#region Methods

  //#end region
}
