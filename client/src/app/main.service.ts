import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Http } from "@angular/http";

@Injectable()
export class MainService {

    constructor(private _http: Http, private _router: Router) { }

    get_user(id, cb) {
        console.log("service: main / get_user (id):", id);
        this._http.post("/get_user", {id: id}).subscribe((res)=> {
            console.log("service: main / get_user:", res);
            cb(res.json());
        })
    }

    get_users(cb) {
        console.log("service: main / get_users");
        this._http.get("/get_users").subscribe((res)=> {
            console.log("service: main / get_users (users):", res.json());
            cb(res.json());
        })
    }

    pending_friend(id, cb) {
        console.log("service: main / pending_friend (id):", id);
        this._http.post("/pending_friend", {id: id}).subscribe((res)=> {
            console.log("service: main / pending_friend:", res);
            cb(res.json());
        })
    }

    add_friend(id, cb) {
        console.log("service: main / add_friend (id):", id);
        this._http.post("/add_friend", {id: id}).subscribe((res)=> {
            console.log("service: main / add_friend:", res.json());
            cb(res.json());
        })
    }

    edit_about(user, cb) {
        console.log("service: main / edit_about (user):", user);
        this._http.post("/edit_about", user).subscribe((res)=> {
            console.log("service: main / edit_about:", res);
            this._router.navigate(['/']);
        })
    }

    logging_in(user, cb) {
        this._http.post("/logging_in", user).subscribe((res)=>{
            console.log("service: main / logging_in:", res);
            cb(res.json());
        });
    }

    logged_in(cb) {
        this._http.get("/logged_in").subscribe((res)=> {
            console.log("service: main / logged_in:", res);
            cb(res.json());
        })
    }
}
