import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obfuscatePassword'
})
export class ObfuscatePasswordPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'string') {  // Verificamos si el valor es una cadena
      return value.replace(/./g, '*'); // Reemplaza todos los caracteres por *
    }
    return ''; // Si el valor no es una cadena, retornamos una cadena vacía
  }

}
