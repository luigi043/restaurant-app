import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-skeleton.html',
  styleUrls: ['./loading-skeleton.scss']
})
export class LoadingSkeletonComponent {
  @Input() type: 'card' | 'list' | 'text' | 'image' = 'card';
  @Input() count: number = 1;
  @Input() height: string = 'auto';
  @Input() width: string = '100%';
  @Input() borderRadius: string = '8px';

  // Array para o *ngFor
  get items(): number[] {
    return Array(this.count).fill(0).map((x, i) => i);
  }
}
