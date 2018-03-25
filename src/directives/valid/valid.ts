import { Directive } from '@angular/core';
import { Validator ,NG_VALIDATORS,AbstractControl} from '@angular/forms';

/**
 * Generated class for the ValidDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[valid]',// Attribute selector
  providers: [{provide: NG_VALIDATORS, useExisting: ValidDirective, multi: true}]
})
export class ValidDirective implements Validator{

  constructor() { }

  validate(c: AbstractControl): {[key: string]: any} {
      return {"custom": true};
  }


}
