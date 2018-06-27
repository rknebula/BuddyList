import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    user: object;

    constructor( private _mainService: MainService, private _router: Router ) {
        this.user = {  };
    }

    edit_about() {
        this._mainService.edit_about(this.user, (res)=>{
            console.log("comp: edit / edit_about:");
            this._router.navigate(['/']);
        })
    }

    logged_in() {
        this._mainService.logged_in((res)=>{
            if(res.user != null) {
                console.log("comp: edit / logged_in (true):", res.user);
                this.user = res.user;
                console.log("comp: edit / logged_in (this.user):", this.user);
            } else {
                console.log("comp: edit / logged_in (false):", res.user);
                this._router.navigate(['/login']);
            }
        });
    }

    ngOnInit() {
        this.logged_in();
    }

}
