import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dish-card">
      <h3>{{ dish?.name || 'Prato' }}</h3>
    </div>
  `,
  styles: []
})
export class DishCardComponent {
  @Input() dish: any;
}
