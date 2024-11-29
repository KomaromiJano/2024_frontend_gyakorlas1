import { Component } from '@angular/core';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.component.html',
  styleUrl: './peoples.component.scss'
})
export class PeoplesComponent {

  peoples:any

  constructor(private base:BaseService){
    this.base.getPeoples().valueChanges().subscribe(
      (res)=> this.peoples=res
    )
  }

}
