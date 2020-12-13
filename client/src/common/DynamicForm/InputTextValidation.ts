export const InputTextValidations = (validations: {[key: string]: any}, inputValue: string) => {
    const errors = [];
    for (let validation in validations) {
        const { value, error } = validations[validation];
        switch (validation) {
            case 'required':
                if (value && (!inputValue)) {
                    errors.push(error);
                }
                break;
            case 'minlength':
                if (inputValue && inputValue.length < value) {
                    errors.push(error);
                }
                break;
            case 'maxlength':
                if (inputValue && inputValue.length > value) {
                    errors.push(error);
                }
                break;
            case 'email':
                if (inputValue) {
                    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                    if (!emailRegex.test(inputValue)) {
                        errors.push(error);
                    }
                }
                break;
            default:
                break;
        }
    }
    return errors;
}

