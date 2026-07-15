import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('videoFundo') videoFundo!: ElementRef<HTMLVideoElement>;
  somAtivado = false;
  videoPausado = false;

  ngAfterViewInit() {
  const video = this.videoFundo.nativeElement;

  video.addEventListener('play', () => this.videoPausado = false);
  video.addEventListener('pause', () => this.videoPausado = true);

  video.muted = true;

  const tentarTocar = () => {
    video.play().catch(() => {
      this.videoPausado = true;
    });
  };

  if (video.readyState >= 2) {
    tentarTocar();
  } else {
    video.addEventListener('canplay', tentarTocar, { once: true });
  }
}

  toggleSom() {
    this.somAtivado = !this.somAtivado;
    this.videoFundo.nativeElement.muted = !this.somAtivado;
  }

  togglePlayPause() {
    const video = this.videoFundo.nativeElement;
    if (video.paused) {
      video.play();
      this.videoPausado = false;
    } else {
      video.pause();
      this.videoPausado = true;
    }
  }
}