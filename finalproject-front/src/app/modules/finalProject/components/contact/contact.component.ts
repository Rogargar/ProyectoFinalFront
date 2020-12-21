import swal  from 'sweetalert';
import { EmailService } from './../../../../services/email.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  user: UserModel;
  formGroup;

  constructor(private _userService:UserService, private formBuilder: FormBuilder,private _emailService:EmailService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._userService.getUserById(this._userService.getToken()).subscribe((data: UserModel) => {
      this.user = data;
      this.newFomGroup();
    });

  }

  newFomGroup() {
    this.formGroup = this.formBuilder.group({
      subject: new FormControl(this.user.name+' quiere contacta contigo'),
      email: new FormControl(this.user.email),
      content:new FormControl(null,Validators.required)
    }
    );
  }

  sendEmail() {
    this._emailService.sendEmail(this.formGroup.value).subscribe(data => {
      swal('Mensaje enviado con exito','', 'success');
      this.getUser();
    })

  }

  cancel() {
    this.getUser();
  }

}
