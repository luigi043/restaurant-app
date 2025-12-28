import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: \`
    <footer>
      <p>&copy; 2024 Restaurante Sabor</p>
    </footer>
  \`,
  styles: [\`
    footer { background: #333; color: white; padding: 1rem; text-align: center; }
  \`]
})
export class FooterComponent {}
