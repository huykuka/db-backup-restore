import React from 'react';
import {DatabaseSettingForm} from "./database-setting.form";
import {GeneralSettingForm} from "./general-setting.form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@frontend/shared/components/ui/tabs';
import {useFetch} from "../../core/hooks/useFetch";


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
    const {data, loading, error} = useFetch<any>('/settings');
    console.log(data, loading, error);
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