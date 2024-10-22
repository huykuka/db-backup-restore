import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@frontend/shared/components/ui/tabs';
import { useEffect } from 'react';
import { Setting } from 'src/app/models/settings.model';
import { DatabaseSettingForm } from './database-setting.form';
import { GeneralSettingForm } from './general-setting.form';
import settingService, { useSettings } from './settings.service';
;

interface DatabaseSettingFormProps {
  settings: Setting[] | undefined;
}

const Settings = () => {
  useSettings();

  useEffect(() => {
    settingService.getSettings();
  }, []);

  const handleDatabaseSettingUpdate = (settings: any) => {
    settingService.updateDBSettings(settings);
  };

  const tabConfigurations = [
    {
      value: 'database',
      label: 'Database',
      component: (
        <DatabaseSettingForm
          onDatabaseSettingUpdate={handleDatabaseSettingUpdate}
        />
      ),
    },
    {
      value: 'general',
      label: 'General',
      component: <GeneralSettingForm />,
    },
  ];

  return (
    <Tabs defaultValue="database" className="w-full">
      <TabsList>
        {tabConfigurations.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabConfigurations.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Settings;
