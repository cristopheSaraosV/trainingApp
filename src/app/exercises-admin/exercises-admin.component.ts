import { Component, OnInit } from "@angular/core";
import { Exercise } from "../models/exercise";
import { ExerciseService } from "../services/exercise/exercise.service";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../services/auth/auth.service";

interface ExerciseResponseI {
	status: boolean;
	msg: String;
}

@Component({
	selector: "app-exercises-admin",
	templateUrl: "./exercises-admin.component.html",
	styleUrls: ["./exercises-admin.component.css"],
})
export class ExercisesAdminComponent implements OnInit {
	classError = "";
	exercisesList: Array<Exercise> = new Array<Exercise>();
	isNew: Boolean = true;

	hiddenMsg: boolean = true;
	exerciseResponse: ExerciseResponseI = {
		status: false,
		msg: "",
	};

	selectedEexercise: Exercise = {
		name: "",
		description: "",
		urlImg: "",
		_id: "",
	};

	constructor(private ExerciseApi: ExerciseService, public authService: AuthService) {}

	exerciseFormGroup = new FormGroup({
		name: new FormControl(""),
		description: new FormControl(""),
		urlImg: new FormControl(""),
	});

	ngOnInit(): void {
		this.ExerciseApi.getExerciseAll().subscribe((exerciseListApi) => {
			this.exercisesList = exerciseListApi;
		});
	}

	onSubmitNew() {
		const exerciseIn = {
			name: this.exerciseFormGroup.controls["name"].value,
			description: this.exerciseFormGroup.controls["description"].value,
			urlImg: this.exerciseFormGroup.controls["urlImg"].value,
			_id: "",
		};

		const token = this.authService.getToken();

		this.ExerciseApi.saveExercise(exerciseIn, token).subscribe(
			(exerciseRes: any) => {
				if (exerciseRes.status) {
					this.hiddenMsg = false;
					this.exerciseResponse.msg = exerciseRes.msg;
					this.exerciseResponse.status = true;
				}
				setTimeout(() => {
					this.exerciseResponse.msg = "";
					this.classError = "";
					this.hiddenMsg = true;
				}, 5000);
			},
			(errorCather: any) => {

				if (errorCather.error.msg == "Access Token is required") {
          this.exerciseResponse.msg = errorCather.error.msg;
          this.classError = "alert alert-danger";
				} else {
					errorCather.error.errors.map((item: any) => {
						this.hiddenMsg = false;

						this.exerciseResponse.msg += item.msg + " || ";
						this.exerciseResponse.status = false;
						this.classError = "alert alert-danger";

					});
				}
        setTimeout(() => {
          this.exerciseResponse.msg = "";
          this.classError = "";
        }, 5000);
			}
		);
	}

	onSubmitEdit() {
		const exerciseIn = {
			name: this.exerciseFormGroup.controls["name"].value,
			description: this.exerciseFormGroup.controls["description"].value,
			urlImg: this.exerciseFormGroup.controls["urlImg"].value,
			_id: this.selectedEexercise._id,
		};
		const token = this.authService.getToken();

		this.ExerciseApi.updateExercise(
			exerciseIn,
			this.selectedEexercise._id,
			token
		).subscribe(
			(exerciseRes: any) => {
				if (exerciseRes.status) {
					this.exerciseResponse.msg = exerciseRes.msg;
					this.exerciseResponse.status = true;
					this.hiddenMsg = false;
				}

				setTimeout(() => {
					this.exerciseResponse.msg = "";
					this.classError = "";
					this.hiddenMsg = true;
				}, 3000);
			},
			(errorCather: any) => {
        if (errorCather.error.msg == "Access Token is required") {
          this.exerciseResponse.msg = errorCather.error.msg;
          this.classError = "alert alert-danger";
				} else {
					errorCather.error.errors.map((item: any) => {
						this.hiddenMsg = false;

						this.exerciseResponse.msg += item.msg + " || ";
						this.exerciseResponse.status = false;
						this.classError = "alert alert-danger";

					});
				}
        setTimeout(() => {
          this.exerciseResponse.msg = "";
          this.classError = "";
        }, 3000);
			}
		);
	}

	editExercise(exerciseIn: any, id: string) {
		this.isNew = false;
		this.selectedEexercise.name = exerciseIn.name;
		this.selectedEexercise.description = exerciseIn.description;
		this.selectedEexercise._id = exerciseIn._id;
		this.selectedEexercise.urlImg = exerciseIn.urlImg;
	}
	
	newExercise() {
		this.selectedEexercise.name = "";
		this.selectedEexercise.description = "";
		this.selectedEexercise._id = "";
		this.selectedEexercise.urlImg = "";
		
		this.isNew = true;
	}


	
	deleteExercise(exerciseIn: any, id: string) {
		const token = this.authService.getToken();
		this.selectedEexercise.name = exerciseIn.name;
		this.selectedEexercise.description = exerciseIn.description;
		this.selectedEexercise._id = exerciseIn._id;
		this.selectedEexercise.urlImg = exerciseIn.urlImg;
	}

	showButton() {
		this.exerciseResponse.status = false;
	}
	onSubmitDelete() {
		const token = this.authService.getToken();
		this.ExerciseApi.deleteExercise(this.selectedEexercise._id, token).subscribe(
			(exerciseRes: any) => {
				if (exerciseRes.status) {
					this.exerciseResponse.status = true;
					this.exerciseResponse.msg = exerciseRes.msg;
					this.classError = "";
					setTimeout(() => {
						this.exerciseResponse.msg = "";
						this.classError = "";
					}, 3000);
				}
			},
			(errorCather: any) => {
        if (errorCather.error.msg == "Access Token is required") {
          this.exerciseResponse.msg = errorCather.error.msg;
          this.classError = "alert alert-danger";
				} else {
					errorCather.error.errors.map((item: any) => {
						this.hiddenMsg = false;

						this.exerciseResponse.msg += item.msg + " || ";
						this.exerciseResponse.status = false;
						this.classError = "alert alert-danger";

					});
				}
        setTimeout(() => {
          this.exerciseResponse.msg = "";
          this.classError = "";
        }, 3000);
			}
		);
	}
}
