import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private autenticado = false;
  private perfilAtual: string | null = null;

  login(perfil: string) {
    this.autenticado = true;
    this.perfilAtual = perfil;
  }

  logout() {
    this.autenticado = false;
    this.perfilAtual = null;
  }

  estaAutenticado(): boolean {
    return this.autenticado;
  }

  getPerfilAtual(): string | null {
    return this.perfilAtual;
  }
}