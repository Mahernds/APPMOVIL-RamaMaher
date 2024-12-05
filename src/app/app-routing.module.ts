import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
=======
import { AuthGuard } from './auth/auth.guard';
>>>>>>> 03623c9 (Primer commit)

const routes: Routes = [
  {
    path: 'home',
<<<<<<< HEAD
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
=======
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]

>>>>>>> 03623c9 (Primer commit)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
<<<<<<< HEAD
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./paginas/configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
  },
  {
    path: 'informacion-cuenta',
    loadChildren: () => import('./paginas/informacion-cuenta/informacion-cuenta.module').then(m => m.InformacionCuentaPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./paginas/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./paginas/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./paginas/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'informacion-cuenta',
    loadChildren: () => import('./paginas/informacion-cuenta/informacion-cuenta.module').then( m => m.InformacionCuentaPageModule)
  },
  
=======
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule),

  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./paginas/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule),
    canActivate:[AuthGuard]

  },
  {
    path: 'cuenta',
    loadChildren: () => import('./paginas/cuenta/cuenta.module').then( m => m.CuentaPageModule),
    canActivate:[AuthGuard]

  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule),

  },
  {
    path: 'crear-alarma',
    loadChildren: () => import('./paginas/crear-alarma/crear-alarma.module').then( m => m.CrearAlarmaPageModule),
    canActivate:[AuthGuard]

  },
  {
    path: 'restablecer-contrasena',
    loadChildren: () => import('./paginas/restablecer-contrasena/restablecer-contrasena.module').then( m => m.RestablecerContrasenaPageModule)
  },




>>>>>>> 03623c9 (Primer commit)
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
