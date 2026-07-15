import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FrotaService } from '../../../../shared/services/frota';
import type { Bateria } from '../../../../shared/services/frota';
import { AuthService } from '../../../../shared/services/auth';

@Component({
  selector: 'app-dashboard-manufacturer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-montadora.html',
  styleUrl: './dashboard-montadora.scss'
})
export class DashboardMontadoraComponent {
  dataAtualizacao = new Date().toLocaleDateString('pt-BR');
  abaAtiva: 'telemetria' | 'autorizadas' | 'coleta' = 'telemetria';
  baterias: Bateria[];

  recicladorasDisponiveis = ['ReNova', 'Ciclo+', 'EcoVira', 'Verdi'];
  selecoesRecicladora: Record<string, string> = {};
  datasColetaInput: Record<string, string> = {};

  certificadoAberto = false;
  bateriaCertificado: Bateria | null = null;

  constructor(private router: Router, private frota: FrotaService, private authService: AuthService) {
    this.baterias = this.frota.baterias;
  }

  selecionarAba(aba: 'telemetria' | 'autorizadas' | 'coleta') {
    this.abaAtiva = aba;
  }

  tabelaLotes = [
    { lote: 8, autorizada: 'Autorizada Norte' },
    { lote: 9, autorizada: 'Autorizada Sul' },
    { lote: 10, autorizada: 'Autorizada Leste' },
    { lote: 11, autorizada: 'Autorizada Oeste' }
  ];

  alertasAutorizadaSul = [
    { chassi: 'CH-101', serieBat: 'BAT-501', tensao: 350, temperatura: 25, capacidade: 55, ciclos: 1200, status: 'NORMAL', statusClass: 'normal', acao: 'Nenhuma ação necessária' },
    { chassi: 'CH-102', serieBat: 'BAT-502', tensao: 400, temperatura: 35, capacidade: 60, ciclos: 2100, status: 'ATENÇÃO', statusClass: 'atencao', acao: 'Agendar inspeção preventiva' },
    { chassi: 'CH-104', serieBat: 'BAT-504', tensao: 230, temperatura: 40, capacidade: 55, ciclos: 1400, status: 'CRÍTICO', statusClass: 'critico', acao: 'Contatar cliente com urgência' },
    { chassi: 'CH-109', serieBat: 'BAT-509', tensao: 450, temperatura: 49, capacidade: 60, ciclos: 2100, status: 'CRÍTICO', statusClass: 'critico', acao: 'Contatar cliente com urgência' }
  ];

  getTotalPorStatus(status: string): number {
    return this.baterias.filter(b => b.status === status).length;
  }

  bateriasAguardandoColeta(): Bateria[] {
    return this.baterias.filter(b => b.serieBatSaida && !b.idRecicladora);
  }

  temColetaRegistrada(): boolean {
    return this.baterias.some(b => b.idRecicladora);
  }

  emitirOSColeta(bateria: Bateria) {
    const recicladora = this.selecoesRecicladora[bateria.chassi];
    const dataColeta = this.datasColetaInput[bateria.chassi];

    if (!recicladora) {
      alert('Selecione uma recicladora antes de emitir a OS.');
      return;
    }
    if (!dataColeta) {
      alert('Informe a data de coleta antes de emitir a OS.');
      return;
    }

    const numeroOS = `OS-COL-${bateria.chassi.replace(/\D/g, '')}`;

    bateria.idRecicladora = recicladora;
    bateria.osColeta = numeroOS;
    bateria.localColeta = bateria.idAutorizada;
    bateria.dataColeta = dataColeta;

    alert(`Ordem de serviço ${numeroOS} emitida!\nRecicladora: ${recicladora}\nLocal de coleta: ${bateria.localColeta}\nData agendada: ${dataColeta}`);
  }

  podeEmitirCertificado(b: Bateria): boolean {
    return b.statusColeta === 'Concluído';
  }

  abrirCertificado(b: Bateria) {
    this.bateriaCertificado = b;
    this.certificadoAberto = true;
  }

  fecharCertificado() {
    this.certificadoAberto = false;
    this.bateriaCertificado = null;
  }

  imprimirCertificado() {
    window.print();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}