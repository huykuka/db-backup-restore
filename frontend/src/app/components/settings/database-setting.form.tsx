import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@frontend/shared/components/ui/form";
import { Button } from "@frontend/shared/components/ui/button";
import { Input } from "@frontend/shared/components/ui/input";

const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    port: z.number().min(1, { message: "Port must be a positive number." }),
    dbName: z.string().min(1, { message: "Database name is required." }),
    dbHost: z.string().min(1, { message: "Database host is required." }),
})

export function DatabaseSettingForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            port: 5432,
            dbName: "",
            dbHost: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                <Input type="number" placeholder="5432" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your database port.
                            </FormDescription>
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
                            <FormDescription>
                                This is your database name.
                            </FormDescription>
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
                            <FormDescription>
                                This is your database host.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}