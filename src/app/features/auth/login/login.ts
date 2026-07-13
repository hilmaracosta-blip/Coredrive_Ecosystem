import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CarouselComponent } from '../../../shared/carousel/carousel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CarouselComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  tiposUsuario = [
    { label: 'Cliente', prefixo: 'CLI', rota: '/dashboard/cliente' },
    { label: 'Montadora', prefixo: 'MONT', rota: '/dashboard/montadora' },
    { label: 'Autorizada', prefixo: 'AUT', rota: '/dashboard/autorizada' },
    { label: 'Recicladora', prefixo: 'REC', rota: '/dashboard/recicladora' }
  ];

  tipoSelecionado = this.tiposUsuario[0];

  usuario = '';
  senha = '';
  aceiteLgpd = false;
  erroLogin = '';

  slides = [
    { image: 'Logistica_reversa.png', title: 'Logística Reversa' },
    { image: 'coleta_triagem.png', title: 'Coleta e Triagem' },
    { image: 'reciclagem.png', title: 'Reciclagem' },
    { image: 'transporte.png', title: 'Transporte' },
    { image: 'recicladora.png', title: 'Recicladora' },
    { image: 'reutilização.png', title: 'Reutilização' },
    { image: 'banco_baterias.png', title: 'Banco de Baterias' }
  ];

  constructor(private router: Router) {}

  selecionarTipo(tipo: any) {
    this.tipoSelecionado = tipo;
    this.erroLogin = '';
  }

  onSubmit() {
    if (!this.aceiteLgpd) return;

    const usuarioValido = this.usuario.toUpperCase() === this.tipoSelecionado.prefixo;
    const senhaValida = this.senha === '123456';

    if (usuarioValido && senhaValida) {
      this.router.navigate([this.tipoSelecionado.rota]);
    } else {
      this.erroLogin = 'Usuário ou senha inválidos.';
    }
  }
}