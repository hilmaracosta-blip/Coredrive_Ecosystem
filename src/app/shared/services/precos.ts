import { Injectable } from '@angular/core';

export interface PrecoBateria {
  modelo: string;
  autonomiaKm: number;
  valorTotal: number;
  valorDesconto: number;
}

@Injectable({ providedIn: 'root' })
export class PrecosService {
  tabela: PrecoBateria[] = [
    { modelo: 'NAV-Z/2020', autonomiaKm: 350, valorTotal: 30000, valorDesconto: 5000 },
    { modelo: 'DIZ-R/2021', autonomiaKm: 420, valorTotal: 32000, valorDesconto: 5000 },
    { modelo: 'VLT-X/2022', autonomiaKm: 480, valorTotal: 38000, valorDesconto: 6000 },
    { modelo: 'ARC-9/2023', autonomiaKm: 550, valorTotal: 45000, valorDesconto: 7000 }
  ];

  getPorModelo(modelo: string): PrecoBateria | undefined {
    return this.tabela.find(p => p.modelo === modelo);
  }
}