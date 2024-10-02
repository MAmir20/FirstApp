import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MemberService } from './../../services/member.service';
import { Member } from 'src/models/Member';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  constructor(private MS: MemberService, private router:Router, private activatedRoute:ActivatedRoute) {}
  form !:FormGroup;
  ngOnInit(): void {
    // 1. recuperer id de la route active
    const idcourant = this.activatedRoute.snapshot.params['id'];
    console.log(idcourant);
    if(!!idcourant){
      // 2. if id existe et a une valeur => je suis dans edit
      this.MS.getMemberById(idcourant).subscribe((response) => {
        this.initForm(response)
      })
    } else {
      this.initForm();
    }
  }
  initForm(m:Member = {} as Member){
      //creation d'une nouvelle instance de Form et initialisation des attributs
      this.form = new FormGroup({
        cin: new FormControl(m.cin??null, Validators.required),
        name: new FormControl(m.name??null, Validators.required),
        type: new FormControl(m.type??null, Validators.required),
        cv: new FormControl(m.cv??null, Validators.required),
      });
    }
  sub(){
    const x:Member = {...this.form.value,createdDate:new Date().toISOString()};
    const idcourant = this.activatedRoute.snapshot.params['id'];
    console.log(idcourant);
    if(!!idcourant){
      const x:Member = {...this.form.value,createdDate:new Date().toISOString(), id:idcourant};
      this.MS.updateMember(x).subscribe(()=>{
        this.router.navigate(['/']);
      })
    } else {
      this.MS.addMember(x).subscribe(()=>{
        this.router.navigate(['/']);
      });
    }

  }
}
