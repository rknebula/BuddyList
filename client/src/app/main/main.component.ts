import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    user: object;

    constructor( private _mainService: MainService, private _router: Router ) {
        this.user = { username: "", mutuals: [{}], pendings: [{}] };
    }

    add_friend(id) {
        let idx = this.user['pendings'].findIndex(user=>user._id==id);
        this.user['pendings'].splice(idx, 1);
        console.log("comp: main / add_friend (this.user):", this.user);
        this._mainService.add_friend(id, (res)=>{
            console.log("comp: main / add_friend:", res.friend);
            this.user['mutuals'].push(res.friend);
            console.log("comp: main / add_friend (this.user):", this.user);
        })
    }

    logged_in() {
        this._mainService.logged_in((res)=>{
            if(res.user != null) {
                console.log("comp: main / logged_in (true):", res.user);
                this.user = res.user;
                console.log("comp: main / logged_in (this.user):", this.user);
            } else {
                console.log("comp: main / logged_in (false):", res.user);
                this._router.navigate(['/login']);
            }
        });
    }

    ngOnInit() {
        this.logged_in();
    }

}
