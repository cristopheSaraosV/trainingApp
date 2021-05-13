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

	previousTraining: number = 8;
	break: number = 30 + this.previousTraining;
	currentRound: number = 0;
	totalTime: number = 0;
	isCompleted = false;
	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.myRoutineArray = JSON.parse(this.activatedRoute.snapshot.params.myRoutine);
	}

	startRoutine() {
		this.changeRoutineState();

		const countDownPrevious = setInterval(() => {
			// temporizador previo entrenamiento
			this.previousTraining--;
			if (this.previousTraining <= 0 || this.previousTraining < 1) {
				clearInterval(countDownPrevious);
			}
		}, 1000);

			this.totalTime = this.myRoutineArray.length * this.break;
			const countDownTraining = setInterval(() => {
				this.totalTime--;
				this.break--;
				this.myRoutine.exercise = this.myRoutineArray[this.currentRound].exercise;
				this.myRoutine.reps = this.myRoutineArray[this.currentRound].reps;

				if (this.break <= 0 || this.break < 1) {
					this.break = 38;
					this.currentRound++;
				}

				if (this.totalTime <= 0) {
					this.break = 0;
					this.isCompleted = true;
					clearInterval(countDownTraining);
				}
			}, 1000);
	}

	nextExercise() {}

	private changeRoutineState() {
		this.statusTraining = !this.statusTraining;
	}
}
