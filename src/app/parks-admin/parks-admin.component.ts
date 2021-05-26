import { Component, OnInit } from '@angular/core';
import { Park } from '../models/park';
import { ParkService } from '../services/park/park.service'
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from '../services/auth/auth.service';


interface parkResponseI {
  status:boolean,
  msg:String
}

@Component({
  selector: 'app-parks-admin',
  templateUrl: './parks-admin.component.html',
  styleUrls: ['./parks-admin.component.css']
})
export class ParksAdminComponent implements OnInit {

  isNew:Boolean = true;

  parkResponse:parkResponseI = {
    status:false,
    msg:""
  };

  classError = ''
  parksList: Array<Park> = new Array<Park>();

  constructor(private ParksApi: ParkService,  public authService: AuthService) { }

  selectedPark:Park = {
    name:"",
    city:"",
    region:"",
    urlDirection:"",
    id:"",
    weather:"",
    temp:""        
  };
  parkFormGroup = new FormGroup({
    name        :  new FormControl(""),
    city        :  new FormControl(""),
    region      :  new FormControl(""),
    map         :  new FormControl(""),
    urlDirection:  new FormControl("")

	});

  ngOnInit(): void {
    this.ParksApi.getParkAll().subscribe((parksListApi)=>{
      this.parksList = parksListApi;
    })
  }

  onSubmitNew(){
    const ParkIn = {
      name: this.parkFormGroup.controls["name"].value,
      city : this.parkFormGroup.controls["city"].value,
      region : this.parkFormGroup.controls["region"].value,
      map : this.parkFormGroup.controls["map"].value,
      urlDirection : this.parkFormGroup.controls["urlDirection"].value,
      weather : '',
      temp : '',
      id : ''
    }

    const token = this.authService.getToken();

    this.ParksApi.savePark(ParkIn,token).subscribe((parkRes:any)=>{

        this.parkResponse.status = true;
        this.parkResponse.msg = "Saved correctly";
        this.clearForm()
      },(errorCather:any) => {
        errorCather.error.errors.map((item:any) => {
          this.parkResponse.msg += item.msg + ' || ';
          this.classError = 'alert alert-danger'

          this.parkResponse.status = false;
          setTimeout(() =>{
            this.parkResponse.status = false;
            this.parkResponse.msg = '';
            this.classError = '';
    
          },5000 )
      })
    })
    
  }


  onSubmitEdit(){
    const ParkIn = {
      name: this.parkFormGroup.controls["name"].value,
      city : this.parkFormGroup.controls["city"].value,
      region : this.parkFormGroup.controls["region"].value,
      map : this.parkFormGroup.controls["map"].value,
      urlDirection : this.parkFormGroup.controls["urlDirection"].value,
      weather : '',
      temp : '',
      id : this.selectedPark.id
    }
    const token = this.authService.getToken();

    this.ParksApi.updatePark(ParkIn,this.selectedPark.id,token).subscribe((exerciseRes:any)=>{
      this.parkResponse.status = true;
      this.parkResponse.msg = "Saved correctly";

      setTimeout(() =>{
        this.parkResponse.status = false;
        this.parkResponse.msg = '';
        this.classError = '';

      },3000 )
      
    },(errorCather)=> {
      errorCather.error.errors.map((item:any) => {
        this.parkResponse.msg += item.msg + ' || ';
        this.classError = 'alert alert-danger';
        this.parkResponse.status = false;
        setTimeout(() =>{
          this.parkResponse.status = false;
          this.parkResponse.msg = '';
          this.classError = '';
  
        },5000 )
      })
    })
  }

  editPark(ParkIn:any){
   
    this.isNew= false;   
    this.selectedPark.name =ParkIn.name;
    this.selectedPark.city =ParkIn.city;
    this.selectedPark.region =ParkIn.region;
    this.selectedPark.urlDirection =ParkIn.urlDirection;
    this.selectedPark.id =ParkIn._id;


  }
  newExercise(){
    
    this.clearForm();
    this.isNew= true;  
  }
  
  clearForm(){
    this.parkFormGroup.controls["name"].setValue('');
    this.parkFormGroup.controls["city"].setValue('');
    this.parkFormGroup.controls["region"].setValue('');
    this.parkFormGroup.controls["map"].setValue('');
    this.parkFormGroup.controls["urlDirection"].setValue('');
  }

}
