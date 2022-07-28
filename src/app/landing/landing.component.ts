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
import { map, Observable, startWith } from 'rxjs';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
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
  filteredOptionsModel: Observable<string[]>;
  filteredOptionsBrand: Observable<string[]>;
  optionsModel: string[] = ['1007', '101', '106', '107', '110', '111', '112', '116', '118', '120', '121', '123', '126', '127', '128', '1300/1500/1600', '131', '1310', '135', '181', '190', '2', '200', '2008', '204', '205', '206', '207', '208', '2107', '214', '216', '220', '240', '244', '250', '270', '280', '290', '2cv', '3', '300', '3008', '300c', '300m', '301', '304', '305', '306', '307', '308', '309', '316', '318', '320', '323', '325', '328', '330', '335', '340', '353', '4-runner', '400', '4007', '4008', '405', '406', '407', '416', '420', '440', '45', '460', '4x4', '5', '500', '5008', '500l', '504', '508', '518', '520', '523', '525', '528', '530', '535', '540', '55', '560', '6', '60', '600', '607', '620', '626', '65', '725', '730', '740', '75', '750', '80', '807', '850', '9-3', '9000', '93', '944', '95', 'a140', 'a150', 'a160', 'a170', 'a180', 'a2', 'a200', 'a3', 'a4', 'a5', 'a6', 'a8', 'asx', 'ax', 'accent', 'accord', 'actyon', 'adam', 'aerostar', 'agila', 'alfa145', 'alfa146', 'alfa147', 'alfa149', 'alfa155', 'alfa156', 'alfa159', 'alfa164', 'alfa166', 'alhambra', 'allroad', 'almera', 'almeratino', 'alpinea310', 'altea', 'alteaxl', 'alto', 'antara', 'arosa', 'ascona', 'astra', 'atos', 'auris', 'avenger', 'avensis', 'aveo', 'aygo', 'b-max', 'b150', 'b170', 'b180', 'b200', 'bt-50', 'bx', 'baleno', 'barchetta', 'beetle', 'berlina', 'berlingo', 'bipper', 'blazer', 'bora', 'brava', 'bravo', 'brera', 'bronco', 'c-crosser', 'c-elysee', 'c-max', 'c1', 'c15', 'c180', 'c2', 'c200', 'c220', 'c240', 'c25', 'c250', 'c270', 'c3', 'c30', 'c320', 'c3picasso', 'c4', 'c4cactus', 'c4picasso', 'c5', 'c6', 'c70', 'c8', 'cc', 'cj', 'cl200', 'clk200', 'clk220', 'clk230', 'clk270', 'clk320', 'clk430', 'cls320', 'cls350', 'cr-v', 'cx-7', 'cabrio', 'cabriolet', 'caddy', 'caliber', 'calibra', 'campagnola', 'captiva', 'captur', 'carens', 'carina', 'carnival', 'cayenne', "cee'd", "cee'dsportywagon", 'celica', 'cerato', 'cherokee', 'cinquecento', 'citan', 'citigo', 'civic', 'clarus', 'clio', 'clubman', 'colt', 'combo', 'commodore', 'compass', 'connektelekreo', 'coope', 'cooperd', 'cooperdcountryman', 'coopers', 'cooperscoupe', 'cordoba', 'corolla', 'corollaverso', 'corsa', 'cougar', 'countryman', 'coupe', 'courier', 'croma', 'cruze', 'cuore', 'ds3', 'ds4', 'ds5', 'dedra', 'defender', 'delta', 'derby', 'deville', 'discovery', 'doblo', 'dokker', 'doublecab', 'ducato', 'duster', 'dyane', 'e200', 'e220', 'e230', 'e240', 'e250', 'e270', 'e280', 'e290', 'e300', 'e320', 'e350', 'elantra', 'eos', 'epica', 'escape', 'escort', 'espace', 'espero', 'evanda', 'exeo', 'expedition', 'expert', 'fr-v', 'fabia', 'favorit', 'felicia', 'fiesta', 'fiorino', 'florida', 'fluence', 'focus', 'focusc-max', 'forfour', 'fortwo', 'forester', 'forman', 'fox', 'freelander', 'frontera', 'fusion', 'gs300', 'gsa', 'gt', 'gtv', 'gtv6', 'galant', 'galaxy', 'getz', 'giulietta', 'golf', 'golfplus', 'grandc4picasso', 'grandc4picassospacetourer', 'grandcaravan', 'grandcherokee', 'grandespace', 'grandscenic', 'grandvitara', 'grandvoyager', 'grandepunto', 'grandis', 'h-1', 'hr-v', 'hilux', 'is220', 'is250', 'ibiza', 'idea', 'ignis', 'impreza', 'inca', 'insignia', 'jazz', 'jetta', 'jimny', 'juke', 'jumper', 'jumpy', 'ka', 'kadett', 'kafer', 'kalos', 'kangoo', 'kappa', 'koleos', 'kuga', 'kyron', 'l200', 'lt', 'lacetti', 'laguna', 'lancer', 'landcruiser', 'lanos', 'lantra', 'latitude', 'legacy', 'leganza', 'legend', 'leon', 'liana', 'liberty', 'linea', 'lodgy', 'logan', 'logo', 'lupo', 'lybra', 'm3', 'm6', 'ml230', 'ml270', 'ml280', 'ml320', 'ml400', 'ml500', 'mpv', 'musa', 'musso', 'magentis', 'malibu', 'manta', 'marbella', 'marea', 'marengo', 'maruti', 'master', 'matiz', 'matrix', 'maverick', 'megane', 'meriva', 'mito', 'micra', 'mii', 'modus', 'mokka', 'mondeo', 'movano', 'multipla', 'murano', 'musso', 'mustang', 'navara', 'nemo', 'newbeetle', 'nexia', 'nitro', 'niva', 'note', 'nubira', 'one', 'oned', 'octavia', 'odyssey', 'omega', 'opa', 'orion', 'orlando', 'outlander', 'ptcruiser', 'pajero', 'pajerosport', 'palio', 'panda', 'partner', 'paseo', 'passat', 'pathfinder', 'patriot', 'patrol', 'phaeton', 'phedra', 'picanto', 'pick-up', 'polo', 'pony', 'praktik', 'prelude', 'pride', 'primera', 'prisma', "cee'd", 'puma', 'punto', 'q7', 'qashqai', 'qashqai+2', 'qubo', 'r14', 'r19', 'r4', 'r5', 'r9', 'rav4', 'rexton', 'rx-8', 'rangerover', 'rangeroversport', 'rapid/spaceback', 'rekord', 'rezzo', 'rifter', 'rio', 'roadster', 'roomster', 'rover', 's-coupe', 's-max', 's-type', 's300', 's320', 's350', 's40', 's450', 's500', 's6', 's60', 's70', 's8', 's80', 'saxo', 'slk200', 'sx4', 'safrane', 'samara', 'samurai', 'sandero', 'santafe', 'scenic', 'scirocco', 'scorpio', 'scudo', 'sebring', 'sedici', 'seicento', 'senator', 'sephia', 'serieii', 'sharan', 'shuma', 'sierra', 'signum', 'silvercloud', 'sintra', 'sirion', 'skala', 'solara', 'solenza', 'sonata', 'sonica', 'sorento', 'soul', 'spacestar', 'spark', 'splash', 'sportage', 'sprinter', 'stilo', 'streetka', 'streetwise', 'sunny', 'superb', 'swift', 't3други', 't4caravelle', 't4multivan', 't4други', 't5caravelle', 't5shuttle', 't5други', 'trevis', 'tt', 'tacuma', 'taunus', 'tepee', 'tempra', 'terios', 'terracan', 'terrano', 'thesis', 'tico', 'tigra', 'tiguan', 'tipo', 'toledo', 'touareg', 'touran', 'tourneo', 'transit', 'transporter', 'trax', 'tribute', 'tucson', 'twingo', 'ulysse', 'uno', 'urbancruiser', 'v40', 'v50', 'v60', 'v70', 'vaneo', 'vanette', 'vectra', 'velsatis', 'venga', 'vento', 'vitara', 'vito', 'vivaro', 'vivio', 'voyager', 'wagonr+', 'wrangler', 'x-90', 'x-trail', 'x-type', 'x1', 'x3', 'x5', 'xc60', 'xc70', 'xc90', 'xf', 'xantia', 'xsara', 'xsarapicasso', 'yrv', 'yaris', 'yeti', 'ypsilon', 'yugo', 'z3', 'zx', 'zafira', 'zeta', 'i10', 'i20', 'i30', 'ix20', 'ix35', 'up!', 'а1', 'а7', 'другмодел'];
  optionsBrand: string[] = ['alfaromeo', 'audi', 'bmw', 'cadillac', 'chevrolet', 'chrysler', 'citroen', 'dsautomobiles', 'dacija', 'daewoo', 'daihatsu', 'dodge', 'fiat', 'ford', 'honda', 'hyundai', 'jaguar', 'jeep', 'kia', 'lada', 'lancia', 'landrover', 'lexus', 'mazda', 'mercedes-benz', 'mini', 'mitsubishi', 'nissan', 'opel', 'peugeot', 'porsche', 'renault', 'rolls-royce', 'rover', 'saab', 'seat', 'skoda', 'smart', 'ssangyong', 'subaru', 'suzuki', 'toyota', 'vwvolkswagen', 'volvo', 'wartburg', 'yugo', 'zastava'];


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

    this.filteredOptionsModel = this.car.controls['model'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name ? this._filterModel(name as string) : this.optionsModel.slice();
      }),
    );

    this.filteredOptionsBrand = this.car.controls['brand'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = value;
        return name ? this._filterBrand(name as string) : this.optionsBrand.slice();
      }),
    );
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.car.controls['registered_until'].value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.car.controls['registered_until'].setValue(ctrlValue);
    datepicker.close();
  }

  displayFnModel(user: string): string {
    return user;
  }

  displayFnBrand(user: string): string {
    return user;
  }

  private _filterModel(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.optionsModel.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterBrand(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.optionsBrand.filter(option => option.toLowerCase().includes(filterValue));
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
      registered_until: [moment(), Validators.required],
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
      this.carObj.registered_until = Number(String(Number(new Date(this.carObj.registered_until).getMonth()) + 1).concat(String(new Date(this.carObj.registered_until).getFullYear())));
      this.dataService.getCarPrice(this.carObj)
          .subscribe((data) => {
            if(data) {
              this.result = data;
              this.result.price = Math.trunc(this.result.price) + "€";
              this.loading = false;
            }
          }, () => {
            this.result['price'] = "Настана грешка, цената неможе да биде пресметана. Ве молиме обидете се повторно!";
            this.loading = false;
          });
    }
    else if(this.firstFormGroup.value['selectedType'] === this.type.FLAT) {
      this.flatObj = this.flat.value;
      this.flatObj.number_of_rooms = String(this.flatObj.number_of_rooms);
      this.dataService.getFlatPrice(this.flatObj)
          .subscribe((data) => {
            if(data) {
              this.result = data;
              this.result.price = Math.trunc(this.result.price) + "€";
              this.loading = false;
            }
          }, () => {
            this.result['price'] = "Настана грешка, цената неможе да биде пресметана. Ве молиме обидете се повторно!";
            this.loading = false;
          });
    }
    else if(this.firstFormGroup.value['selectedType'] === this.type.HOUSE) {
      this.houseObj = this.house.value;
      this.houseObj.number_of_rooms = String(this.houseObj.number_of_rooms);
      this.dataService.getHousePrice(this.houseObj)
          .subscribe((data) => {
            if(data) {
              this.result = data;
              this.result.price = Math.trunc(this.result.price) + "€";
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