import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor( private fb: FormBuilder, 
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group( {
      name: [ '', Validators.required ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ],
    });
  }

  createUser() {

    if ( this.registerForm.invalid ) { return; }

    Swal.fire({
      title: 'Please wait!',
      onBeforeOpen: () => {
        Swal.showLoading();
      } });


    const { name, email, password } = this.registerForm.value;
    this.authService.createUser( name, email, password )
      .then( credentials => {
        console.log( credentials );
        Swal.close();
        this.router.navigate(['/'] );
      })
      .catch ( err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      } );

  }

}
