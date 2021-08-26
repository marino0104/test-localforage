import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as localforage from 'localforage';
import { UserInfoService } from './user-info.service';



@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  formArrayTest: any=[];

  constructor(public userService: UserInfoService) { }

  ngOnInit(): void {
    this.getServiceDummy();
    // this.localForageConfig()
  }

  localForageConfig(): void{
    localforage.config({
      driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
      name        : 'myApp',
      version     : 1.0,
      size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
      storeName   : 'testKey', // Should be alphanumeric, with underscores.
      description : 'test for probe the framework'
  });
  }

  formUserTest= new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    edad: new FormControl(null,[Validators.required, Validators.min(1), Validators.max(99)]),
    politicas: new FormControl(false, [Validators.requiredTrue])
  })
  onSubmit():void{
    localforage.getItem('testKey').then(res=>{
      console.info(res);
      this.formArrayTest=res;
    })
    this.formArrayTest.push(this.formUserTest.value);
    this.formUserTest.reset();
    localforage.setItem('testKey', this.formArrayTest);
  }

  getServiceDummy(): void{
    this.userService.getDummyServices('employees').subscribe(res=>{
      localforage.setItem('testDummyApi', res.data);
    })
  }

}
