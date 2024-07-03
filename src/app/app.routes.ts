import { Routes } from '@angular/router';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';

export const routes: Routes = [
    { path: 'register-ransomware', loadComponent: () => import('./components/register-customer/register-customer.component').then((m) => m.RegisterCustomerComponent) },
    { path: 'manage-ransomware', loadComponent: () => import('./components/manage-customers/manage-customers.component').then((m) => m.ManageCustomersComponent) },
    { path: 'register-ransomware/:id', component: RegisterCustomerComponent },
    { path: '**', redirectTo: '' }
  ];
