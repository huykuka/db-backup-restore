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
import {Save} from "lucide-react";

const formSchema = z.object({
    dbType: z.enum(["postgresql", "mysql"], {message: "Database type is required."}),
    backupInterval: z.enum(["midnight", "daily", "weekly", "hourly", "monthly"], {message: "Invalid backup interval."}),
})

export function GeneralSettingForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dbType: "postgresql",
            backupInterval: "midnight",
        },
    })

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
                                            <SelectTrigger className="w-[180px]">
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
                                            <SelectTrigger className="w-[180px]">
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