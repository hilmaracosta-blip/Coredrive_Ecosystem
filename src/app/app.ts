import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <- essa linha costuma ser o que falta
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {}