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
	totalTime: number = 0;
	break: number = 10;

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.myRoutineArray = JSON.parse(this.activatedRoute.snapshot.params.myRoutine);
	}

	startRoutine() {
		this.changeRoutineState();

		this.myRoutine.timeRemaining = this.myRoutineArray[0].timeRemaining;
		this.myRoutine.exercise = this.myRoutineArray[0].exercise;
		this.myRoutine.reps = this.myRoutineArray[0].reps;

		this.myRoutineArray.map((myRoutineItem) => {
			let timeExercise = parseInt(myRoutineItem.timeRemaining.toString());
			this.totalTime = this.totalTime + timeExercise + this.break;
		});

		const countdown = setInterval(() => {
			this.previousTraining--;
			if (this.previousTraining <= 0 || this.previousTraining < 1) {
				clearInterval(countdown);
				const countDownTraining = setInterval(() => {
					this.myRoutine.timeRemaining--;
					if (
						this.myRoutine.timeRemaining <= 0 ||
						this.myRoutine.timeRemaining < 1
					) {
						clearInterval(countDownTraining);
					}
				}, 1000);
			}
		}, 1000);
	}

	nextExercise() {}

	private changeRoutineState() {
		this.statusTraining = !this.statusTraining;
	}
}
