import { Component, OnInit } from "@angular/core";
import * as exercisesJson from "../../assets/json/exercises.json";
import { FormControl, FormGroup } from "@angular/forms";
import { MyRoutine } from "../models/routineCustom";
import { Exercise } from "../models/exercise";
import { Router } from "@angular/router";

@Component({
	selector: "app-custom-routine",
	templateUrl: "./custom-routine.component.html",
	styleUrls: ["./custom-routine.component.css"],
})
export class CustomRoutineComponent implements OnInit {
	exercisesList: Array<Exercise> = (exercisesJson as any).default;

	myRoutine: Array<MyRoutine> = [];

	trainingRoomStatus: boolean = false;

	exerciseFormGroup = new FormGroup({
		reps: new FormControl(""),
		timeRemaining: new FormControl(""),
		exerciseName: new FormControl(""),
	});

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.exerciseFormGroup.controls["reps"].setValue(6);
		this.exerciseFormGroup.controls["timeRemaining"].setValue(30);
		this.exerciseFormGroup.controls["exerciseName"].setValue("PUSH-UPS");
	}

	onSubmit() {
		this.trainingRoomStatus = true;
		this.router.navigate([
			"home/routinesCustom/trainingRoom/",
			{ myRoutine: JSON.stringify(this.myRoutine) },
		]);
	}
	showRoutinesCustom() {
		this.trainingRoomStatus = false;
	}
	addExercise() {
		this.myRoutine.push({
			exercise: this.exerciseFormGroup.controls["exerciseName"].value,
			reps: this.exerciseFormGroup.controls["reps"].value,
			timeRemaining: this.exerciseFormGroup.controls["timeRemaining"].value,
		});
	}

	sendRoutine() {}
}
