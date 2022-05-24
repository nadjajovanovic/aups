import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Transport } from 'src/app/models/transport';
import { VrstaTransporta } from 'src/app/models/vrstatransporta';
import { NotificationService } from 'src/app/services/notification.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TransportService } from 'src/app/services/transport.service';
import { VrstaTransportaService } from 'src/app/services/vrstatransporta.service';
import { DialogTransportComponent } from '../dialog/dialog-transport/dialog-transport.component';

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
  selectedVrsta: number;
  /*displayedColumns: string[] = ['transportid', 'datumt', 'lokacija', 'vrstatransporta', 'action'];
  dataSource!: MatTableDataSource<Transport>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;*/

  constructor(private formBuilder :  FormBuilder,
    private service: TransportService,
    private fkService: VrstaTransportaService,
    private notification : NotificationService, 
    private dialog:  MatDialog) {

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
  
  /*getAllTransporte() {
   this.service.getAllTransporte().subscribe({
     next:(res) => {
       this.dataSource = new MatTableDataSource(res);

       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     },
     error: (err) => {
       alert("Error while fetching data");
     }
   })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogTransportComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1){ 
         this.getAllTransporte();
      }
        
    });
  }

  editTransport(row: any) {
    this.dialog.open(DialogTransportComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllTransporte();
      }
    })
  }

  deleteTransport(row: any) {
    this.service.deleteTransport(id).subscribe({
      next:(res) => {
        alert("Transport deleted");
      },
     error: (err) => {
       alert("Error while fetching data");
     }
    })
    if(confirm('Are you sure you want to delete')) {
      this.service.deleteTransport(row.transportid);
      alert("Deleted");
      this.getAllTransporte();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }*/

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
    /*this.service.addTransport(this.formValue.value);
    this.notification.success(':: Added successfully');
    let ref = document.getElementById('cancel');
    ref?.click();
    this.formValue.reset();
    this.getAllTransporte();*/

  }

  getAllTransporte() {
    this.service.getAllTransporte().subscribe(transporti => {
      this.transporti = transporti;
      console.log(transporti);
    });
    
  }

  deleteTransport(row : any) {
    if(confirm('Are you sure you want to delete')) {
      this.service.deleteTransport(row.transportid)
    .subscribe(_res => {
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
    .subscribe(_res => {
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

  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id == b.id;
  }


  onSubmit() {
    console.log(this.formValue.value);
  }

  selectChangeHandler (event: any) {
    this.selectedVrsta = event.target.value;
  }

}
