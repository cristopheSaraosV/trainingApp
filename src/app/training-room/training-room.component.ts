import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MyRoutine } from "../models/routineCustom";

@Component({
	selector: "app-training-room",
	templateUrl: "./training-room.component.html",
	styleUrls: ["./training-room.component.css"],
})
export class TrainingRoomComponent implements OnInit {
	statusTraining: boolean = false;
	myRoutineArray: Array<MyRoutine>;

	myRoutine: MyRoutine = {
		timeRemaining: 0,
		exercise: "",
		reps: 0,
	};

	previousTraining: number = 5;
	break: number = 10;
	count: number = 1;
	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.myRoutineArray = JSON.parse(this.activatedRoute.snapshot.params.myRoutine);
	}



	startRoutine() {
		this.changeRoutineState();

		const countDownPrevious = setInterval(() => {
			this.previousTraining--;
			if (this.previousTraining <= 0 || this.previousTraining < 1) {
				clearInterval(countDownPrevious);
			}
		}, 1000);

		this.myRoutine.timeRemaining = this.myRoutineArray[0].timeRemaining;
		this.myRoutine.exercise = this.myRoutineArray[0].exercise;
		this.myRoutine.reps = this.myRoutineArray[0].reps;


		const countDownTraining = setInterval(() => {
			this.break--;
			if (this.break <= 0 || this.break < 1) {
				clearInterval(countDownTraining);
				this.count++;
			}
		}, 1000);

		
	}

	nextExercise() {}

	private changeRoutineState() {
		this.statusTraining = !this.statusTraining;
	}
}


