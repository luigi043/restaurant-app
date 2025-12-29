import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Promocao } from '../../../models/dish';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-banner.html',
  styleUrls: ['./promo-banner.scss']
})
export class PromoBannerComponent {
  @Input() promocao!: Promocao;

  // Estado do botão de copiar
  copiado = false;

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  get estaValida(): boolean {
    return new Date(this.promocao.validoAte) >= new Date();
  }

  get diasRestantes(): number {
    const hoje = new Date();
    const dataValidade = new Date(this.promocao.validoAte);
    const diffTime = dataValidade.getTime() - hoje.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  copiarCodigo(): void {
    navigator.clipboard.writeText(this.promocao.codigo)
      .then(() => {
        this.copiado = true;
        setTimeout(() => {
          this.copiado = false;
        }, 2000);
      })
      .catch(err => {
        console.error('Erro ao copiar código:', err);
      });
  }
}
