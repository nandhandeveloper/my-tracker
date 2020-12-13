import { ProjectStatus } from '../../models/Project';
export const ProjectFormData = {
    name: {
        name: 'name',
        value: '',
        type: 'text',
        label: 'Project Name',
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
    status: {
        name: 'status',
        value: '',
        type: 'select',
        options: [
            {
                id: 1,
                value: ProjectStatus.ACTIVE,
                label: ProjectStatus.ACTIVE,
            },
            {
                id: 2,
                value: ProjectStatus.INACTIVE,
                label: ProjectStatus.INACTIVE,
            },
            {
                id: 3,
                value: ProjectStatus.ONHOLD,
                label: ProjectStatus.ONHOLD,
            },
        ],
        label: 'Project Status',
        isValid: false,
        isTouched: false,
        validations: {
            required: {
                value: true,
                error: 'This is a required field',
            },
        },
        errors: [],
    },
};
