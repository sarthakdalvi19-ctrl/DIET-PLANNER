import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar.component';
import { AuthService } from './auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  title = signal('diet');

  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  private intervalId: any;

  ngOnInit() {
    this.authService.init();
    // Reminders every 5 min
    this.intervalId = setInterval(() => {
      this.snackBar.open('Reminder: Time for water or meal!', 'Close', { duration: 3000 });
    }, 300000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
