import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTitle'
})
export class LimitTitlePipe implements PipeTransform {

  transform(value: string, limit: number = 15): string {
    if(!value) return '';
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }

}
