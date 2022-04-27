import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sastojci } from 'src/app/models/sastojci';
import { NotificationService } from 'src/app/services/notification.service';
import { SastojciService } from 'src/app/services/sastojci.service';

@Component({
  selector: 'app-sastojci',
  templateUrl: './sastojci.component.html',
  styleUrls: ['./sastojci.component.css']
})
export class SastojciComponent implements OnInit {

  formValue!: FormGroup;
  sastojciModelObj : Sastojci = new Sastojci();
  sastojci: Sastojci[] = [];
  showAdd!: boolean;
  showUpdate!: boolean;
  p: number = 1;
  searchedKeyword: string;
  heading: string;

  constructor(private formBuilder :  FormBuilder,
    private service: SastojciService,
    private notification : NotificationService) {

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nazivs: ['']
    });
    this.getAllSastojke();
  } 

  postSastojciDetails(): void {
    this.sastojciModelObj.nazivs = this.formValue.value.nazivs;

    this.service.addSastojak(this.sastojciModelObj)
    .subscribe(res => {
      this.notification.success(':: Added successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllSastojke();
    }, 
    err => {
      alert("Something went wrong");
    })
  }

  getAllSastojke() {
    this.service.getAllSastojke().subscribe(sastojci => {
      this.sastojci = sastojci;
    });
  }

  deleteSastojak(row : any) {
    if(confirm('Are you sure you want to delete')) {
      this.service.deleteSastojak(row.sastojciid)
    .subscribe(res => {
      this.notification.warn(':: Deleted successfully');
      this.getAllSastojke();
    }); 
    }
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.sastojciModelObj.sastojciid = row.sastojciid;
    this.formValue.controls['nazivs'].setValue(row.nazivs);
    this.heading = "Update sastojak";
  }

  updateSastojciDetails() {
    this.sastojciModelObj.nazivs = this.formValue.value.nazivs;
    this.service.updateSastojak(this.sastojciModelObj)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllSastojke();
    });
  }

  clickAddSastojak() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.heading = "Add sastojak";
  }

  key: string = 'id';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
