import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VrstaTransporta } from 'src/app/models/vrstatransporta';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { VrstaTransportaService } from 'src/app/services/vrstatransporta.service';
import { DialogVrstaTransportaComponent } from '../dialog/dialog-vrsta-transporta/dialog-vrsta-transporta.component';

@Component({
  selector: 'app-vrsta-transporta',
  templateUrl: './vrsta-transporta.component.html',
  styleUrls: ['./vrsta-transporta.component.css']
})
export class VrstaTransportaComponent implements OnInit {

  p: number = 1;
  searchedKeyword: string;
  heading: string;
  displayedColumns: string[] = ['vrstatransportaid', 'nazivvt', 'action'];
  dataSource!: MatTableDataSource<VrstaTransporta>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: VrstaTransportaService,
    private notification : NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.getAllVrsteTransporta();
  } 

  getAllVrsteTransporta() {
    this.service.getAllVrsteTransporta().subscribe({
      next: (res) => {
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
    const dialogRef = this.dialog.open(DialogVrstaTransportaComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllVrsteTransporta();
      }
        
    });
  }

  editVrstuTransporta(row: any) {
    this.dialog.open(DialogVrstaTransportaComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllVrsteTransporta();
      }
    })
  }

  deleteVrstuTransporta(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteVrstuTransporta(row.vrstatransportaid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllVrsteTransporta();
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
