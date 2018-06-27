import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: object;

    constructor( private _mainService: MainService, private _router: Router ) {
        this.user = { username: "" };
    }

    logging_in() {
        this._mainService.logging_in(this.user, (res)=> {
            console.log("comp: login / logging_in:", res.user);
            this._router.navigate(['/']);
        });
    }

    logged_in() {
        this._mainService.logged_in((res)=>{
            if(res.user) {
                console.log("comp: login / logged_in (true):", res.user);
                this._router.navigate(['/']);
            } else {
                console.log("comp: login / logged_in (false):", res.user);
                this.user = { username: "" };
            }
        });
    }

    ngOnInit() {
        this.logged_in();
    }

}
