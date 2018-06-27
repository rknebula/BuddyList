import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: object;
    profile: object;
    id: number;
    compare: Array<any>;

    constructor( private _mainService: MainService, private _router: Router, private _activatedroute: ActivatedRoute) {
        this.user = { username: "", mutuals: [{}], pendings: [{}] };
        this.profile = { username: "", mutuals: [{}], pendings: [{}] };
        this.id = 0;
        this.compare = [];
    }

    get_user() {
        console.log("comp: profile / get_user (this.id):", this.id);
        this._mainService.get_user(this.id, (res)=> {
            console.log("comp: profile / get_user (res.user):", res.user);
            console.log("comp: profile / get_user (res.idx):", res.idx);
            this.profile = res.user;
            this.compare = res.idx;
            console.log("comp: profile / get_user (this.profile):", this.profile);
        })
    }

    pending_friend() {
        console.log("comp: profile / pending_friend (this.id):", this.id);
        this._mainService.pending_friend(this.id, (res)=> {
            this.profile['pendings'].push(this.user);
            this.compare[0] = 0;
            console.log("comp: profile / pending_friend (this.profile.pendings):", this.profile['pendings']);
        })
    }

    logged_in() {
        this._mainService.logged_in((res)=>{
            if(res.user != null) {
                console.log("comp: profile / logged_in (true):", res.user);
                this.user = res.user;
                this.id = this._activatedroute.snapshot.params['id'];
                console.log("comp: profile / logged_in (this.id):", this.id);
                this.get_user();
            } else {
                console.log("comp: profile / logged_in (false):", res.user);
                this._router.navigate(['/login']);
            }
        });
    }

    ngOnInit() {
        this.logged_in();
    }

}
