import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    user: object;
    userList: Array<any>;

    constructor( private _mainService: MainService, private _router: Router ) {
        this.user = { };
        this.userList = [ ];
    }

    get_users() {
        console.log("comp: users / get_users (this.userList):", this.userList);
        this._mainService.get_users((res)=>{
            console.log("comp: users / get_users:", res.users);
            this.userList = res.users;
        })
    }

    logged_in() {
        this._mainService.logged_in((res)=>{
            if(res.user != null) {
                console.log("comp: users / logged_in (true):");
                this.user = res.user;
                console.log("comp: users / logged_in (this.user):", this.user);
            } else {
                console.log("comp: users / logged_in (false):", res.user);
                this._router.navigate(['/login']);
            }
        });
    }

    ngOnInit() {
        this.logged_in();
        this.get_users();
    }

}
