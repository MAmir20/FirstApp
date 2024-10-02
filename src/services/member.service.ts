import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../models/Member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  // Fonctions qui representent les actions CRUD

  constructor(private http:HttpClient) { }
  getAllMembers():Observable<Member[]>{
    return this.http.get<Member[]>('http://localhost:3000/members');
  }
  getMemberById(id:string):Observable<Member>{
    return this.http.get<Member>('http://localhost:3000/members/'+id);
  }
  addMember(member:Member):Observable<void>{
    return this.http.post<void>('http://localhost:3000/members',member);
  }
  updateMember(member:Member):Observable<Member>{
    return this.http.put<Member>('http://localhost:3000/members/'+member.id,member);
  }
  deleteMember(id:string):Observable<Member>{
    return this.http.delete<Member>('http://localhost:3000/members/'+id);
  }
}
