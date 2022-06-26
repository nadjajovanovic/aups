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
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  
  showAdd!: boolean;
  showUpdate!: boolean;
  p: number = 1;
  searchedKeyword: string;
  displayedColumns: string[] = ['transportid', 'datumt', 'lokacija', 'vrstatransporta', 'action'];
  dataSource!: MatTableDataSource<Transport>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: TransportService,
    private notification : NotificationService, 
    private dialog:  MatDialog,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.getAllTransporte();
  } 
  
  getAllTransporte() {
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
      if (result === 'save'){ 
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
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteTransport(row.transportid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllTransporte();
          }
        )
        console.log(res);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
