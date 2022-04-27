import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RadnoMesto } from 'src/app/models/radnomesto';
import { NotificationService } from 'src/app/services/notification.service';
import { RadnoMestoService } from 'src/app/services/radnomesto.service';

@Component({
  selector: 'app-radno-mesto',
  templateUrl: './radno-mesto.component.html',
  styleUrls: ['./radno-mesto.component.css']
})
export class RadnoMestoComponent implements OnInit {

  formValue!: FormGroup;
  radnoMestoModelObj : RadnoMesto = new RadnoMesto();
  radnihMesta: RadnoMesto[] = [];
  showAdd!: boolean;
  showUpdate!: boolean;
  p: number = 1;
  searchedKeyword: string;
  heading: string;

  constructor(private formBuilder :  FormBuilder,
    private service: RadnoMestoService,
    private notification : NotificationService) {

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nazivrm: ['']
    });
    this.getAllRadnihMesta();
  } 

  postRadnoMestoDetails(): void {
    this.radnoMestoModelObj.nazivrm = this.formValue.value.nazivrm;

    this.service.addRadnoMesto(this.radnoMestoModelObj)
    .subscribe(res => {
      this.notification.success(':: Added successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllRadnihMesta();
    }, 
    err => {
      alert("Something went wrong");
    })
  }

  getAllRadnihMesta() {
    this.service.getAllRadnaMesta().subscribe(radnihMesta => {
      this.radnihMesta = radnihMesta;
    });
  }

  deleteRadnoMesto(row : any) {
    if(confirm('Are you sure you want to delete')) {
      this.service.deleteRadnoMesto(row.radnomestoid)
    .subscribe(res => {
      this.notification.warn(':: Deleted successfully');
      this.getAllRadnihMesta();
    }); 
    }
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.radnoMestoModelObj.radnomestoid = row.radnomestoid;
    this.formValue.controls['nazivrm'].setValue(row.nazivrm);
    this.heading = "Update radno mesto";
  }

  updateRadnoMestoDetails() {
    this.radnoMestoModelObj.nazivrm = this.formValue.value.nazivrm;
    this.service.updateRadnoMesto(this.radnoMestoModelObj)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllRadnihMesta();
    });
  }

  clickAddRadnoMesto() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.heading = "Add radno mesto";
  }

  key: string = 'id';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
