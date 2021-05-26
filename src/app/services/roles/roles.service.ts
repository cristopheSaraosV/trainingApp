import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Injectable } from "@angular/core";
import {Roles} from "../../models/roles";

@Injectable({
	providedIn: "root",
})
export class RolesService {
	public role: Roles = new Roles();

	constructor(private http: HttpClient) {}

	getRolesAll(): Observable<Roles[]> {
		var local: string, production: string;
		local = "/api/roles";
		production = "https://api-res-training-app.herokuapp.com/api/roles";
		return this.http.get<Roles[]>(production);
	}
}
