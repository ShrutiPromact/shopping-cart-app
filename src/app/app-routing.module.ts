import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
    {
        path: "",
        redirectTo: "/user",
        pathMatch: "full"
    },
    { path: 'user', component: UserComponent },
    { path: 'cart', component: CartComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
