import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage';
import { NotificationService } from 'src/app/services/notification';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  username : string;
  password : string;
  showForm : boolean = false;

  constructor(
      public storage : StorageService,
      public route : ActivatedRoute,
      public router : Router,
      public notify : NotificationService
  ){}

  ngOnInit() {
      this.storage.clearAll();
  }

  toggleForm(){
     if(!this.showForm) this.showForm = true
  }

  onSubmit(){
     if(this.username === "demo" && this.password === "demo"){
        this.storage.setLocal('authToken', true);
        this.notify.showSuccess('Login Successful','Authentication');
        this.router.navigateByUrl('/dashboard');
     }

     else {
       this.notify.showInfo('Incorrect Login Credential', 'Authentication')
     }
  }

}
