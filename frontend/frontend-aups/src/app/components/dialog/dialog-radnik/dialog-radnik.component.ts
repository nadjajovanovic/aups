import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pogon } from 'src/app/models/pogon';
import { Radnik } from 'src/app/models/radnik';
import { RadnoMesto } from 'src/app/models/radnomesto';
import { NotificationService } from 'src/app/services/notification.service';
import { PogonService } from 'src/app/services/pogon.service';
import { RadnikService } from 'src/app/services/radnik.service';
import { RadnoMestoService } from 'src/app/services/radnomesto.service';

@Component({
  selector: 'app-dialog-radnik',
  templateUrl: './dialog-radnik.component.html',
  styleUrls: ['./dialog-radnik.component.css']
})
export class DialogRadnikComponent implements OnInit {

  pogoni: Pogon[] = [];
  radnihMesta: RadnoMesto[] =[];
  formValue!: FormGroup;
  actionBtn : string = "Save";
  currentid : number;
  heading: string = "Add radno mesto";

  constructor(private pogonService: PogonService,
    private radnoMestoService: RadnoMestoService,
    private service : RadnikService,
    private notification : NotificationService,
    private formBuilder: FormBuilder, 
    private dialogRef : MatDialogRef<DialogRadnikComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Radnik ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      jmbg: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      pogon: ['', Validators.required],
      radnomesto: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.heading = "Update radno mesto";
      this.formValue.patchValue({
        ime: this.editData.ime,
        prezime: this.editData.prezime,
        jmbg: this.editData.jmbg,
        username: this.editData.username,
        password: this.editData.password,
        pogon: this.editData.pogon,
        radnomesto:this.editData.radnomesto
      });
    }

    this.pogonService.getAllPogona().subscribe(pogoni =>
      this.pogoni = pogoni
    );

    this.radnoMestoService.getAllRadnaMesta().subscribe(radnihMesta =>
      this.radnihMesta = radnihMesta
    );
  }


  public cancel(): void {
    this.dialogRef.close();
  }

 

  public addRadnika() {
    if(!this.editData) {
      if(this.formValue.valid) {
        this.service.addRadnik(this.formValue.value)
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
      this.updateRadnik();
    }
  }

  public updateRadnik() {
    this.currentid = this.editData.radnikid;
    console.log(this.currentid);
    let data = {
      ime: this.formValue.value.ime,
      prezime: this.formValue.value.prezime,
      jmbg: this.formValue.value.jmbg,
      username: this.formValue.value.username,
      password: this.formValue.value.password,
      pogon: this.formValue.value.pogon,
      radnomesto: this.formValue.value.radnomesto,
      radnikid: this.currentid
    }
    this.service.updateRadnik(data)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      this.formValue.reset();
      this.dialogRef.close('update');
    });
  }

}
