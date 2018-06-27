import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {path:"", component: MainComponent},
    {path:"login", component: LoginComponent},
    {path:"edit", component: EditComponent},
    {path:"users", component: UsersComponent},
    {path:"user/:id", component: ProfileComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
