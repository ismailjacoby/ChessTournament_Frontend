import {AbstractControl, ValidatorFn} from "@angular/forms";

export function isInThePast(): ValidatorFn{
  return (control: AbstractControl)=>{
    const date = new Date(control.value);
    const today = new Date();

    if(date<today){
      return null;
    }

    return {notInThePast:"Date of birth should be in the past."}
  }
}
