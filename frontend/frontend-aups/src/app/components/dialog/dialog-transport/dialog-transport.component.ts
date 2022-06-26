import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VrstaTransporta } from 'src/app/models/vrstatransporta';
import { VrstaTransportaService } from 'src/app/services/vrstatransporta.service';
import { TransportService } from 'src/app/services/transport.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transport } from 'src/app/models/transport';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dialog-transport',
  templateUrl: './dialog-transport.component.html',
  styleUrls: ['./dialog-transport.component.css']
})
export class DialogTransportComponent implements OnInit {

  vrsteTransporta: VrstaTransporta[] = [];
  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add transport";

  constructor(private fkService: VrstaTransportaService,
    private service : TransportService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogTransportComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Transport ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      datumt: ['', Validators.required],
      lokacija: ['', Validators.required],
      vrstatransporta: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update transport";
      this.formValue.patchValue({
        datumt: this.editData.datumt,
        lokacija: this.editData.lokacija,
        vrstatransporta: this.editData.vrstatransporta
      });
    }

    this.fkService.getAllVrsteTransporta().subscribe(vrsteTransporta =>
      this.vrsteTransporta = vrsteTransporta
    );

  }

  public cancel(): void {
    this.dialogRef.close();
  }

 

  public addTransport() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addTransport(this.formValue.value)
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
      this.updateTransport();
    }
  }

  public updateTransport() {
    this.currentid = this.editData.transportid;
    console.log(this.currentid);
    let data = {
      datumt : this.formValue.value.datumt,
      lokacija: this.formValue.value.lokacija,
      vrstatransporta: this.formValue.value.vrstatransporta,
      transportid : this.currentid
    }
    this.service.updateTransport(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }

}
