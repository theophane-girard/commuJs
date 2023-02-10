import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default',
  template: `
    <section [style.background]="getColor()">
      je suis une section stylée
    </section>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default
})
export class DefaultComponent {
  @Output() colorChange = new EventEmitter<string>()

  getColor() {
    this.colorChange.emit("j'assigne la couleur");
    return 'red';
  }
}
