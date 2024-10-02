import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MemberService } from './../../services/member.service';
import { Member } from 'src/models/Member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  constructor(private MS: MemberService, private router:Router) {}
  form !:FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    //creation d'une nouvelle instance de Form et initialisation des attributs
    this.form = new FormGroup({
      cin: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      cv: new FormControl(null, Validators.required),
    });
  }
  sub(){
    const x:Member = {...this.form.value,createdDate:new Date().toISOString()};
    this.MS.addMember(x).subscribe(()=>{
      this.router.navigate(['/']);
    });
  }
}
