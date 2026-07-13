import { Injectable } from '@angular/core';

export interface Autorizada {
  nome: string;
  endereco: string;
}

export interface HistoricoContato {
  data: string;
  mensagem: string;
}

export interface ChecklistItem {
  realizado: boolean;
  data?: string;
  hora?: string;
}

export interface Atendimento {
  chassi: string;
  historicoContatos: HistoricoContato[];
  checklist: {
    triagem: ChecklistItem;
    substituicao: ChecklistItem;
    reparo: ChecklistItem;
  };
  diagnostico: string;
  agendamentoAtual: {
    data: string;
    horario: string;
    autorizada: string;
    endereco: string;
    servico: string;
  };
  concluido: boolean;
  novaBateria?: { serie: string; status: string; statusClass: string; capacidade: number; garantiaAte: string };
  voucher?: { codigo: string; valor: number };
  valorTotalBateria?: number;
  valorPago?: number;
}

@Injectable({ providedIn: 'root' })
export class AtendimentoService {
  autorizadas: Autorizada[] = [
    { nome: 'Autorizada Sul', endereco: 'Rua da Esperança, 235, Lauro de Freitas - BA' },
    { nome: 'Autorizada Norte', endereco: 'Av. Central, 480, Salvador - BA' },
    { nome: 'Autorizada Leste', endereco: 'Rua das Palmeiras, 112, Salvador - BA' },
    { nome: 'Autorizada Oeste', endereco: 'Av. Oceânica, 900, Camaçari - BA' }
  ];

  atendimentos: Record<string, Atendimento> = {
    'CH-109': {
      chassi: 'CH-109',
      historicoContatos: [
        { data: '10/03/2026', mensagem: 'Mensagem de agendamento para triagem enviada ao cliente.' },
        { data: '15/03/2026', mensagem: 'Confirmação do agendamento: Triagem em 20/03/2026 às 08:00 (Autorizada Sul).' },
        { data: '20/03/2026', mensagem: 'Triagem realizada. Bateria diagnosticada em status CRÍTICO — substituição recomendada.' },
        { data: '20/03/2026', mensagem: 'Substituição realizada no mesmo dia. Nova bateria instalada.' }
      ],
      checklist: {
        triagem: { realizado: true, data: '20/03/2026', hora: '08:30' },
        substituicao: { realizado: true, data: '20/03/2026', hora: '11:00' },
        reparo: { realizado: false }
      },
      diagnostico: 'Bateria em status CRÍTICO (SoH abaixo do limite seguro). Substituição realizada.',
      agendamentoAtual: {
        data: '20/03/2026',
        horario: '08:00',
        autorizada: 'Autorizada Sul',
        endereco: 'Rua da Esperança, 235, Lauro de Freitas - BA',
        servico: 'Substituição'
      },
      concluido: true,
      novaBateria: {
        serie: 'BAT-981-NEW',
        status: 'NORMAL',
        statusClass: 'normal',
        capacidade: 100,
        garantiaAte: '20/03/2029'
      },
      voucher: { codigo: 'DESC002', valor: 5000 },
      valorTotalBateria: 30000,
      valorPago: 25000
    }
  };

  getAtendimento(chassi: string): Atendimento | undefined {
    return this.atendimentos[chassi];
  }
}