import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car, Flat, House, Result, Type } from '../shared/interfaces';
import {
  BreakpointObserver,
  BreakpointState
} from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  firstFormGroup: FormGroup;
  flat: FormGroup;
  car: FormGroup;
  house: FormGroup;
  flatObj: Flat;
  carObj: Car;
  houseObj: House;
  type = Type;
  loading: boolean = true;
  orientation: StepperOrientation = "horizontal";
  result: Result = {
    price: "Настана грешка, цената неможе да биде пресметана. Ве молиме обидете се повторно!"
  };

  constructor(private dataService: DataService, private _formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
        .observe(['(min-width: 1000px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.orientation = "horizontal";
          } else {
            this.orientation = "vertical";
          }
        });
    this.initForms();
  }

  reset() {
    this.loading = true;
    this.stepper.reset();
    this.initForms();
  }

  initForms() {
    this.firstFormGroup = this._formBuilder.group({
      selectedType: ['', Validators.required],
    });
    
    this.car = this._formBuilder.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      fuel: ['', Validators.required],
      km: ['', Validators.required],
      shifter: ['', Validators.required],
      body: ['', Validators.required],
      color: ['', Validators.required],
      registration: ['', Validators.required],
      registered_until: ['', Validators.required],
      emission_class: ['', Validators.required],
      kw: ['', Validators.required],
      hp: ['', Validators.required]
    });

    this.flat = this._formBuilder.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      number_of_rooms: ['', Validators.required],
      square_foot: ['', Validators.required],
      heating: ['', Validators.required],
      floor: ['', Validators.required],
      type_of_flat: ['', Validators.required],
      state: ['', Validators.required],
      equipment: ['', Validators.required],
      elevator: ['', Validators.required],
      number_of_balconies: ['', Validators.required],
      number_of_bathrooms: ['', Validators.required],
      basement: ['', Validators.required],
      number_of_parkings_garage: ['', Validators.required],
      orientation: ['', Validators.required],
    });

    this.house = this._formBuilder.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      number_of_rooms: ['', Validators.required],
      square_foot: ['', Validators.required],
      number_of_floors: ['', Validators.required],
      heating: ['', Validators.required],
      yard_area: ['', Validators.required],
      type_of_house: ['', Validators.required],
      state: ['', Validators.required],
      equipment: ['', Validators.required],
      number_of_balconies: ['', Validators.required],
      number_of_bathrooms: ['', Validators.required],
      basement: ['', Validators.required],
      number_of_parkings_garage: ['', Validators.required],
      orientation: ['', Validators.required]
    });
  }

  calculate() {
    if(this.firstFormGroup.value['selectedType']  === this.type.CAR) {
      this.carObj = this.car.value;
      this.dataService.getCarPrice(this.carObj)
          .subscribe((data) => {
            if(data) {
              this.result = data;
              this.loading = false;
            }
          }, () => {
            this.result['price'] = "Настана грешка, цената неможе да биде пресметана. Ве молиме обидете се повторно!";
            this.loading = false;
          });
    }
    else if(this.firstFormGroup.value['selectedType'] === this.type.FLAT) {
      this.flatObj = this.flat.value;
      this.dataService.getFlatPrice(this.flatObj)
          .subscribe((data) => {
            if(data) {
              this.result = data;
              this.loading = false;
            }
          }, () => {
            this.result['price'] = "Настана грешка, цената неможе да биде пресметана. Ве молиме обидете се повторно!";
            this.loading = false;
          });
    }
    else if(this.firstFormGroup.value['selectedType'] === this.type.HOUSE) {
      this.houseObj = this.house.value;
      this.dataService.getHousePrice(this.houseObj)
          .subscribe((data) => {
            if(data) {
              this.result = data;
              this.loading = false;
            }
          }, () => {
            this.result['price'] = "Настана грешка, цената неможе да биде пресметана. Ве молиме обидете се повторно!";
            this.loading = false;
          });
    }
    else {
      this.result['price'] = "Настана грешка, цената неможе да биде пресметана. Ве молиме обидете се повторно!";
      this.loading = false;
    }
  }

}