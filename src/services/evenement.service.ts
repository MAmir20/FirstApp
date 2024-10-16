import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from 'src/models/Evenement';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  // Fonctions qui representent les actions CRUD

  constructor(private http:HttpClient) { }
  getAllEvenement():Observable<Evenement[]>{
    return this.http.get<Evenement[]>('http://localhost:3000/evt');
  }
  getEvenementById(id:string):Observable<Evenement>{
    return this.http.get<Evenement>(`http://localhost:3000/evt/${id}`);
  }
  addEvenement(event:Evenement):Observable<void>{
    return this.http.post<void>('http://localhost:3000/evt',event);
  }
  updateEvenement(event:Evenement, id:string):Observable<Evenement>{
    return this.http.put<Evenement>(`http://localhost:3000/evt/${id}`,event);
  }
  deleteEvenement(id:string):Observable<Evenement>{
    return this.http.delete<Evenement>('http://localhost:3000/evt/'+id);
  }
}
