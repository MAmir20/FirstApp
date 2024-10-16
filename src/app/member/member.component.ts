import { Component } from '@angular/core';
import { Member } from './../../models/Member';
import { OnInit } from '@angular/core';
import { MemberService } from './../../services/member.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  // Injection du service MemberService
  // Injection de dependance permet d'utiliser les fonctions du service dans le component
  // en creant une instance de ce service dans le constructeur du component
  constructor(private MS: MemberService, private dialog: MatDialog) {}

  displayedColumns: string[] = ['id', 'cin', 'name', 'cv', 'type', 'createdDate', 'actions'];
  dataSource : Member[]= [];

  ngOnInit():void{

    // Appeler la fonction getAllMembers() du service MemberService
    // Attendre la reponse et affecter le resultat à la variable dataSource
    this.MS.getAllMembers().subscribe((response)=>{
      this.dataSource = response;
    });
  }

  delete(id:string):void{
    // Lancer la boite de dialogue de confirmation
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe((response)=>{
      if(response){
        this.MS.deleteMember(id).subscribe((response)=>{
          this.MS.getAllMembers().subscribe((response)=>{
            this.dataSource = response;
          });
        });
      }
    });
    // Attendre la reponse et afficher un message de confirmation
  }
}
