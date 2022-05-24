import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VrstaTransporta } from 'src/app/models/vrstatransporta';
import { VrstaTransportaService } from 'src/app/services/vrstatransporta.service';
import { TransportService } from 'src/app/services/transport.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transport } from 'src/app/models/transport';

@Component({
  selector: 'app-dialog-transport',
  templateUrl: './dialog-transport.component.html',
  styleUrls: ['./dialog-transport.component.css']
})
export class DialogTransportComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /*vrsteTransporta: VrstaTransporta[] = [];
  transporti: Transport[] = [];
  formValue!: FormGroup;
  actionBtn : string = "Save";

  constructor(private fkService: VrstaTransportaService,
    private service : TransportService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogTransportComponent>,
    @Inject(MAT_DIALOG_DATA) public data : Transport ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      datumt: ['', Validators.required],
      lokacija: ['', Validators.required],
      vrstatransporta: ['', Validators.required]
    });

    this.fkService.getAllVrsteTransporta().subscribe(vrsteTransporta =>
      this.vrsteTransporta = vrsteTransporta
    );

    if(this.editData) {
      this.actionBtn = "Update";
      this.formValue.controls['datumt'].setValue(this.editData.datumt);
      this.formValue.controls['lokacija'].setValue(this.editData.lokacija);
      this.formValue.controls['vrstatransporta'].setValue(this.editData.vrstatransporta);
    }

    this.fkService.getAllVrsteTransporta().subscribe(vrsteTransporta =>
      this.vrsteTransporta = vrsteTransporta
    );

  }


  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id == b.id;
  }
  
  public addTransport(): void {
    this.service.addTransport(this.data);
    alert("Added");
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  compareTo(t1: Transport, t2: Transport): boolean {
    return t1 && t2 ? t1.vrstatransporta === t2.vrstatransporta : t1 === t2;
  }

  public addTransport() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addTransport(this.formValue.value)
        .subscribe({
          next: (res) => {
            alert("Transport added succesfully");
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
    this.service.addTransport(this.formValue.value);
    alert("Transport added succesfully");
    this.formValue.reset();
    this.dialogRef.close('save');
  }

  public updateTransport() {
    this.service.updateTransport(this.formValue.value)
        .subscribe({
          next: (res) => {
            alert("Transport modified succesfully");
            this.formValue.reset();
            this.dialogRef.close('update');
          },
          error: () => {
            alert("Something went wrong");
          }
        })
  }*/

}
