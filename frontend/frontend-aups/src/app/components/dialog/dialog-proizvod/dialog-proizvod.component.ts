import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanProizvodnje } from 'src/app/models/planproizvodnje';
import { Proizvod } from 'src/app/models/proizvod';
import { NotificationService } from 'src/app/services/notification.service';
import { PlanProizvodnjeService } from 'src/app/services/planproizvodnje.service';
import { ProizvodService } from 'src/app/services/proizvod.service';

@Component({
  selector: 'app-dialog-proizvod',
  templateUrl: './dialog-proizvod.component.html',
  styleUrls: ['./dialog-proizvod.component.css']
})
export class DialogProizvodComponent implements OnInit {

  planproizvodnje: PlanProizvodnje[] =[];
  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add proizvod";

  constructor(private planProizvodnjeService: PlanProizvodnjeService,
    private service : ProizvodService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogProizvodComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Proizvod ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      cena: ['', Validators.required],
      nazivpr: ['', Validators.required],
      vrstapr: ['', Validators.required],
      planproizvodnje: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update proizvod";
      this.formValue.patchValue({
        cena: this.editData.cena,
        nazivpr: this.editData.nazivpr,
        vrstapr: this.editData.vrstapr,
        planproizvodnje: this.editData.planproizvodnje
      });
    }

    this.planProizvodnjeService.getAllPlanaProizvodnje().subscribe(planproizvodnje =>
      this.planproizvodnje = planproizvodnje
    );
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addProizvod() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addProizvod(this.formValue.value)
        .subscribe({
          next: (res) => {
            this.notification.success(':: Added successfully');
            this.formValue.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Something went wrong");
          }
        })
      }
    } else {
      this.updateProizvod();
    }
  }

  public updateProizvod() {
    this.currentid = this.editData.proizvodid;
    console.log(this.currentid);
    let data = {
      cena: this.formValue.value.cena,
      nazivpr: this.formValue.value.nazivpr,
      vrstapr: this.formValue.value.vrstapr,
      planproizvodnje: this.formValue.value.planproizvodnje,
      proizvodid: this.currentid
    }
    this.service.updateProizvod(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }

}
