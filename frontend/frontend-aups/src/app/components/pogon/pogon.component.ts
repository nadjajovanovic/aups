import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pogon } from 'src/app/models/pogon';
import { NotificationService } from 'src/app/services/notification.service';
import { PogonService } from 'src/app/services/pogon.service';

@Component({
  selector: 'app-pogon',
  templateUrl: './pogon.component.html',
  styleUrls: ['./pogon.component.css']
})
export class PogonComponent implements OnInit {

  formValue!: FormGroup;
  pogonModelObj : Pogon = new Pogon();
  pogoni: Pogon[] = [];
  showAdd!: boolean;
  showUpdate!: boolean;
  p: number = 1;
  searchedKeyword: string;
  heading: string;

  constructor(private formBuilder :  FormBuilder,
    private service: PogonService,
    private notification : NotificationService) {

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      oznakap: ['']
    });
    this.getAllPogona();
  } 

  postPogonDetails(): void {
    this.pogonModelObj.oznakap = this.formValue.value.oznakap;

    this.service.addPogon(this.pogonModelObj)
    .subscribe(res => {
      this.notification.success(':: Added successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllPogona();
    }, 
    err => {
      alert("Something went wrong");
    })
  }

  getAllPogona() {
    this.service.getAllPogona().subscribe(pogoni => {
      this.pogoni = pogoni;
    });
  }

  deletePogon(row : any) {
    if(confirm('Are you sure you want to delete')) {
      this.service.deletePogon(row.pogonid)
    .subscribe(res => {
      this.notification.warn(':: Deleted successfully');
      this.getAllPogona();
    }); 
    }
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.pogonModelObj.pogonid = row.pogonid;
    this.formValue.controls['oznakap'].setValue(row.oznakap);
    this.heading = "Update pogon";
  }

  updatePogonDetails() {
    this.pogonModelObj.oznakap = this.formValue.value.oznakap;
    this.service.updatePogon(this.pogonModelObj)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllPogona();
    });
  }

  clickAddPogon() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.heading = "Add pogon";
  }

  key: string = 'id';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  
}
