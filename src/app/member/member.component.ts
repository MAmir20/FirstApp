import { Component } from '@angular/core';
import { Member } from './../../models/Member';
import { OnInit } from '@angular/core';
import { MemberService } from './../../services/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
  // Injection du service MemberService
  // Injection de dependance permet d'utiliser les fonctions du service dans le component
  // en creant une instance de ce service dans le constructeur du component
  constructor(private MS: MemberService) {}

  displayedColumns: string[] = [
    'id',
    'cin',
    'name',
    'cv',
    'type',
    'createdDate',
    'actions',
  ];
  dataSource: Member[] = [];

  fetchMembers(): void {
    this.MS.getAllMembers().subscribe((response) => {
      this.dataSource = response;
    });
  }

  ngOnInit(): void {
    // Appeler la fonction getAllMembers() du service MemberService
    // Attendre la reponse et affecter le resultat à la variable dataSource
    this.fetchMembers();
  }
  delete(id: string): void {
    this.MS.deleteMember(id).subscribe(() => {
      this.fetchMembers();
    });
  }
}
