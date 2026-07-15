import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FrotaService } from '../../../../shared/services/frota';
import type { Bateria } from '../../../../shared/services/frota';
import { ClientesService } from '../../../../shared/services/clientes';
import type { ClienteVeiculo } from '../../../../shared/services/clientes';
import { AtendimentoService } from '../../../../shared/services/atendimento';
import type { Atendimento, Autorizada } from '../../../../shared/services/atendimento';
import { AuthService } from '../../../../shared/services/auth';

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-cliente.html',
  styleUrl: './dashboard-cliente.scss'
})
export class DashboardClienteComponent {
  chassiCliente = 'CH-109';

  cliente: ClienteVeiculo | undefined;
  bateria: Bateria | undefined;
  atendimento: Atendimento | undefined;
  autorizadas: Autorizada[];

  agendamentoForm = { data: '', horario: '', autorizadaSelecionada: '', servico: 'Triagem' };

  constructor(
    private router: Router,
    private clientesService: ClientesService,
    private frota: FrotaService,
    private atendimentoService: AtendimentoService,
    private authService: AuthService
  ) {
    this.cliente = this.clientesService.getPorChassi(this.chassiCliente);
    this.bateria = this.frota.baterias.find(b => b.chassi === this.chassiCliente);
    this.atendimento = this.atendimentoService.getAtendimento(this.chassiCliente);
    this.autorizadas = this.atendimentoService.autorizadas;

    if (this.atendimento) {
      this.agendamentoForm = {
        data: this.atendimento.agendamentoAtual.data,
        horario: this.atendimento.agendamentoAtual.horario,
        autorizadaSelecionada: this.atendimento.agendamentoAtual.autorizada,
        servico: this.atendimento.agendamentoAtual.servico
      };
    }
  }

  getBateriaExibida() {
    if (this.atendimento?.concluido && this.atendimento.novaBateria) {
      return {
        serie: this.atendimento.novaBateria.serie,
        status: this.atendimento.novaBateria.status,
        statusClass: this.atendimento.novaBateria.statusClass,
        capacidade: this.atendimento.novaBateria.capacidade
      };
    }
    return {
      serie: this.bateria?.serieBat,
      status: this.bateria?.status,
      statusClass: this.bateria?.statusClass,
      capacidade: this.bateria?.capacidade
    };
  }

  onAutorizadaChange() {
    // Só para atualizar o endereço exibido junto com a seleção, se necessário no template
  }

  getEnderecoSelecionado(): string {
    const a = this.autorizadas.find(x => x.nome === this.agendamentoForm.autorizadaSelecionada);
    return a ? a.endereco : '';
  }

  confirmarAgendamento() {
    if (!this.atendimento) return;

    const jaEhOMesmo =
      this.atendimento.agendamentoAtual.data === this.agendamentoForm.data &&
      this.atendimento.agendamentoAtual.horario === this.agendamentoForm.horario &&
      this.atendimento.agendamentoAtual.servico === this.agendamentoForm.servico &&
      this.atendimento.agendamentoAtual.autorizada === this.agendamentoForm.autorizadaSelecionada;

    if (jaEhOMesmo) {
      alert('Esse agendamento já está confirmado.');
      return;
    }

    this.atendimento.agendamentoAtual = {
      data: this.agendamentoForm.data,
      horario: this.agendamentoForm.horario,
      autorizada: this.agendamentoForm.autorizadaSelecionada,
      endereco: this.getEnderecoSelecionado(),
      servico: this.agendamentoForm.servico
    };

    const hoje = new Date().toLocaleDateString('pt-BR');
    this.atendimento.historicoContatos.push({
      data: hoje,
      mensagem: `Agendamento confirmado: ${this.agendamentoForm.servico} em ${this.agendamentoForm.data} às ${this.agendamentoForm.horario} (${this.agendamentoForm.autorizadaSelecionada}).`
    });

    alert('Agendamento confirmado com sucesso!');
  }

  emitirNotaFiscal() {
    alert('[SIMULAÇÃO] Nota fiscal emitida para a bateria ' + this.atendimento?.novaBateria?.serie);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}