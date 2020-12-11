import { Techstack } from './../models/Techstack';
import { NavItem } from '../models/NavItem';
import { Project, ProjectStatus } from '../models/Project';


export const PROJECTS: Project[] = [
    {
        _id: '1',
        name: 'My Tracker',
        status: ProjectStatus.ACTIVE,
        isChoosen: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: '2',
        name: 'What To Eat',
        status: ProjectStatus.INACTIVE,
        isChoosen: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: '3',
        name: 'Art Yeah',
        status: ProjectStatus.ONHOLD,
        isChoosen: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }, 
    {
        _id: '4',
        name: 'Greeting App',
        status: ProjectStatus.INACTIVE,
        isChoosen: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];

export const NAV_ITEMS: NavItem[] = [
    {
        id: 1,
        name: 'Stories',
        to: '/stories',
    },
    {
        id: 2,
        name: 'Projects',
        to: '/projects',
    },
    {
        id: 3,
        name: 'Technology Stack',
        to: '/techstack',
    },
];

export const TECH_STACK_LIST: Techstack[] = [
    {
        category: 'Web Development',
        description: 'Choose a framework between Angular or React',
    },
    {
        category: 'Web Development',
        description: 'Use Typescript as your programming language',
    },
    {
        category: 'Web Development',
        description: 'Use Lazy loading feature',
    },
    {
        category: 'Web Development',
        description: 'Use SEO features such as NextJs framework',
    },
    {
        category: 'Web Development',
        description: 'Implement Cypress for E2E Testing',
    },
    {
        category: 'Web Development',
        description: 'Implement Storybook for preparing document for front end',
    },
    {
        category: 'Web Development',
        description: 'Implement Jwt authentication and timeout feature',
    },
    {
        category: 'Web Development',
        description: 'Apply google analytics for your application',
    },
    {
        category: 'Web Development',
        description: 'Use Aria for ADA compliance',
    },
    {
        category: 'API development',
        description: 'Choose a frame work for API development SpringBoot, NodeJS, AWS Serverless API',
    },
    {
        category: 'API development',
        description: 'Use Jwt Authentication',
    },
    {
        category: 'API development',
        description: 'Implement access level APIs',
    },
    {
        category: 'API development',
        description: 'Use Swagger or equalent tool for documentation',
    },
    {
        category: 'API development',
        description: 'Use Junit or jest libraries for unit test API end points',
    },
    {
        category: 'API development',
        description: 'Use environmental variables for different environments dev qa staging prod',
    },
    {
        category: 'API development',
        description: 'Implemnetation of Email notification and SnS notification if needed',
    },
    {
        category: 'Database',
        description: 'Choose a database from mysql, mongo, postgres or Dynamodb',
    },

    {
        category: 'Database',
        description: 'Have proper credentials with strong passwords and secrets',
    },
    {
        category: 'Devops',
        description: 'Circle CI for CI and CD operations',
    },
    {
        category: 'Devops',
        description: 'Integrate Github and Circle CI',
    },
    {
        category: 'Devops',
        description: 'Create dev qa staging and production environments or atleast dev and production',
    },
    {
        category: 'Devops',
        description: 'Choose a cloud provider. Preference is AWS',
    },
    {
        category: 'Devops',
        description: 'Design alerts for the project specs in AWS cloud',
    },
];
