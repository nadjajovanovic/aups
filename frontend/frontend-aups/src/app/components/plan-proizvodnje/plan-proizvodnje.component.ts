import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlanProizvodnje } from 'src/app/models/planproizvodnje';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PlanProizvodnjeService } from 'src/app/services/planproizvodnje.service';
import { DialogPlanProizvodnjeComponent } from '../dialog/dialog-plan-proizvodnje/dialog-plan-proizvodnje.component';

@Component({
  selector: 'app-plan-proizvodnje',
  templateUrl: './plan-proizvodnje.component.html',
  styleUrls: ['./plan-proizvodnje.component.css']
})
export class PlanProizvodnjeComponent implements OnInit {

  showAdd!: boolean;
  showUpdate!: boolean;
  p: number = 1;
  searchedKeyword: string;
  displayedColumns: string[] = ['planproizvodnjeid', 'datum', 'kolicina', 'napomena', 'oznakapp', 'radnik', 'transport', 'action'];
  dataSource!: MatTableDataSource<PlanProizvodnje>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private service: PlanProizvodnjeService,
    private notification : NotificationService, 
    private dialog:  MatDialog,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAllPlanaProizvodnje();
  }

  getAllPlanaProizvodnje() {
    this.service.getAllPlanaProizvodnje().subscribe({
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
     const dialogRef = this.dialog.open(DialogPlanProizvodnjeComponent, {
       width: '30%'
     });
     dialogRef.afterClosed().subscribe(result => {
       if (result === 'save'){ 
          this.getAllPlanaProizvodnje();
       }
         
     });
   }
 
   editPlanProizvodnje(row: any) {
     this.dialog.open(DialogPlanProizvodnjeComponent, {
       width: '30%',
       data: row
     }).afterClosed().subscribe(val => {
       if(val === 'update') {
         this.getAllPlanaProizvodnje();
       }
     })
   }
 
   deletePlanProizvodnje(row: any) {
     this.dialogService.openConfirmationDialog('Are you sure you want to delete this record?')
     .afterClosed().subscribe(res => {
       if(res) {
         this.service.deletePlanProizvodnje(row.planproizvodnjeid).subscribe
         (
           data => {
             this.notification.warn(":: Deleted successfully");
             this.getAllPlanaProizvodnje();
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
