import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../share/ui.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ],
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor( private fb: FormBuilder, 
               private authService: AuthService,
               private store: Store<AppState>,
               private router: Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group( {
      name: [ '', Validators.required ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ],
    });
    this.uiSubscription = this.store.select('ui')
                              .subscribe( ui => this.loading = ui.isLoading );
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  createUser() {

    if ( this.registerForm.invalid ) { return; }

    this.store.dispatch( ui.isLoading() );

    // Swal.fire({
    //   title: 'Please wait!',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   } });


    const { name, email, password } = this.registerForm.value;
    this.authService.createUser( name, email, password )
      .then( credentials => {
        console.log( credentials );
        // Swal.close();
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/'] );
      })
      .catch ( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      } );

  }

}
