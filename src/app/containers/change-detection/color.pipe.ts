import { Pipe } from '@angular/core';
import { ColorService } from './color.service';

@Pipe({
  name: 'color',
  standalone: true,
})
export class ColorPipe {
  constructor(private colorService: ColorService) {}

  transform(value) {
    this.colorService.colorChange$.next("j'assigne la couleur");
    return value;
  }
}
