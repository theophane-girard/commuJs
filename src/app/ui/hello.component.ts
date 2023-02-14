import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>{{name || default }}</h1>`,
  styles: [`h1 { font-family: Lato; }`],
  standalone: true,
})
export class HelloComponent {
  @Input() name: string;
  default = 'Pas de css ici, on aime le danger'
}
