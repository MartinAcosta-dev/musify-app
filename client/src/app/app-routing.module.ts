import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserEditComponent } from './components/user-edit/user-edit.component';
import { User } from './models/user.model';

import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {path:'', component: UserEditComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: 'albums', component: TestComponent },
  {path: '**', component: UserEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
