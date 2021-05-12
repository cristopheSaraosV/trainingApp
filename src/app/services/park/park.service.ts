import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Park } from "../../models/park";

@Injectable({
	providedIn: "root",
})
export class ParkService {
	public park: Park = new Park();
	constructor(private http: HttpClient) {}

	getParkAll() : Observable<Park[]> {
		var local:string,production:string;    
		local = "/api/parks"
		production = "https://api-res-training-app.herokuapp.com/api/parks"
		return this.http.get<Park[]>(production);
	}
}
