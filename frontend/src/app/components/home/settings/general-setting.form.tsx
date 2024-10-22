import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@frontend/shared/components/ui/form";
import {Button} from "@frontend/shared/components/ui/button";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@frontend/shared/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@frontend/shared/components/ui/select";
import { Save } from "lucide-react";
import {useEffect} from "react";
import settingService from "./settings.service";

const dbTypes = ["postgresql", "mysql"] as const;
const backupIntervals = ["midnight", "daily", "weekly", "hourly", "monthly"] as const;

const formSchema = z.object({
    dbType: z.enum(dbTypes, {message: "Database type is required."}),
    backupInterval: z.enum(backupIntervals, {message: "Invalid backup interval."}),
})

interface GeneralSettingFormProps {
}

export const GeneralSettingForm = ({ }: GeneralSettingFormProps) => {

    const { getState } = settingService
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dbType: "postgresql",
            backupInterval: "midnight",
        },
    })

    useEffect(() => {
        const generalSettings = getState().settings.reduce((acc, setting) => {
                switch (setting.key) {
                    case 'GENERAL_DB_TYPE':
                        acc.dbType = setting.value as (typeof dbTypes)[number];
                        break;
                    case 'GENERAL_BACKUP_INTERVAL':
                        acc.backupInterval = setting.value as (typeof backupIntervals)[number];
                        break;
                    default:
                        break;
                }
                return acc;
            }, {
                dbType: "postgresql" as (typeof dbTypes)[number],
                backupInterval: "midnight" as (typeof backupIntervals)[number],
            });

        form.reset(generalSettings);
    }, [getState()]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Edit your general settings below.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="dbType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Database Type</FormLabel>
                                    <FormControl>
                                        <Select {...field}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Database Type"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="postgresql">PostgreSQL</SelectItem>
                                                <SelectItem value="mysql">MySQL</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        This is your database type.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="backupInterval"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Backup Interval</FormLabel>
                                    <FormControl>
                                        <Select {...field}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Backup Interval"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="midnight">Midnight</SelectItem>
                                                <SelectItem value="daily">Daily</SelectItem>
                                                <SelectItem value="weekly">Weekly</SelectItem>
                                                <SelectItem value="hourly">Hourly</SelectItem>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        This is your backup interval.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">
                            <Save className="mr-2"/>
                            Save Preferences
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}