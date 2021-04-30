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
		break: 0,
		exercise: "",
		reps: 0,
	};

	previusTime: number = 10;
	previusStatus: boolean = true;

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.myRoutineArray = JSON.parse(this.activatedRoute.snapshot.params.myRoutine);
	}

	startRoutine() {
		this.changeRoutineState();

			this.myRoutine.break = this.myRoutineArray[0].break;
			const countdown = setInterval(() => {
				this.myRoutine.break--;
				console.log(this.myRoutine.break);
				if (this.myRoutine.break <= 0 || this.myRoutine.break < 1) {
					clearInterval(countdown);
				}
			}, 1000);
		

		this.myRoutine.exercise = this.myRoutineArray[0].exercise;
		this.myRoutine.reps = this.myRoutineArray[0].reps;
	}

	nextExercise() {}

	private changeRoutineState() {
		this.statusTraining = !this.statusTraining;
	}
}
