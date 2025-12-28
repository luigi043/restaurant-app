import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <header>
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/menu">Menu</a>
        <a routerLink="/reservas">Reservas</a>
      </nav>
    </header>
  \`,
  styles: [\`
    header { background: #333; color: white; padding: 1rem; }
    nav { display: flex; gap: 1rem; }
    a { color: white; text-decoration: none; }
  \`]
})
export class HeaderComponent {}
