import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RadnoMesto } from 'src/app/models/radnomesto';
import { NotificationService } from 'src/app/services/notification.service';
import { RadnoMestoService } from 'src/app/services/radnomesto.service';

@Component({
  selector: 'app-dialog-radna-mesta',
  templateUrl: './dialog-radna-mesta.component.html',
  styleUrls: ['./dialog-radna-mesta.component.css']
})
export class DialogRadnaMestaComponent implements OnInit {

  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add radno mesto";

  constructor(private service: RadnoMestoService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogRadnaMestaComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : RadnoMesto) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nazivrm: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update radno mesto";
      this.formValue.patchValue({
        nazivrm: this.editData.nazivrm
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

 

  public addRadnoMesto() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addRadnoMesto(this.formValue.value)
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
      this.updateRadnoMesto();
    }
  }

  public updateRadnoMesto() {
    this.currentid = this.editData.radnomestoid;
    let data = {
      nazivrm : this.formValue.value.nazivrm,
      radnomestoid: this.currentid
    }
    this.service.updateRadnoMesto(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }

}
