import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    return value;
  }
}
