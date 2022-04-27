import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Transport } from 'src/app/models/transport';
import { VrstaTransporta } from 'src/app/models/vrstatransporta';
import { NotificationService } from 'src/app/services/notification.service';
import { TransportService } from 'src/app/services/transport.service';
import { VrstaTransportaService } from 'src/app/services/vrstatransporta.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  formValue!: FormGroup;
  transportModelObj : Transport = new Transport();
  transporti: Transport[] = [];
  vrsteTransporta: VrstaTransporta[] = []
  showAdd!: boolean;
  showUpdate!: boolean;
  p: number = 1;
  searchedKeyword: string;
  heading: string;

  constructor(private formBuilder :  FormBuilder,
    private service: TransportService,
    private fkService: VrstaTransportaService,
    private notification : NotificationService) {

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      datumt: [''],
      lokacija: [''],
      vrstatransporta: ['']
    });
    this.getAllTransporte();
    this.fkService.getAllVrsteTransporta().subscribe(vrsteTransporta =>
      this.vrsteTransporta = vrsteTransporta
    );
  } 
  

  postTransportaDetails(): void {
    this.transportModelObj.datumt = this.formValue.value.datumt;
    this.transportModelObj.lokacija = this.formValue.value.lokacija;
    this.transportModelObj.vrstatransporta = this.formValue.value.vrstatransporta;

    this.service.addTransport(this.transportModelObj)
    .subscribe(res => {
      this.notification.success(':: Added successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllTransporte();
    }, 
    err => {
      alert("Something went wrong");
    })
  }

  getAllTransporte() {
    this.service.getAllTransporte().subscribe(transporti => {
      this.transporti = transporti;
    });
  }

  deleteTransport(row : any) {
    if(confirm('Are you sure you want to delete')) {
      this.service.deleteTransport(row.transportid)
    .subscribe(res => {
      this.notification.warn(':: Deleted successfully');
      this.getAllTransporte();
    }); 
    }
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.transportModelObj.transportid = row.transportid;
    this.formValue.controls['datumt'].setValue(row.datumt);
    this.formValue.controls['lokacija'].setValue(row.lokacija);
    this.formValue.controls['vrstatransporta'].setValue(row.vrstatransporta);
    this.heading = "Update transport";
  }

  updateTransportDetails() {
    this.transportModelObj.datumt = this.formValue.value.datumt;
    this.transportModelObj.lokacija = this.formValue.value.lokacija;
    this.transportModelObj.vrstatransporta = this.formValue.value.vrstatransporta;
    this.service.updateTransport(this.transportModelObj)
    .subscribe(res => {
      this.notification.success(':: Updated successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllTransporte();
    });
  }

  clickAddTransport() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.heading = "Add transport";
  }

  key: string = 'id';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
