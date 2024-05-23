import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {


  
  authServices = inject(AuthService);
  isLoggedIn:boolean = false;

  ngOnInit(): void {
    this.authServices.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = this.authServices.isLoggedIn();
    });
  }

  logout() {
    localStorage.removeItem('user_id');
    this.authServices.isLoggedIn$.next(false);
    }

}


