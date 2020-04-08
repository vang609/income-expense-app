import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [ '', Validators.required ],
    });
  }

  loginUser() {
    if ( this.loginForm.invalid ) { return; }

    Swal.fire({
      title: 'Please wait!',
      onBeforeOpen: () => {
        Swal.showLoading();
      } });

    const { email, password } = this.loginForm.value;
    this.authService.loginUser( email, password )
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
