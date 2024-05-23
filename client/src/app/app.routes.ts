import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'login',loadComponent:()=> import('./page/login/login.component')},
    {path:'register',loadComponent:()=> import('./page/register/register.component')},
    {path:'home',loadComponent:()=> import('./page/home/home.component')},
    {path:'forget-password',loadComponent:()=> import('./page/forget-password/forget-password.component')},
    {path: 'reset/:token',loadComponent:()=> import('./page/reset/reset.component')}
];
