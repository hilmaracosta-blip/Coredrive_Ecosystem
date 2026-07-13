import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FrotaService } from '../../../../shared/services/frota';
import type { Bateria } from '../../../../shared/services/frota';
import { ClientesService } from '../../../../shared/services/clientes';
import type { ClienteVeiculo } from '../../../../shared/services/clientes';
import { AtendimentoService } from '../../../../shared/services/atendimento';
import type { Atendimento } from '../../../../shared/services/atendimento';
import { PrecosService } from '../../../../shared/services/precos';
import type { PrecoBateria } from '../../../../shared/services/precos';

@Component({
  selector: 'app-dashboard-authorized',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-autorizada.html',
  styleUrl: './dashboard-autorizada.scss'
})
export class DashboardAuthorizedComponent {
  dataAtualizacao = new Date().toLocaleDateString('pt-BR');
  abaAtiva: 'alertas' | 'cliente' | 'coleta' = 'alertas';

  alertasSul: Bateria[];

  bateriaEntrada = '';
  bateriaSaida = '';

  buscaChassi = 'CH-109';
  buscaRealizada = false;
  clienteEncontrado: ClienteVeiculo | null = null;
  atendimentoCliente: Atendimento | undefined;
  mensagemPersonalizada = '';

  precoSelecionado: PrecoBateria | undefined;

  constructor(
    private router: Router,
    private frota: FrotaService,
    private clientesService: ClientesService,
    private atendimentoService: AtendimentoService,
    private precosService: PrecosService
  ) {
    this.alertasSul = this.frota.getPorAutorizada('Autorizada Sul');
  }

  selecionarAba(aba: 'alertas' | 'cliente' | 'coleta') {
    this.abaAtiva = aba;
  }

  buscarCliente() {
    this.buscaRealizada = true;
    const chassiFormatado = this.buscaChassi.toUpperCase().trim();
    const resultado = this.clientesService.getPorChassi(chassiFormatado);
    this.clienteEncontrado = resultado || null;
    this.atendimentoCliente = this.atendimentoService.getAtendimento(chassiFormatado);
    this.precoSelecionado = this.clienteEncontrado
      ? this.precosService.getPorModelo(this.clienteEncontrado.modelo)
      : undefined;

    if (this.clienteEncontrado) {
      const primeiroNome = this.clienteEncontrado.cliente.split(' ')[0];
      this.mensagemPersonalizada = `Olá, ${primeiroNome}! Por favor, agende sua visita à autorizada mais próxima com brevidade para realizar a triagem da bateria do seu veículo. Acesse o Portal do Cliente (www.ecosystem.com.br), entre com seu login e senha, e agende seu atendimento no local de sua preferência.`;
    } else {
      this.mensagemPersonalizada = '';
    }

    this.bateriaSaida = '';
  }

  servicoEhSubstituicao(): boolean {
    return this.atendimentoCliente?.agendamentoAtual?.servico === 'Substituição';
  }

  private gerarCodigoVoucher(): string {
    const nome4 = this.clienteEncontrado!.cliente.split(' ')[0].toUpperCase().padEnd(4, 'X').substring(0, 4);
    const digito = this.clienteEncontrado!.chassi.replace(/\D/g, '').slice(-1) || '1';
    return nome4 + digito;
  }

  private gerarSerieBateriaNova(): string {
    const numeros = this.clienteEncontrado!.chassi.replace(/\D/g, '');
    return `BAT-${numeros}-NEW`;
  }

  emitirVoucher() {
    if (!this.atendimentoCliente || !this.clienteEncontrado) return;

    if (!this.precoSelecionado) {
      alert('Modelo de veículo não encontrado na tabela de preços. Não é possível emitir o voucher.');
      return;
    }

    const codigoGerado = this.gerarCodigoVoucher();
    const serieGerada = this.bateriaSaida.trim() || this.gerarSerieBateriaNova();

    const garantia = new Date();
    garantia.setFullYear(garantia.getFullYear() + 3);
    const dataTroca = this.atendimentoCliente.agendamentoAtual.data;

    this.atendimentoCliente.voucher = { codigo: codigoGerado, valor: this.precoSelecionado.valorDesconto };
    this.atendimentoCliente.valorTotalBateria = this.precoSelecionado.valorTotal;
    this.atendimentoCliente.valorPago = this.precoSelecionado.valorTotal - this.precoSelecionado.valorDesconto;
    this.atendimentoCliente.novaBateria = {
      serie: serieGerada,
      status: 'NORMAL',
      statusClass: 'normal',
      capacidade: 100,
      garantiaAte: garantia.toLocaleDateString('pt-BR')
    };
    this.atendimentoCliente.concluido = true;

    this.atendimentoCliente.historicoContatos.push({
      data: dataTroca,
      mensagem: `Voucher ${codigoGerado} emitido. Substituição concluída com a bateria ${serieGerada}.`
    });

    const bateriaMontadora = this.frota.baterias.find(b => b.chassi === this.clienteEncontrado!.chassi);
    if (bateriaMontadora) {
      bateriaMontadora.serieBatSaida = serieGerada;
      bateriaMontadora.voucher = codigoGerado;
      bateriaMontadora.valorDesconto = this.precoSelecionado.valorDesconto;
      bateriaMontadora.dataTroca = dataTroca;
    }

    alert(`Voucher ${codigoGerado} emitido com sucesso!\nBateria nova: ${serieGerada}\nDesconto: R$ ${this.precoSelecionado.valorDesconto}`);

    this.bateriaEntrada = '';
    this.bateriaSaida = '';
  }

  enviarMensagem() {
    alert('[SIMULAÇÃO] Mensagem que seria enviada para ' + this.clienteEncontrado?.cliente + ' (' + this.clienteEncontrado?.email + '):\n\n' + this.mensagemPersonalizada);
  }

  registrarEntrada() { alert('Entrada da bateria ' + this.bateriaEntrada + ' registrada!'); }
  registrarSaida() { alert('Saída da bateria ' + this.bateriaSaida + ' registrada.'); }

  bateriasParaColeta(): Bateria[] {
    return this.frota.getPorAutorizada('Autorizada Sul').filter(b => b.idRecicladora);
  }

  logout() { this.router.navigate(['/']); }
}