export const DeleteProjectConfirmData = {
    projectname: {
        name: 'projectname',
        value: '',
        type: 'text',
        label: 'Confirm Project Name',
        isValid: false,
        isTouched: false,
        multiline: false,
        validations: {
            required: {
                value: true,
                error: 'This is a required field',
            },
        },
        errors: [],
    },
};
