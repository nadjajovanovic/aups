import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanProizvodnje } from 'src/app/models/planproizvodnje';
import { Radnik } from 'src/app/models/radnik';
import { Transport } from 'src/app/models/transport';
import { NotificationService } from 'src/app/services/notification.service';
import { PlanProizvodnjeService } from 'src/app/services/planproizvodnje.service';
import { RadnikService } from 'src/app/services/radnik.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-dialog-plan-proizvodnje',
  templateUrl: './dialog-plan-proizvodnje.component.html',
  styleUrls: ['./dialog-plan-proizvodnje.component.css']
})
export class DialogPlanProizvodnjeComponent implements OnInit {

  radnici: Radnik[] = [];
  transporti: Transport[] = [];
  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add plan proizvodnje";

  constructor(private radnikService: RadnikService,
    private transportiService: TransportService,
    private service : PlanProizvodnjeService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogPlanProizvodnjeComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : PlanProizvodnje ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      datum: ['', Validators.required],
      kolicina: ['', Validators.required],
      napomena: ['', Validators.required],
      oznakapp: ['', Validators.required],
      radnik: ['', Validators.required],
      transport: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update plan proizvodnje";
      this.formValue.patchValue({
        datum: this.editData.datum,
        kolicina: this.editData.kolicina,
        napomena: this.editData.napomena,
        oznakapp: this.editData.oznakapp,
        radnik: this.editData.radnik,
        transport: this.editData.transport
      });
    }

    this.radnikService.getAllRadnike().subscribe(radnici =>
      this.radnici = radnici
    );

    this.transportiService.getAllTransporte().subscribe(transporti =>
      this.transporti = transporti
    );

  }

  public cancel(): void {
    this.dialogRef.close();
  }


  public addPlanProizvodnje() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addPlanProizvodnje(this.formValue.value)
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
      this.updatePlanProizvodnje();
    }
  }

  public updatePlanProizvodnje() {
    this.currentid = this.editData.planproizvodnjeid;
    console.log(this.currentid);
    let data = {
      datum: this.formValue.value.datum,
      kolicina: this.formValue.value.kolicina,
      napomena: this.formValue.value.napomena,
      oznakapp: this.formValue.value.oznakapp,
      radnik: this.formValue.value.radnik,
      transport: this.formValue.value.transport,
      planproizvodnjeid : this.currentid
    }
    this.service.updatePlanProizvodnje(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }

}
