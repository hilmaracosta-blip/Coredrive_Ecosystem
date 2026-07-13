import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Slide {
  image: string;
  title: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() slides: Slide[] = [];
  @Input() autoplayInterval = 4000;
  currentIndex = signal(0);
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.stopAutoplay();
    this.intervalId = setInterval(() => {
      this.next();
    }, this.autoplayInterval);
  }

  stopAutoplay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  next() {
    this.currentIndex.update(i => (i + 1) % this.slides.length);
  }

  prev() {
    this.currentIndex.update(i => (i - 1 + this.slides.length) % this.slides.length);
    this.startAutoplay();
  }
}