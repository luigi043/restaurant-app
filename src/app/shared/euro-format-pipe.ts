import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euroFormat',
  standalone: true
})
export class EuroFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) return '0,00 €';

    // Formata como: 12,90 €
    const formatted = value.toFixed(2).replace('.', ',');
    return `${formatted} €`;

    // Ou se preferir: € 12,90
    // return `€ ${formatted}`;
  }
}
