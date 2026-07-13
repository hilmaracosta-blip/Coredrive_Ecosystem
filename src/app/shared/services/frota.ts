import { Injectable } from '@angular/core';

export interface Bateria {
  chassi: string;
  serieBat: string;
  lote: number;
  tensao: number;
  temperatura: number;
  capacidade: number;
  ciclos: number;
  status: string;
  statusClass: string;
  idAutorizada: string;
  serieBatSaida: string | null;
  voucher: string | null;
  valorDesconto: number | null;
  dataTroca: string | null;
  idRecicladora: string | null;
  osColeta: string | null;
  localColeta: string | null;
  dataColeta: string | null;
  statusColeta: string | null;
}

@Injectable({ providedIn: 'root' })
export class FrotaService {
  baterias: Bateria[] = [
    { chassi: 'CH-101', serieBat: 'BAT-501', lote: 9, tensao: 350, temperatura: 25, capacidade: 55, ciclos: 1200, status: 'NORMAL', statusClass: 'normal', idAutorizada: 'Autorizada Sul', serieBatSaida: null, voucher: null, valorDesconto: null, dataTroca: null, idRecicladora: null, osColeta: null, localColeta: null, dataColeta: null, statusColeta: null },
    { chassi: 'CH-102', serieBat: 'BAT-502', lote: 9, tensao: 400, temperatura: 35, capacidade: 60, ciclos: 2100, status: 'ATENÇÃO', statusClass: 'atencao', idAutorizada: 'Autorizada Sul', serieBatSaida: null, voucher: null, valorDesconto: null, dataTroca: null, idRecicladora: null, osColeta: null, localColeta: null, dataColeta: null, statusColeta: null },
    { chassi: 'CH-103', serieBat: 'BAT-503', lote: 10, tensao: 380, temperatura: 28, capacidade: 60, ciclos: 1500, status: 'NORMAL', statusClass: 'normal', idAutorizada: 'Autorizada Leste', serieBatSaida: null, voucher: null, valorDesconto: null, dataTroca: null, idRecicladora: null, osColeta: null, localColeta: null, dataColeta: null, statusColeta: null },
    { chassi: 'CH-104', serieBat: 'BAT-504', lote: 9, tensao: 230, temperatura: 40, capacidade: 55, ciclos: 1400, status: 'CRÍTICO', statusClass: 'critico', idAutorizada: 'Autorizada Sul', serieBatSaida: null, voucher: null, valorDesconto: null, dataTroca: null, idRecicladora: null, osColeta: null, localColeta: null, dataColeta: null, statusColeta: null },
    { chassi: 'CH-105', serieBat: 'BAT-505', lote: 8, tensao: 500, temperatura: 50, capacidade: 30, ciclos: 2200, status: 'CRÍTICO', statusClass: 'critico', idAutorizada: 'Autorizada Norte', serieBatSaida: null, voucher: null, valorDesconto: null, dataTroca: null, idRecicladora: null, osColeta: null, localColeta: null, dataColeta: null, statusColeta: null },
    { chassi: 'CH-106', serieBat: 'BAT-506', lote: 11, tensao: 380, temperatura: 40, capacidade: 56, ciclos: 1900, status: 'NORMAL', statusClass: 'normal', idAutorizada: 'Autorizada Oeste', serieBatSaida: null, voucher: null, valorDesconto: null, dataTroca: null, idRecicladora: null, osColeta: null, localColeta: null, dataColeta: null, statusColeta: null },
    { chassi: 'CH-107', serieBat: 'BAT-507', lote: 10, tensao: 550, temperatura: 60, capacidade: 70, ciclos: 2300, status: 'CRÍTICO', statusClass: 'critico', idAutorizada: 'Autorizada Leste', serieBatSaida: null, voucher: null, valorDesconto: null, dataTroca: null, idRecicladora: null, osColeta: null, localColeta: null, dataColeta: null, statusColeta: null },
    { chassi: 'CH-108', serieBat: 'BAT-508', lote: 8, tensao: 300, temperatura: 28, capacidade: 55, ciclos: 1300, status: 'NORMAL', statusClass: 'normal', idAutorizada: 'Autorizada Norte', serieBatSaida: null, voucher: null, valorDesconto: null, dataTroca: null, idRecicladora: null, osColeta: null, localColeta: null, dataColeta: null, statusColeta: null },
    { chassi: 'CH-109', serieBat: 'BAT-509', lote: 9, tensao: 450, temperatura: 49, capacidade: 60, ciclos: 2100, status: 'CRÍTICO', statusClass: 'critico', idAutorizada: 'Autorizada Sul', serieBatSaida: null, voucher: null, valorDesconto: null, dataTroca: null, idRecicladora: null, osColeta: null, localColeta: null, dataColeta: null, statusColeta: null },
    { chassi: 'CH-110', serieBat: 'BAT-510', lote: 11, tensao: 320, temperatura: 35, capacidade: 45, ciclos: 1700, status: 'ATENÇÃO', statusClass: 'atencao', idAutorizada: 'Autorizada Oeste', serieBatSaida: null, voucher: null, valorDesconto: null, dataTroca: null, idRecicladora: null, osColeta: null, localColeta: null, dataColeta: null, statusColeta: null }
  ];

  getPorAutorizada(nomeAutorizada: string): Bateria[] {
    return this.baterias.filter(b => b.idAutorizada === nomeAutorizada);
  }
}