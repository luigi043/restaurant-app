import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.scss']
})
export class HeroSectionComponent {
  // Horário de funcionamento
  horarioFuncionamento = {
    dias: 'Terça a Domingo',
    horario: '18:00 - 23:00',
    telefone: '(11) 9999-9999'
  };

  // Características do restaurante
  caracteristicas = [
    { icone: '🍴', texto: 'Culinária Italiana Autêntica' },
    { icone: '🍷', texto: 'Adega com 200+ vinhos' },
    { icone: '🎵', texto: 'Música ao vivo aos sábados' },
    { icone: '🌿', texto: 'Ingredientes frescos e locais' }
  ];
}
