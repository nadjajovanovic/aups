import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pogon } from 'src/app/models/pogon';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PogonService } from 'src/app/services/pogon.service';
import { DialogPogonComponent } from '../dialog/dialog-pogon/dialog-pogon.component';

@Component({
  selector: 'app-pogon',
  templateUrl: './pogon.component.html',
  styleUrls: ['./pogon.component.css']
})
export class PogonComponent implements OnInit {
  
  p: number = 1;
  searchedKeyword: string;
  heading: string;
  displayedColumns: string[] = ['pogonid', 'oznakap', 'action'];
  dataSource!: MatTableDataSource<Pogon>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private service: PogonService,
    private notification : NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.getAllPogona();
  } 

  getAllPogona() {
    this.service.getAllPogona().subscribe({
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
    const dialogRef = this.dialog.open(DialogPogonComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllPogona();
      }
        
    });
  }

  editPogon(row: any) {
    this.dialog.open(DialogPogonComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllPogona();
      }
    })
  }

  deletePogon(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deletePogon(row.pogonid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllPogona();
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
