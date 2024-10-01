import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const rolesGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  const user: any = _AuthService.currentUser.getValue();
  if (user.role !== 'manager') {
    _Router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
