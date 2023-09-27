import { Pipe, PipeTransform } from '@angular/core';
import { Generation, toRange } from '../core/models/generation';

@Pipe({
  name: 'generationLabel'
})
export class GenerationLabelPipe implements PipeTransform {

  transform(generation: Generation): string {
    return `${generation} (${toRange(generation)})`;
  }

}
