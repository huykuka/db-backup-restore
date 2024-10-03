import React, {useEffect, useState} from 'react';
import {DatabaseSettingForm} from "./database-setting.form";
import {GeneralSettingForm} from "./general-setting.form";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@frontend/shared/components/ui/tabs';
import {useFetch} from "../../core/hooks/useFetch";
import {Setting} from "src/app/models/settings.model";
import apiClientServices from "../../core/services/api-client.services";
import {toast} from "sonner";

interface DatabaseSettingFormProps {
    settings: Setting[] | undefined;
}

const Settings = () => {
    const {data, loading, error} = useFetch<{ settings: Setting[] }>('/settings');

    const [dbSettings, setDbSettings] = useState<Setting[]>([]);
    const [generalSettings, setGeneralSettings] = useState<Setting[]>([]);

    useEffect(() => {
        if (data) {
            const settings = data.settings;
            setDbSettings(settings.filter(setting => setting.key.startsWith('DB')) || []);
            setGeneralSettings(settings.filter(setting => setting.key.startsWith('GENERAL')) || []);
        }
    }, [data]);


    const handleDatabaseSettingUpdate = (settings: any) => {
        apiClientServices.post('settings/update/db-settings', settings).then(
            (response,) => {
                toast.success("Settings updated successfully");
                setDbSettings(response.data.data.settings);
            }
        ).catch(() =>toast.error("Can not update the settings"))
    };


    const tabConfigurations = [
        {
            value: "database",
            label: "Database",
            component: <DatabaseSettingForm settings={dbSettings}
                                            onDatabaseSettingUpdate={handleDatabaseSettingUpdate}/>
        },
        {
            value: "general",
            label: "General",
            component: <GeneralSettingForm settings={generalSettings}/>
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