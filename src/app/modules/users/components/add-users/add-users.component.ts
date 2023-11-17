import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../_services/users.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  @Output() usersE: EventEmitter<any> = new EventEmitter();

  isLoading$;
  isLoading = false;

  formGroup: FormGroup;

  constructor(
    public fb:FormBuilder,
    public _userService: UsersService,
    public modal:NgbActiveModal,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
    this.loadForm();
  }
  loadForm(){
    this.formGroup = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      surname: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      email:[null, Validators.compose([Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(250)])], 
      type_user: [2],
      role_id: ['1'],
      state: '1',
      password: [null, Validators.compose([Validators.required, Validators.maxLength(250)])],
      rpassword: [null, Validators.compose([Validators.required, Validators.maxLength(250)])],
    });
  }

  save(){
    if(this.formGroup.value.password != this.formGroup.value.rpassword){
      this.toaster.open(NoticyAlertComponent, {text:`danger-'Upps! Necesitas digitas las contraseñas iguales.'`} )
      return;
    }

    this._userService.register(this.formGroup.value).subscribe((resp:any) =>{
      console.log(resp);
      if(resp.message == 400){
        this.toaster.open(NoticyAlertComponent, {text:`warning-'Upps! El Usuario Ya Existe.'`} )
      return;
      }else{
        this.toaster.open(NoticyAlertComponent, {text:`primary-'Upps! El Usuario Se Creo Satisfactoriamente.'`} )
        this.modal.close();
        this.usersE.emit(resp.user);
        return;
      }
    })
  }
  
  isControlValid(controlName: string): boolean{
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
  isControlInvalid(controlName: string): boolean{
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
  controlHasError(validation: string, controlName: string){
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
  isControlTouched(controlName: string): boolean{
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }  
}
