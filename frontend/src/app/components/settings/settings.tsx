import { toastService } from '@core/services';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@frontend/shared/components/ui/tabs';
import { useEffect, useState } from 'react';
import { Setting } from 'src/app/models/settings.model';
import { useFetch } from '../../core/hooks/useFetch';
import { apiClient } from '../../core/services/api-client.service';
import { DatabaseSettingForm } from './database-setting.form';
import { GeneralSettingForm } from './general-setting.form';

interface DatabaseSettingFormProps {
  settings: Setting[] | undefined;
}

const Settings = () => {
  const { data, loading, error } = useFetch<{ settings: Setting[] }>(
    '/settings'
  );

  const [dbSettings, setDbSettings] = useState<Setting[]>([]);
  const [generalSettings, setGeneralSettings] = useState<Setting[]>([]);

  useEffect(() => {
    if (data) {
      const settings = data.settings;
      setDbSettings(
        settings.filter((setting) => setting.key.startsWith('DB')) || []
      );
      setGeneralSettings(
        settings.filter((setting) => setting.key.startsWith('GENERAL')) || []
      );
    }
  }, [data]);

  const handleDatabaseSettingUpdate = (settings: any) => {
    apiClient
      .post('settings/update/db-settings', settings)
      .then((response) => {
        toastService.success('Settings updated successfully');
        setDbSettings(response.data.data.settings);
      })
      .catch(() => toastService.error('Can not update the settings'));
  };

  const tabConfigurations = [
    {
      value: 'database',
      label: 'Database',
      component: (
        <DatabaseSettingForm
          settings={dbSettings}
          onDatabaseSettingUpdate={handleDatabaseSettingUpdate}
        />
      ),
    },
    {
      value: 'general',
      label: 'General',
      component: <GeneralSettingForm settings={generalSettings} />,
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
