import React from 'react';
import {DatabaseSettingForm} from "./database-setting.form";
import {GeneralSettingForm} from "./general-setting.form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../shared/src/components/ui/tabs';

const tabConfigurations = [
    {
        value: "database",
        label: "Database",
        component: <DatabaseSettingForm/>
    },
    {
        value: "general",
        label: "General",
        component: <GeneralSettingForm/>
    }
];

const Settings = () => {
    return (
        <Tabs defaultValue="database" className="w-full">
            <TabsList>
                {tabConfigurations.map(tab => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabConfigurations.map(tab => (
                <TabsContent key={tab.value} value={tab.value}>
                    {tab.component}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default Settings;