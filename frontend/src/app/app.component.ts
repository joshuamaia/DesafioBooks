import { Component } from '@angular/core';
import { AuthService } from './layout/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Desafio Hive Cloud';
  constructor(public authService: AuthService) {}
}
