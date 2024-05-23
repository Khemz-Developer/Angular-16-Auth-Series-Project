import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export default class ForgetPasswordComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  forgetPasswordForm!: FormGroup;

  ngOnInit(): void {
    this.forgetPasswordForm= this.fb.group({
      
      email:['',Validators.compose([Validators.required,Validators.email])],
      
    });
  }
  
  submit(){
  
    this.authService.sendEmailService(this.forgetPasswordForm.value.email).subscribe((res)=>{
      alert(res.message); 
      this.forgetPasswordForm.reset();
     
  },
  (err)=>{
    alert(err.error.message);
  })
}
}