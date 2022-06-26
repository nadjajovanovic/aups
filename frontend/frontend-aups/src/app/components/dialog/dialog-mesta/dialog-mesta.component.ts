import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mesto } from 'src/app/models/mesto';
import { MestoService } from 'src/app/services/mesto.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dialog-mesta',
  templateUrl: './dialog-mesta.component.html',
  styleUrls: ['./dialog-mesta.component.css']
})
export class DialogMestaComponent implements OnInit {

  mesta: Mesto[] = [];
  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add mesto";

  constructor(private service: MestoService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogMestaComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Mesto) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nazivm: ['', Validators.required],
      postanskibroj: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update mesto";
      this.formValue.patchValue({
        nazivm: this.editData.nazivm,
        postanskibroj: this.editData.postanskibroj
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addMesto() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addMesto(this.formValue.value)
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
      this.updateMesto();
    }
  }

  public updateMesto() {
    this.currentid = this.editData.mestoid;
    let data = {
      nazivm : this.formValue.value.nazivm,
      postanskibroj: this.formValue.value.postanskibroj,
      mestoid: this.currentid
    }
    this.service.updateMesto(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }

}
