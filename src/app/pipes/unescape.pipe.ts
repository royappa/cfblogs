import { Pipe, PipeTransform } from '@angular/core';
import { unescape } from 'lodash';

@Pipe({
  name: 'unescape'
})
export class UnescapePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return unescape(value);
  }

}
