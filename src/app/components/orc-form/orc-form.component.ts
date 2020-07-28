import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {OrcService} from '../../services/orc.service';
import {OrcFormDataModel} from '../../models/OrcFormDataModel';
import {WeaponOptionModel} from '../../models/weaponOption.model';
import {FormInitDataModel} from '../../models/formInitData.model';

@Component({
  selector: 'app-orc-form',
  templateUrl: './orc-form.component.html',
  styleUrls: ['./orc-form.component.css']
})
export class OrcFormComponent implements OnInit {

  orcForm: FormGroup;
  // raceTypes: RaceTypeOptionModel[];
  weaponOptions: WeaponOptionModel[];
  // hordeOptions: HordeListItemForOrcFormModel[];
  private orcId: number;

  constructor(private orcService: OrcService, private router: Router, private route: ActivatedRoute) {
    this.orcForm = new FormGroup({
      name: new FormControl(''),
      // Validators.required, (control: FormControl) => validateNameNotTaken(control, this.orcId, this.http)),
      killCount: new FormControl(null),
      // 'raceType': new FormControl(''),
      weapons: new FormArray([]),
      // 'hordeId': new FormControl(null),
    });
  }

  ngOnInit(): void {
    // this.orcService.getInitialFormData().subscribe((formInitData: FormInitDataModel) => {
    //   this.weaponOptions = formInitData.weapons;
    //   this.createCheckboxControls();
      this.route.paramMap.subscribe(
        paramMap => {
          const editableOrcId = paramMap.get('id');
          if (editableOrcId) {
            this.orcId = +editableOrcId;
            this.getOrcDetails(editableOrcId);
          }
        },
        error => console.warn(error),
      );
    // });
  }

  getOrcDetails = (id: string) => {
    this.orcService.fetchOrcDetails(id).subscribe(
      (response: OrcFormDataModel) => {
        this.orcForm.patchValue({
          name: response.name,
          killCount: response.killCount,
          // hordeId: response.hordeId,
         // weapons: this.createWeaponsFormArray(response.weapons),
        });
      },
    );
  }

  createWeaponsFormArray = (weaponsNames: string[]) => {
    return this.weaponOptions.map(weaponOption => {
      return weaponsNames.includes(weaponOption.name);
    });
  }

  private createCheckboxControls(): void {
    this.weaponOptions.forEach(() => {
      const control = new FormControl(false);
      (this.orcForm.controls.weapons as FormArray).push(control);
    });
  }

  private createWeaponsArrayToSend(): string[] {
    return this.orcForm.value.weapons
      .map((weapon, index) => weapon ? this.weaponOptions[index].name : null)
      .filter(weapon => weapon !== null);
  }

  onSubmit(): void {
    const data = {...this.orcForm.value};
    data.weapons = this.createWeaponsArrayToSend();
    this.orcId ? this.updateOrc(data) : this.createOrc(data);
  }

  updateOrc(data: OrcFormDataModel): void {
    this.orcService.updateOrc(data, this.orcId).subscribe(
      () => this.router.navigate(['/'])
      // ,error => handleValidationErrors(error, this.orcForm),
    );
  }

  createOrc(data: OrcFormDataModel): void {
    this.orcService.createOrc(data).subscribe(
      () => {
        // this.orcForm.reset();
        this.router.navigate(['/']);
      }
      // ,error => handleValidationErrors(error, this.orcForm),
    );
  }
}

