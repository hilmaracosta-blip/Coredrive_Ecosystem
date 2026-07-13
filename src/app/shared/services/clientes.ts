import { Injectable } from '@angular/core';

export interface ClienteVeiculo {
  chassi: string;
  fabricante: string;
  modelo: string;
  cliente: string;
  endereco: string;
  cidade: string;
  cep: string;
  contato: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ClientesService {
  clientes: ClienteVeiculo[] = [
    {
      chassi: 'CH-109',
      fabricante: 'Atlanta',
      modelo: 'NAV-Z/2020',
      cliente: 'Felicidade de Assis',
      endereco: 'Rua do Paraíso, 123, Bairro Alegria - Condomínio da Ajuda AP304',
      cidade: 'Salvador/BA',
      cep: '9999-999',
      contato: 'Tel: 71-99999-9999',
      email: 'felicidadeassis@paz.com'
    },
    {
      chassi: 'CH-104',
      fabricante: 'Atlanta',
      modelo: 'DIZ-R/2021',
      cliente: 'Perseverança Da Costa',
      endereco: 'Rua do Entusiasmo, 135, Bairro da Solidariedade, cs 05',
      cidade: 'Lauro de Freitas/BA',
      cep: '9777-777',
      contato: 'Tel: 71-98888-8888',
      email: 'perseveranca@amor.com'
    }
  ];

  getPorChassi(chassi: string): ClienteVeiculo | undefined {
    return this.clientes.find(c => c.chassi.toUpperCase() === chassi.toUpperCase().trim());
  }
}