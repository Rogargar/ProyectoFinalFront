import swal  from 'sweetalert';
import { EmailService } from './../../../../services/email.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';

/**
 * Page for contact
 *
 * @export
 * @class ContactComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  user: UserModel;
  formGroup;

  /**
   * Creates an instance of ContactComponent.
   * @param {UserService} _userService
   * @param {FormBuilder} formBuilder
   * @param {EmailService} _emailService
   * @memberof ContactComponent
   */
  constructor(private _userService: UserService, private formBuilder: FormBuilder, private _emailService: EmailService) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Get User for contact
   *
   * @memberof ContactComponent
   */
  getUser() {
    this._userService.getUserById(this._userService.getToken()).subscribe((data: UserModel) => {
      this.user = data;
      this.newFomGroup();
    });

  }

  /**
   * Create form for contact
   *
   * @memberof ContactComponent
   */
  newFomGroup() {
    this.formGroup = this.formBuilder.group({
      subject: new FormControl(this.user.name+' quiere contacta contigo'),
      email: new FormControl(this.user.email),
      content:new FormControl(null,Validators.required)
    }
    );
  }

  /**
   * Send email whit content
   *
   * @memberof ContactComponent
   */
  sendEmail() {
    this._emailService.sendEmail(this.formGroup.value).subscribe(data => {
      swal('Mensaje enviado con exito','', 'success');
      this.getUser();
    })

  }

  /**
   * Cancel email, and remove this content
   *
   * @memberof ContactComponent
   */
  cancel() {
    this.getUser();
  }

}
