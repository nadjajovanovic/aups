import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Mesto } from 'src/app/models/mesto';
import { MestoService } from 'src/app/services/mesto.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-mesta',
  templateUrl: './mesta.component.html',
  styleUrls: ['./mesta.component.css']
})
export class MestaComponent implements OnInit {

  formValue!: FormGroup;
  mestaModelObj : Mesto = new Mesto();
  mesta: Mesto[] = [];
  showAdd!: boolean;
  showUpdate!: boolean;
  nazivm: any;
  p: number = 1;
  searchedKeyword: string;
  heading: string;

  constructor(private formBuilder :  FormBuilder,
    private service: MestoService,
    private notification : NotificationService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nazivm: [''],
      postanskibroj: ['']
    });
    this.getAllMesta();
  } 

  postMestoDetails(): void {
    this.mestaModelObj.nazivm = this.formValue.value.nazivm;
    this.mestaModelObj.postanskibroj = this.formValue.value.postanskibroj;

    this.service.addMesto(this.mestaModelObj)
    .subscribe(res => {
      this.notification.success(':: Added successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllMesta();
    }, 
    err => {
      alert("Something went wrong");
    })
  }

  getAllMesta() {
    this.service.getAllMesta().subscribe(mesta => {
      this.mesta = mesta;
    });
  }

  deleteMesto(row : any) {
    if(confirm('Are you sure you want to delete')) {
      this.service.deleteMesto(row.mestoid)
    .subscribe(res => {
      this.notification.warn(':: Deleted successfully');
      this.getAllMesta();
    }); 
    }
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.mestaModelObj.mestoid = row.mestoid;
    this.formValue.controls['nazivm'].setValue(row.nazivm);
    this.formValue.controls['postanskibroj'].setValue(row.postanskibroj);
    this.heading = "Update mesto";
  }

  updateMestoDetails() {
    this.mestaModelObj.nazivm = this.formValue.value.nazivm;
    this.mestaModelObj.postanskibroj = this.formValue.value.postanskibroj;
    this.service.updateMesto(this.mestaModelObj)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllMesta();
    });
  }

  clickAddMesto() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.heading = "Add mesto";
  }

  key: string = 'id';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
