import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Skladiste } from 'src/app/models/skladiste';
import { DialogService } from 'src/app/services/dialog.service';
import { MestoService } from 'src/app/services/mesto.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SkladisteService } from 'src/app/services/skladiste.service';
import { DialogSkladisteComponent } from '../dialog/dialog-skladiste/dialog-skladiste.component';

@Component({
  selector: 'app-skladiste',
  templateUrl: './skladiste.component.html',
  styleUrls: ['./skladiste.component.css']
})
export class SkladisteComponent implements OnInit {

  showAdd!: boolean;
  showUpdate!: boolean;
  p: number = 1;
  searchedKeyword: string;
  displayedColumns: string[] = ['skladisteid', 'oznakas', 'mesto', 'radnik', 'sastojci', 'action'];
  dataSource!: MatTableDataSource<Skladiste>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: SkladisteService,
    private notification : NotificationService, 
    private dialog:  MatDialog,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.getAllSkladista();
  } 
  
  getAllSkladista() {
   this.service.getAllSkladista().subscribe({
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
    const dialogRef = this.dialog.open(DialogSkladisteComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllSkladista();
      }
        
    });
  }

  editSkladiste(row: any) {
    this.dialog.open(DialogSkladisteComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllSkladista();
      }
    })
  }

  deleteSkladiste(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteSkladiste(row.skladisteid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllSkladista();
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
