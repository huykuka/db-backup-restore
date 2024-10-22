import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/shared/components/ui/form';
import { Button } from '@frontend/shared/components/ui/button';
import { Input } from '@frontend/shared/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@frontend/shared/components/ui/card';
import { Check, Loader, Save } from 'lucide-react';
import { Setting } from 'src/app/models/settings.model';
import { useEffect, useState } from 'react';
import { CheckButton } from './components/check-button';
import settingService from './settings.service';

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  port: z.number().min(1, { message: 'Port must be a positive number.' }),
  dbName: z.string().min(1, { message: 'Database name is required.' }),
  dbHost: z.string().min(1, { message: 'Database host is required.' }),
});

interface DatabaseSettingFormProps {
  onDatabaseSettingUpdate: (eventData: any) => void;
}

export function DatabaseSettingForm({
  onDatabaseSettingUpdate,
}: DatabaseSettingFormProps) {
  const { getState } = settingService

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      port: 5432,
      dbName: '',
      dbHost: '',
    },
  });

  useEffect(() => {
    const dbSettings = getState().settings.reduce(
        (acc, setting) => {
          switch (setting.key) {
            case 'DB_USER':
              acc.username = setting.value;
              break;
            case 'DB_PASSWORD':
              acc.password = setting.value;
              break;
            case 'DB_PORT':
              acc.port = parseInt(setting.value, 10);
              break;
            case 'DB_NAME':
              acc.dbName = setting.value;
              break;
            case 'DB_HOST':
              acc.dbHost = setting.value;
              break;
            default:
              break;
          }
          return acc;
        },
        {
          username: '',
          password: '',
          port: 5432,
          dbName: '',
          dbHost: '',
        }
      );
      form.reset(dbSettings);
    }
    , [getState()]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onDatabaseSettingUpdate(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Setting</CardTitle>
        <CardDescription>Setup your database connection</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your database username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your database password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="port"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const numericValue =
                          e.target.value === '' ? '' : Number(e.target.value);
                        field.onChange(numericValue);
                      }}
                    />
                  </FormControl>
                  <FormDescription>This is your database port.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dbName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Database Name" {...field} />
                  </FormControl>
                  <FormDescription>This is your database name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dbHost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database Host</FormLabel>
                  <FormControl>
                    <Input placeholder="Database Host" {...field} />
                  </FormControl>
                  <FormDescription>This is your database host.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2 justify-between">
              <CheckButton />
              <Button
                className="w-1/2"
                type="submit"
                disabled={!form.formState.isValid}
              >
                <Save className="mr-2" />
                <span className="hidden md:inline">Save Preferences</span>
              </Button>
            </div>
          </form>
        </Form>
        <span className="mt-3 text-sm">
          * New database settings must to be saved before running the connection
          check.{' '}
        </span>
      </CardContent>
    </Card>
  );
}
