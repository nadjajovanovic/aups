import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mesto } from 'src/app/models/mesto';
import { DialogService } from 'src/app/services/dialog.service';
import { MestoService } from 'src/app/services/mesto.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogMestaComponent } from '../dialog/dialog-mesta/dialog-mesta.component';


@Component({
  selector: 'app-mesta',
  templateUrl: './mesta.component.html',
  styleUrls: ['./mesta.component.css']
})
export class MestaComponent implements OnInit {

  p: number = 1;
  searchedKeyword: string;
  displayedColumns: string[] = ['mestoid', 'nazivm', 'postanskibroj', 'action'];
  dataSource!: MatTableDataSource<Mesto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: MestoService,
    private notification : NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAllMesta();
  } 

  getAllMesta() {
    this.service.getAllMesta().subscribe({
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
    const dialogRef = this.dialog.open(DialogMestaComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllMesta();
      }
        
    });
  }

  editMesto(row: any) {
    this.dialog.open(DialogMestaComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllMesta();
      }
    })
  }

  deleteMesto(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteMesto(row.mestoid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllMesta();
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
