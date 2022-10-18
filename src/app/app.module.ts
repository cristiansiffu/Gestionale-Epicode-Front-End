import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { CustomersComponent } from './components/customers/customers.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { RegisterCustomersComponent } from './components/customers/register-customers/register-customers.component';
import { InvoicesCustomersComponent } from './components/customers/invoices-customers/invoices-customers.component';
import { InvoicesDetailsComponent } from './components/invoices/invoices-details/invoices-details.component';
import { ManageCustomersComponent } from './components/customers/manage-customers/manage-customers.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register-customers',
    component: RegisterCustomersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id',
    component: InvoicesCustomersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/manage-customers/:id',
    component: ManageCustomersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'invoices/:id',
    component: InvoicesDetailsComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    UsersComponent,
    CustomersComponent,
    InvoicesComponent,
    RegisterCustomersComponent,
    InvoicesCustomersComponent,
    InvoicesDetailsComponent,
    ManageCustomersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    AuthRoutingModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
