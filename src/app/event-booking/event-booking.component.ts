import { Component, OnInit} from '@angular/core';
import { EventService } from '../event.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-event-booking',
	templateUrl: './event-booking.component.html',
	styleUrls: ['./event-booking.component.css']
})
export class EventBookingComponent implements OnInit {
	eventNameVal = '';
	seatCount = 0;
	bookingForm: FormGroup;
	seats = [1, 2, 3, 4, 5, 6];
	notAvailableSeat = false;
	selectedSeatCount = 0;
  isValidFormSubmitted = false;
  submitted = false;

	constructor(private _sharedService: EventService, private userFormBuilder: FormBuilder, private router: Router) {
		this.bookingForm = this.userFormBuilder.group({
			u_name: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
			u_email: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
			u_phone: ["", [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')]],
			u_seats: ["", Validators.required],
			atteName: this.userFormBuilder.array([]),
		});

    this.isValidFormSubmitted = false;
    this.submitted = false;
	}

	ngOnInit() {
		this._sharedService.eventName.subscribe(response => {
			if (response) {
				this.eventNameVal = response.eventname;
				this.seatCount = response.availableseats;
			}
		});

		if (this.selectedSeatCount == 0) {
			this.attendeeName.push(this.userFormBuilder.group({
				attName: ["", Validators.required],
			}));
		}
	}

	getValidity(i) {
		return ( < FormArray > this.bookingForm.get('atteName')).controls[i].invalid;
	}

	createAttendee() {
		this.clearAttendee();
		for (var i = 0; i < this.selectedSeatCount; i++) {
			this.attendeeName.push(this.userFormBuilder.group({
				attName: ["", Validators.required],
			}));
		}
	}

	get attendeeName() {
		return this.bookingForm.controls.atteName as FormArray;
	}

	clearAttendee(): void {
		for (var i = this.attendeeName.length - 1; i >= 0; i--) {
			if (this.attendeeName) {
				this.attendeeName.removeAt(i);
			}
		}
	}

	onSeatSelected(selectedVal) {
    let _selectedVal = parseInt(selectedVal)
    this.selectedSeatCount = _selectedVal;
		if (_selectedVal > Number(this.seatCount)) {
			this.notAvailableSeat = true;
		} else {
			this.notAvailableSeat = false;
			this.createAttendee();
		}
	}

	submitLogin() {
		this.validateAllFields(this.bookingForm)
    this.isValidFormSubmitted = true;
    
    if (this.bookingForm.invalid) { 
         return;
     }else{
      console.log("Event Booking data ", JSON.stringify(this.bookingForm.value));
      this.submitted = true;
      
     }
	}

	validateAllFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormArray) {
				for (const control1 of control.controls) {
					if (control1 instanceof FormControl) {
						control1.markAsTouched({
							onlySelf: true
						});
					}
					if (control1 instanceof FormGroup) {
						this.validateAllFields(control1);
					}
				}
			}
			if (control instanceof FormControl) {
				control.markAsTouched({
					onlySelf: true
				});
			} else if (control instanceof FormGroup) {
				this.validateAllFields(control);
			}
		});
	}

	backToBookingListScreen() {
		this.router.navigate(["/event-list"]);
	}
}