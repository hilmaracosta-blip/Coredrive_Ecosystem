import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FrotaService } from '../../../../shared/services/frota';
import type { Bateria } from '../../../../shared/services/frota';
import { AuthService } from '../../../../shared/services/auth';

@Component({
  selector: 'app-dashboard-reciclagem',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-recicladora.html',
  styleUrl: './dashboard-recicladora.scss'
})
export class DashboardReciclagemComponent {
  dataAtualizacao = new Date().toLocaleDateString('pt-BR');
  abaAtiva: 'rastreio' = 'rastreio';

  statusDisponiveis = [
    'Recebido',
    'Triado',
    'Destinado a Segunda Vida',
    'Expedido / Reuso',
    'Desativado',
    'Triturado',
    'Refinado',
    'Concluído'
  ];

  baterias: Bateria[];

  constructor(private router: Router, private frota: FrotaService, private authService: AuthService) {
    this.baterias = this.frota.baterias;
  }

  selecionarAba(aba: 'rastreio') {
    this.abaAtiva = aba;
  }

  bateriasParaReciclagem(): Bateria[] {
    return this.baterias.filter(b => b.idRecicladora);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
