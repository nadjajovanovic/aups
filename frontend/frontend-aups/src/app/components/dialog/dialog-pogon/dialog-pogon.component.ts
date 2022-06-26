import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pogon } from 'src/app/models/pogon';
import { NotificationService } from 'src/app/services/notification.service';
import { PogonService } from 'src/app/services/pogon.service';

@Component({
  selector: 'app-dialog-pogon',
  templateUrl: './dialog-pogon.component.html',
  styleUrls: ['./dialog-pogon.component.css']
})
export class DialogPogonComponent implements OnInit {

  pogoni: Pogon[] = [];
  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add pogon";

  constructor(private service: PogonService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogPogonComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Pogon) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      oznakap: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update pogon";
      this.formValue.patchValue({
        oznakap: this.editData.oznakap
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

 

  public addMesto() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addPogon(this.formValue.value)
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
      this.updatePogon();
    }
  }

  public updatePogon() {
    this.currentid = this.editData.pogonid;
    let data = {
      oznakap : this.formValue.value.oznakap,
      pogonid: this.currentid
    }
    this.service.updatePogon(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }

}
