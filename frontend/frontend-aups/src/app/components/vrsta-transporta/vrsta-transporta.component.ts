import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VrstaTransporta } from 'src/app/models/vrstatransporta';
import { NotificationService } from 'src/app/services/notification.service';
import { VrstaTransportaService } from 'src/app/services/vrstatransporta.service';

@Component({
  selector: 'app-vrsta-transporta',
  templateUrl: './vrsta-transporta.component.html',
  styleUrls: ['./vrsta-transporta.component.css']
})
export class VrstaTransportaComponent implements OnInit {

  formValue!: FormGroup;
  vrsteTransportaModelObj : VrstaTransporta = new VrstaTransporta();
  vrstaTransporta: VrstaTransporta[] = [];
  showAdd!: boolean;
  showUpdate!: boolean;
  p: number = 1;
  searchedKeyword: string;
  heading: string;

  constructor(private formBuilder :  FormBuilder,
    private service: VrstaTransportaService,
    private notification : NotificationService) {

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nazivvt: ['']
    });
    this.getAllVrsteTransporta();
  } 

  postVrsteTransportaDetails(): void {
    this.vrsteTransportaModelObj.nazivvt = this.formValue.value.nazivvt;

    this.service.addVrstuTransporta(this.vrsteTransportaModelObj)
    .subscribe(res => {
      this.notification.success(':: Added successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllVrsteTransporta();
    }, 
    err => {
      alert("Something went wrong");
    })
  }

  getAllVrsteTransporta() {
    this.service.getAllVrsteTransporta().subscribe(vrstaTransporta => {
      this.vrstaTransporta = vrstaTransporta;
    });
  }

  deleteVrstuTransporta(row : any) {
    if(confirm('Are you sure you want to delete')) {
      this.service.deleteVrstuTransporta(row.vrstatransportaid)
    .subscribe(res => {
      this.notification.warn(':: Deleted successfully');
      this.getAllVrsteTransporta();
    }); 
    }
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.vrsteTransportaModelObj.vrstatransportaid = row.vrstatransportaid;
    this.formValue.controls['nazivvt'].setValue(row.nazivvt);
    this.heading = "Update vrstu transporta";
  }

  updateVrstuTransportaDetails() {
    this.vrsteTransportaModelObj.nazivvt = this.formValue.value.nazivvt;
    this.service.updateVrstuTransporta(this.vrsteTransportaModelObj)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllVrsteTransporta();
    });
  }

  clickAddVrstuTransporta() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.heading = "Add vrstu transporta";
  }

  key: string = 'id';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
