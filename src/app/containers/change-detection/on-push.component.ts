import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'on-push',
  template: `
    <section [style.background]="getColor()">
      je suis une section stylée
    </section>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushComponent {
  @Output() colorChange = new EventEmitter<string>();

  getColor() {
    this.colorChange.emit("j'assigne la couleur");
    return 'red';
  }
}
