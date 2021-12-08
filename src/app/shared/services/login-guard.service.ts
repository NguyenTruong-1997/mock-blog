import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BlogService } from './blog.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(public blogService: BlogService, public router: Router) {}

  canActivate(): boolean {
    if (this.blogService.isLogin()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
