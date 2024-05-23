import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validators';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export default class ResetComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  resetForm!: FormGroup;
  token!: string;

  ngOnInit(): void {
    this.resetForm = this.fb.group(
      {
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        confirmPassword: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );
    this.activatedRoute.params.subscribe((params) => {
      this.token = params['token'];
      console.log(this.token);
    });
  }

  reset() {
    const resetObj = {
      password: this.resetForm.value.password,
      token: this.token,
    };
    this.authService.resetPasswordService(resetObj).subscribe(
      (res) => {
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }
}
