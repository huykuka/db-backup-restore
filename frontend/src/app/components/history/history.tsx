import {Tabs, TabsContent, TabsList, TabsTrigger} from "@frontend/shared/components/ui/tabs";
import React from "react";
import {BackupHistory} from "./backup-history/backup-history";
import {StatusHistory} from "./status-history/status-history";

const tabConfigurations = [
    {
        value: "backup",
        label: "Back Up History",
        component: <BackupHistory/>
    },
    {
        value: "status",
        label: "Status History",
        component: <StatusHistory/>
    }
];
export const History = () => {
    return (
        <Tabs defaultValue="backup" className="w-full">
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