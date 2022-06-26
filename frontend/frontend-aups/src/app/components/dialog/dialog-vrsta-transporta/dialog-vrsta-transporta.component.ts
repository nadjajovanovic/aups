import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VrstaTransporta } from 'src/app/models/vrstatransporta';
import { NotificationService } from 'src/app/services/notification.service';
import { VrstaTransportaService } from 'src/app/services/vrstatransporta.service';

@Component({
  selector: 'app-dialog-vrsta-transporta',
  templateUrl: './dialog-vrsta-transporta.component.html',
  styleUrls: ['./dialog-vrsta-transporta.component.css']
})
export class DialogVrstaTransportaComponent implements OnInit {

  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add vrstu transporta";

  constructor(private service: VrstaTransportaService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogVrstaTransportaComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : VrstaTransporta) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nazivvt: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update mesto";
      this.formValue.patchValue({
        nazivvt: this.editData.nazivvt
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addVrstuTransporta() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addVrstuTransporta(this.formValue.value)
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
      this.VrstuTransporta();
    }
  }

  public VrstuTransporta() {
    this.currentid = this.editData.vrstatransportaid;
    let data = {
      nazivvt : this.formValue.value.nazivvt,
      vrstatransportaid: this.currentid
    }
    this.service.updateVrstuTransporta(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }


}
