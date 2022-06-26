import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mesto } from 'src/app/models/mesto';
import { Radnik } from 'src/app/models/radnik';
import { Sastojci } from 'src/app/models/sastojci';
import { Skladiste } from 'src/app/models/skladiste';
import { MestoService } from 'src/app/services/mesto.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RadnikService } from 'src/app/services/radnik.service';
import { SastojciService } from 'src/app/services/sastojci.service';
import { SkladisteService } from 'src/app/services/skladiste.service';

@Component({
  selector: 'app-dialog-skladiste',
  templateUrl: './dialog-skladiste.component.html',
  styleUrls: ['./dialog-skladiste.component.css']
})
export class DialogSkladisteComponent implements OnInit {

  mesta: Mesto[] = [];
  radnika: Radnik[] =[];
  sastojaka: Sastojci[] = [];
  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add skladiste";

  constructor(private mestoService: MestoService,
    private radnikService: RadnikService,
    private sastojciService: SastojciService,
    private service : SkladisteService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogSkladisteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Skladiste ) { }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      oznakas: ['', Validators.required],
      mesto: ['', Validators.required],
      radnik: ['', Validators.required],
      sastojci: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update transport";
      this.formValue.patchValue({
        oznakas: this.editData.oznakas,
        mesto: this.editData.mesto,
        radnik: this.editData.radnik,
        sastojci: this.editData.sastojci
      });
    }

    this.mestoService.getAllMesta().subscribe(mesta =>
      this.mesta = mesta
    );

    this.radnikService.getAllRadnike().subscribe(radnika =>
      this.radnika = radnika
    );

    this.sastojciService.getAllSastojke().subscribe(sastojaka =>
      this.sastojaka = sastojaka
    );
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public addSkladiste() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addSkladiste(this.formValue.value)
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
    this.currentid = this.editData.skladisteid;
    console.log(this.currentid);
    let data = {
      oznakas: this.formValue.value.oznakas,
      mesto: this.formValue.value.mesto,
      radnik: this.formValue.value.radnik,
      sastojci: this.formValue.value.sastojci,
      skladisteid : this.currentid
    }
    this.service.updateSkladiste(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }

}
