import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const token = localStorage.getItem('access_token');
  const idRol = Number(localStorage.getItem('id_rol'));

  const rolesPermitidos = route.data?.['roles'] as number[];

  if (!token || !idRol) {
    router.navigate(['/login']);
    return false;
  }

  if (!rolesPermitidos.includes(idRol)) {
    if (idRol === 2) {
      router.navigate(['/dashboard-admin']);
    } else if (idRol === 3) {
      router.navigate(['/dashboard-worker']);
    } else {
      router.navigate(['/dashboard-owner']);
    }

    return false;
  }

  return true;
};