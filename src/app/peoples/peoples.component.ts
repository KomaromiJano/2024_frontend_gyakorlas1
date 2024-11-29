import { Component } from '@angular/core';
import { BaseService } from '../services/base.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.component.html',
  styleUrl: './peoples.component.scss'
})
export class PeoplesComponent {

  modal:boolean = false;

  modal_type:string = "edit";

  peoples:any = []

  temp_people:any = {}

  constructor(private base:BaseService){
    this.base.getPeoples().snapshotChanges().pipe(
      map(
        (changes)=>changes.map(
          (c)=>({key:c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(
      (res)=>this.peoples=res
    )
    this.modal = false;
  }

  openModal(data:any,type:string){
    this.modal = true;
    this.modal_type = type;
    this.temp_people = {...data};
  }

  closeModal(){
    this.modal = false;
    this.temp_people = {}
  }

  create(){
    this.base.addPeople(this.temp_people).subscribe(
      () => {
        console.log('A frissítése sikeres volt!');
        this.closeModal()
      },
      (error) => {
        console.error('Hiba a frissítéskor:', error);
      }
    )
  }

  update() {
    const index = this.peoples.findIndex((people: any) => people.key === this.temp_people.key);
  
    if (index !== -1) {
      // Az Observable használata esetén a subscribe() metódust kell hívni
      this.base.updatePeople(this.temp_people.key, this.temp_people).subscribe(
        () => {
          console.log('A frissítése sikeres volt!');
          this.closeModal()
        },
        (error) => {
          console.error('Hiba a frissítéskor:', error);
        }
      );
    }
  }
  
  remove(){
    const index = this.peoples.findIndex((people: any) => people.key === this.temp_people.key);
    if(index !== -1){
      this.base.deletePeople(this.temp_people.key).subscribe(
        () => {
          console.log('A törlés sikeres volt!');
          this.closeModal();
        },
        (error) => {
          console.error('Hiba a törléskor:', error);
        }
      )
    }
  }

}
