import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sastojci } from 'src/app/models/sastojci';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SastojciService } from 'src/app/services/sastojci.service';
import { DialogSastojciComponent } from '../dialog/dialog-sastojci/dialog-sastojci.component';

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
  displayedColumns: string[] = ['sastojciid', 'nazivs', 'action'];
  dataSource!: MatTableDataSource<Sastojci>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: SastojciService,
    private notification : NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.getAllSastojke();
  } 

  getAllSastojke() {
    this.service.getAllSastojke().subscribe({
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
    const dialogRef = this.dialog.open(DialogSastojciComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllSastojke();
      }
        
    });
  }

  editSastojak(row: any) {
    this.dialog.open(DialogSastojciComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllSastojke();
      }
    })
  }

  deleteSastojak(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteSastojak(row.sastojciid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllSastojke();
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
