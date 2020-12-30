import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Validated data of register form
 *
 * @export
 * @class CustomValidators
 */
export class CustomValidators {
  /**
   * Validate pattern of fields
   *
   * @static
   * @param {RegExp} regex pattern
   * @param {ValidationErrors} error error
   * @return {*}  {ValidatorFn}
   * @memberof CustomValidators
   */
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  /**
   * Validater password if both password are equals
   *
   * @static
   * @param {AbstractControl} control
   * @memberof CustomValidators
   */
  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }

}
