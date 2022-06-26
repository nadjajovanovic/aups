import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Radnik } from 'src/app/models/radnik';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RadnikService } from 'src/app/services/radnik.service';
import { DialogRadnikComponent } from '../dialog/dialog-radnik/dialog-radnik.component';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {

  p: number = 1;
  searchedKeyword: string;
  displayedColumns: string[] = ['radnikid', 'ime', 'prezime', 'jmbg', 'username', 'password', 'pogon', 'radnomesto', 'action'];
  dataSource!: MatTableDataSource<Radnik>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: RadnikService,
    private notification : NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAllRadnike();
  }


  getAllRadnike() {
    this.service.getAllRadnike().subscribe({
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
    const dialogRef = this.dialog.open(DialogRadnikComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllRadnike();
      }
        
    });
  }

  editRadnika(row: any) {
    this.dialog.open(DialogRadnikComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllRadnike();
      }
    })
  }

  deleteRadnika(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteRadnik(row.radnikid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllRadnike();
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
