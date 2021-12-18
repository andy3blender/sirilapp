import { FormGroup, ValidatorFn } from '@angular/forms';

export function MatchPassword(pass1: string, pass2: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
        const target = group.controls[pass1];
        const toMatch = group.controls[pass2];

        if (target.value == toMatch.value) {
            return null;
        }
        else {
            return { mismatch: true };
        }
    }
}