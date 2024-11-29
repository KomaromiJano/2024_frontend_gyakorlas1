import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

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

}
