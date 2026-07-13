import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contato.html',
  styleUrls: ['./contato.scss']
})
export class ContatoComponent {
  tipoContato = '';
  nomeEmpresa = '';
  email = '';
  telefone = '';
  mensagem = '';
  mensagemEnviada = false;

  enviarMensagem() {
    if (!this.tipoContato || !this.nomeEmpresa || !this.email || !this.mensagem) {
      alert('Por favor, preencha os campos obrigatórios: tipo de contato, nome/empresa, e-mail e mensagem.');
      return;
    }

    // Aqui entraria futuramente a chamada para o backend/serviço de envio de e-mail
    this.mensagemEnviada = true;
  }

  novoContato() {
    this.mensagemEnviada = false;
    this.tipoContato = '';
    this.nomeEmpresa = '';
    this.email = '';
    this.telefone = '';
    this.mensagem = '';
  }
}