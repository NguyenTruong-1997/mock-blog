import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';

export interface CanComponentDeactivate {
  canDeativate(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CandeactiveService implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(
    component: CanComponentDeactivate,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // if(!component.canDeativate()) {
    //   if (confirm('You have unsaved changes! If you leave, your changes will be lost.')) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }

    // return true;
    return component.canDeativate();
  }
}
