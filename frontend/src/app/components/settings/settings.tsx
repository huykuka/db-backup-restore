import React from 'react';
import { DatabaseSettingForm } from "./database-setting.form";
import { GeneralSettingForm } from "./general-setting.form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@frontend/shared/components/ui/tabs';
import { useFetch } from "../../core/hooks/useFetch";
import { ResponseApi } from "src/app/models/response-api.model";
import { Setting } from "src/app/models/settings.model";

interface DatabaseSettingFormProps {
    settings: Setting[] | undefined;
}

const Settings = () => {
    const { data, loading, error } = useFetch<{settings:Setting[]}>('/settings');

    let dbSettings: Setting[] = [];
    let generalSettings: Setting[] = [];

    if (data) {
        const settings = data.settings;
        dbSettings = settings.filter(setting => setting.key.startsWith('DB')) || [];
        generalSettings = settings.filter(setting => setting.key.startsWith('GENERAL')) || [];
    }

    const tabConfigurations = [
        {
            value: "database",
            label: "Database",
            component: <DatabaseSettingForm settings={dbSettings} />
        },
        {
            value: "general",
            label: "General",
            component: <GeneralSettingForm settings={generalSettings} />
        }
    ];

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