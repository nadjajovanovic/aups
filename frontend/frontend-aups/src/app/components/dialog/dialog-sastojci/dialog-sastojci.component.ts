import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sastojci } from 'src/app/models/sastojci';
import { NotificationService } from 'src/app/services/notification.service';
import { SastojciService } from 'src/app/services/sastojci.service';

@Component({
  selector: 'app-dialog-sastojci',
  templateUrl: './dialog-sastojci.component.html',
  styleUrls: ['./dialog-sastojci.component.css']
})
export class DialogSastojciComponent implements OnInit {

  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add sastojak";

  constructor(private service: SastojciService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogSastojciComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Sastojci) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nazivs: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update sastojak";
      this.formValue.patchValue({
        nazivs: this.editData.nazivs
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addSastojak() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addSastojak(this.formValue.value)
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
      this.updateSastojak();
    }
  }

  public updateSastojak() {
    this.currentid = this.editData.sastojciid;
    let data = {
      nazivs : this.formValue.value.nazivs,
      sastojciid: this.currentid
    }
    this.service.updateSastojak(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }


}
