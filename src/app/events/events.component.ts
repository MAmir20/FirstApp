import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evenement } from 'src/models/Evenement';
import { EvenementService } from 'src/services/evenement.service';
import { ModalComponent } from '../modal/modal.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'dateDebut',
    'dateFin',
    'lieu',
    'actions',
  ];
  dataSource: MatTableDataSource<Evenement> =
    new MatTableDataSource<Evenement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  constructor(private ES: EvenementService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Appeler la fonction getAllMembers() du service MemberService
    // Attendre la reponse et affecter le resultat à la variable dataSource
    this.ES.getAllEvenement().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(id: string | null): void {
    // ouvrir le modal
    if (id != null) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { id };
      const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((data) => {
        if (data == null) {
          return;
        }
        this.ES.updateEvenement(data, id).subscribe(() => {
          this.ES.getAllEvenement().subscribe((response) => {
            this.dataSource.data = response;
          });
        });
      });
    } else {
      let dialogRef = this.dialog.open(ModalComponent);
      //recupere les données du modal
      dialogRef.afterClosed().subscribe((data) => {
        if (data == null) {
          return;
        }
        this.ES.addEvenement(data).subscribe(() => {
          this.ES.getAllEvenement().subscribe((response) => {
            this.dataSource.data = response;
          });
        });
      });
    }
  }

  // deleteEvent(id: string) {
  //   this.ES.deleteEvenement(id).subscribe(() => {
  //     this.ES.getAllEvenement().subscribe((response) => {
  //       this.dataSource.data = response;
  //     });
  //   });
  // }
}
