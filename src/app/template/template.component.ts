import { Component } from '@angular/core';
import { AuthService } from 'src/services/AuthService';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  constructor(private AS: AuthService) { }
  logout(): void {
    this.AS.doLogout().then(() => {
      window.location.reload();
    });
  }
  ngOnInit(): any {
    this.AS.getUserClaims().then((user) => {
      return user;
    });
  }
}
