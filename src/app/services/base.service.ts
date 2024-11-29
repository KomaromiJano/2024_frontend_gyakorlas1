import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  peoplesRef: AngularFireList<any>

  constructor(private db: AngularFireDatabase) {
    this.peoplesRef = db.list("people")
  }

  getPeoples() {
    return this.peoplesRef
  }

  // Egy ember adatainak frissítése  // Egy ember adatainak frissítése, Observable-t ad vissza
  updatePeople(key: string, data: any): Observable<void> {
    return from(this.peoplesRef.update(key, data));  // from() biztosítja, hogy Observable-t kapj
  }

  // Új ember hozzáadása
  addPeople(data: any): Observable<any> {
    return from(this.peoplesRef.push(data)).pipe();
  }
  

  // Egy ember törlése
  deletePeople(key: string): Observable<void> {
    return from(this.peoplesRef.remove(key));
  }

}
