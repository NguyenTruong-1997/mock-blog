import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';

export interface CanComponentDeactivate {
  canDeativate(): boolean | Promise<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class CandeactiveService implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(
    component: CanComponentDeactivate,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
    return component.canDeativate();
  }
}
