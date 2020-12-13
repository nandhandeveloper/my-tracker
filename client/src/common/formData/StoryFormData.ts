import { StoryCritical, StoryTechnology, StoryType, StoryStatus } from './../../models/Story';
export const StoryFormData = {
    name: {
        name: 'name',
        value: '',
        type: 'text',
        label: 'Story Name',
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
    content: {
        name: 'content',
        value: '',
        type: 'text',
        label: 'Story Content',
        rows: 4,
        isValid: false,
        isTouched: false,
        multiline: true,
        validations: {
            required: {
                value: true,
                error: 'This is a required field',
            },
        },
        errors: [],
    },
    project: {
        name: 'project',
        value: '',
        type: 'select',
        options: [],
        label: 'Project Name',
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
    critical: {
        name: 'critical',
        value: '',
        type: 'select',
        options: [
            {
                id: 1,
                value: StoryCritical.HIGH,
                label: StoryCritical.HIGH,
            },
            {
                id: 2,
                value: StoryCritical.LOW,
                label: StoryCritical.LOW,
            },
            {
                id: 3,
                value: StoryCritical.MEDIUM,
                label: StoryCritical.MEDIUM,
            },
        ],
        label: 'Severity',
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
    technology: {
        name: 'technology',
        value: '',
        type: 'select',
        options: [
            {
                id: 1,
                value: StoryTechnology.BACKEND,
                label: StoryTechnology.BACKEND,
            },
            {
                id: 2,
                value: StoryTechnology.FRONTEND,
                label: StoryTechnology.FRONTEND,
            },
            {
                id: 3,
                value: StoryTechnology.DATABASE,
                label: StoryTechnology.DATABASE,
            },
            {
                id: 4,
                value: StoryTechnology.DEVOPS,
                label: StoryTechnology.DEVOPS,
            },
            {
                id: 5,
                value: StoryTechnology.OTHER,
                label: StoryTechnology.OTHER,
            },
        ],
        label: 'Technology',
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
    type: {
        name: 'type',
        value: '',
        type: 'select',
        options: [
            {
                id: 1,
                value: StoryType.CHORE,
                label: StoryType.CHORE,
            },
            {
                id: 2,
                value: StoryType.DOCS,
                label: StoryType.DOCS,
            },
            {
                id: 3,
                value: StoryType.FEATURE,
                label: StoryType.FEATURE,
            },
            {
                id: 4,
                value: StoryType.FIX,
                label: StoryType.FIX,
            },
            {
                id: 5,
                value: StoryType.REFACTOR,
                label: StoryType.REFACTOR,
            },
            {
                id: 6,
                value: StoryType.STYLE,
                label: StoryType.STYLE,
            },
            {
                id: 7,
                value: StoryType.TEST,
                label: StoryType.TEST,
            },
        ],
        label: 'Story Type',
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
    status: {
        name: 'status',
        value: '',
        type: 'select',
        options: [
            {
                id: 1,
                value: StoryStatus.ACTIVE,
                label: StoryStatus.ACTIVE,
            },
            {
                id: 2,
                value: StoryStatus.INACTIVE,
                label: StoryStatus.INACTIVE,
            },
            {
                id: 3,
                value: StoryStatus.COMPLETE,
                label: StoryStatus.COMPLETE,
            },
        ],
        label: 'Story Status',
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
