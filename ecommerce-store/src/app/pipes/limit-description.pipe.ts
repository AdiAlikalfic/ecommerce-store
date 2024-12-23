import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitDescription'
})
export class LimitDescriptionPipe implements PipeTransform {

  transform(value: string, limit: number = 120): string {
    if(!value) return '';
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }

}
