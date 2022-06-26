import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RadnoMesto } from 'src/app/models/radnomesto';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RadnoMestoService } from 'src/app/services/radnomesto.service';
import { DialogRadnaMestaComponent } from '../dialog/dialog-radna-mesta/dialog-radna-mesta.component';

@Component({
  selector: 'app-radno-mesto',
  templateUrl: './radno-mesto.component.html',
  styleUrls: ['./radno-mesto.component.css']
})
export class RadnoMestoComponent implements OnInit {

  formValue!: FormGroup;
  radnoMestoModelObj : RadnoMesto = new RadnoMesto();
  radnihMesta: RadnoMesto[] = [];
  showAdd!: boolean;
  showUpdate!: boolean;
  p: number = 1;
  searchedKeyword: string;
  heading: string;
  displayedColumns: string[] = ['radnomestoid', 'nazivrm', 'action'];
  dataSource!: MatTableDataSource<RadnoMesto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( private service: RadnoMestoService,
    private notification : NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.getAllRadnihMesta();
  } 

  getAllRadnihMesta() {
    this.service.getAllRadnaMesta().subscribe({
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
    const dialogRef = this.dialog.open(DialogRadnaMestaComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save'){ 
         this.getAllRadnihMesta();
      }
        
    });
  }

  editRadnoMesto(row: any) {
    this.dialog.open(DialogRadnaMestaComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllRadnihMesta();
      }
    })
  }

  deleteRadnoMesto(row: any) {
    this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.service.deleteRadnoMesto(row.radnomestoid).subscribe
        (
          data => {
            this.notification.warn(":: Deleted successfully");
            this.getAllRadnihMesta();
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
