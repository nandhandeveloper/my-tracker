import React, { useState } from 'react';
import { TECH_STACK_LIST } from '../../common/constants';
import BasicLayout from '../../components/BasicLayout/BasicLayout';
import PageTitle from '../../components/PageTitle/PageTitle';
import TechnologyBox from '../../components/TechnologyBox/TechnologyBox';
import { LooseObject } from '../../models/LooseObject';
import { Techstack } from '../../models/Techstack';

const INITIAL_STATE: Techstack[] = TECH_STACK_LIST;

const TechStack: React.FC<{}> = () => {
    const [techstackList] = useState<Techstack[]>(INITIAL_STATE);
    const catMap: LooseObject = {};

    const getTechStackList = () => {
        let categories: string[] = [];
        categories = techstackList.map((tech: Techstack) => tech.category);

        const unquieCategories = categories.filter(
            (category: string, index: number) => categories.indexOf(category) === index,
        );

        unquieCategories.forEach((category: string) => {
            catMap[category] = techstackList.filter((tech) => tech.category === category);
        });
        return catMap;
    };

    return (
        <BasicLayout>
            <PageTitle title="Checklist for project development" />
            {Object.keys(getTechStackList()).map((key: string) => {
                return <TechnologyBox key={key} title={key} content={catMap[key]} />;
            })}
        </BasicLayout>
    );
};

export default TechStack;
