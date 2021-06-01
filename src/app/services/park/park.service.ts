import { HttpClient,HttpHeaders } from "@angular/common/http";
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
	savePark(ParkIn:Park, token:string): Observable<Park> {
    
		var local:string,production:string;    
		
		let headers = new HttpHeaders();    
		headers = headers.set('x-token',token );
		
		local = "/api/parks"
		production = "https://api-res-training-app.herokuapp.com/api/parks"
		return this.http.post<Park>(production,ParkIn,{headers});
	}

	updatePark(parkIn:Park,id:string, token:string): Observable<Park> {

		var local:string,production:string;    
	
		let headers = new HttpHeaders();
		headers = headers.set('x-token',token );
	
		local = `/api/exercises/${id}`
		production = `https://api-res-training-app.herokuapp.com/api/parks/${id}`
	
		return this.http.put<Park>(production,parkIn,{headers});
	}
	deletePark(id:string, token:string): Observable<Park> {

		var local:string,production:string;    
	
		let headers = new HttpHeaders();
		headers = headers.set('x-token',token );
	
		local = `/api/exercises/${id}`
		production = `https://api-res-training-app.herokuapp.com/api/parks/${id}`
	
		return this.http.delete<Park>(production,{headers});
	}
}
