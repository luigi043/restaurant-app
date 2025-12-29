import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Interface para as configurações de tipo
interface EmptyStateConfig {
  icon: string;
  title: string;
  message: string;
  buttonText: string;
  buttonLink?: string;  // Opcional
  buttonAction?: string; // Opcional
}

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empty-state.html',
  styleUrls: ['./empty-state.scss']
})
export class EmptyStateComponent implements OnInit {
  @Input() icon: string = '📦';
  @Input() title: string = 'Nada por aqui';
  @Input() message: string = 'Não encontramos nenhum item';
  @Input() showButton: boolean = true;
  @Input() buttonText: string = 'Explorar';
  @Input() buttonLink: string | null = null;
  @Input() buttonAction: string | null = null;
  @Input() type: 'default' | 'cart' | 'search' | 'favorites' = 'default';

  @Output() action = new EventEmitter<void>();

  // Mapeamento de tipos para configurações padrão com tipo explícito
  private typeConfigs: Record<'cart' | 'search' | 'favorites' | 'default', EmptyStateConfig> = {
    cart: {
      icon: '🛒',
      title: 'Seu carrinho está vazio',
      message: 'Adicione deliciosos pratos do nosso cardápio!',
      buttonText: 'Ver Cardápio',
      buttonLink: '/menu'
    },
    search: {
      icon: '🔍',
      title: 'Nenhum resultado encontrado',
      message: 'Tente buscar por outros termos',
      buttonText: 'Limpar Busca',
      buttonAction: 'clear'
    },
    favorites: {
      icon: '❤️',
      title: 'Nenhum favorito ainda',
      message: 'Marque seus pratos favoritos para encontrá-los aqui',
      buttonText: 'Explorar Cardápio',
      buttonLink: '/menu'
    },
    default: {
      icon: '📦',
      title: 'Nada por aqui',
      message: 'Não encontramos nenhum item',
      buttonText: 'Explorar',
      buttonLink: '/'
    }
  };

  ngOnInit() {
    // Se um tipo específico foi definido, usar as configurações padrão
    if (this.type !== 'default') {
      const config = this.typeConfigs[this.type];

      // Aplicar configurações apenas se não foram especificadas explicitamente
      // Verificamos se os valores são os padrões iniciais
      if (this.icon === '📦') this.icon = config.icon;
      if (this.title === 'Nada por aqui') this.title = config.title;
      if (this.message === 'Não encontramos nenhum item') this.message = config.message;
      if (this.buttonText === 'Explorar') this.buttonText = config.buttonText;

      // Aplicar link/action apenas se não foram especificados
      if (config.buttonLink && !this.buttonLink) {
        this.buttonLink = config.buttonLink;
      }

      if (config.buttonAction && !this.buttonAction) {
        this.buttonAction = config.buttonAction;
      }
    }
  }

  onAction() {
    // Emitir ação se temos uma ação definida ou se não temos nem link nem ação (botão padrão)
    if (this.buttonAction || (!this.buttonLink && !this.buttonAction)) {
      this.action.emit();
    }
  }

  // Método para verificar se temos um link válido
  get hasLink(): boolean {
    return !!this.buttonLink && !this.buttonAction;
  }

  // Método para verificar se temos uma ação
  get hasAction(): boolean {
    return !!this.buttonAction || (!this.buttonLink && !this.buttonAction);
  }
}
