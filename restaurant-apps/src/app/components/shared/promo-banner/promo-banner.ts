import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Promocao } from '../../../models/dish.model';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-banner.html',
  styleUrls: ['./promo-banner.scss']
})
export class PromoBannerComponent {
  // Input para receber dados da promoção
  @Input() promocao!: Promocao;

  // Método para formatar data
  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Método para verificar se promoção está válida
  get estaValida(): boolean {
    return new Date(this.promocao.validoAte) >= new Date();
  }

  // Método para calcular dias restantes
  get diasRestantes(): number {
    const hoje = new Date();
    const dataValidade = new Date(this.promocao.validoAte);
    const diffTime = dataValidade.getTime() - hoje.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Método para copiar código da promoção
  copiarCodigo(): void {
    navigator.clipboard.writeText(this.promocao.codigo)
      .then(() => {
        // Poderia adicionar um toast notification aqui
        console.log('Código copiado:', this.promocao.codigo);

        // Opcional: Mostrar feedback visual
        this.mostrarFeedbackCopia();
      })
      .catch(err => {
        console.error('Erro ao copiar código:', err);
      });
  }

  // Método opcional para mostrar feedback visual
  private mostrarFeedbackCopia(): void {
    // Você pode implementar um toast ou alterar o texto do botão temporariamente
    const botao = document.querySelector('.btn-copy');
    if (botao) {
      const textoOriginal = botao.textContent;
      botao.textContent = '✅ Copiado!';
      botao.classList.add('copied');

      setTimeout(() => {
        botao.textContent = textoOriginal;
        botao.classList.remove('copied');
      }, 2000);
    }
  }
}
