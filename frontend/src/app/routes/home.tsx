import React from 'react';
import { DatabaseSettingForm } from "../components/settings/database-setting.form";
import { GeneralSettingForm } from "../components/settings/general-setting.form";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@frontend/shared/components/ui/tabs";

const tabConfigurations = [
    {
        value: "database",
        label: "Database",
        component: <DatabaseSettingForm />
    },
    {
        value: "general",
        label: "General",
        component: <GeneralSettingForm />
    }
];

const Home = () => {
    return (
        <div className="w-full flex">
            <div className="w-1/3">
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
            </div>

            <div className="w-2/3">
                {/* Content for the first 1/3 width div */}
            </div>
        </div>
    );
};

export default Home;