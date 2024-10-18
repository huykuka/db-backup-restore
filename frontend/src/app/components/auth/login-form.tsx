import { Button } from '@frontend/shared/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@frontend/shared/components/ui/form';
import { Input } from '@frontend/shared/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';


interface LoginFormProps {
    onLogin: (data: z.infer<typeof formSchema>) => void
}

// Define the validation schema using Zod
const formSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type LogInDto = z.infer<typeof formSchema>
export const LoginForm = ({ onLogin }: LoginFormProps) => {

    const form = useForm<LogInDto>({
        resolver: zodResolver(formSchema),
    });
    const onSubmit = (data: LogInDto) => {
        onLogin(data)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                                <Input type="email"  {...field} />
                            </FormControl>
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
                                <Input type="password"  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className="w-full"
                    type="submit"
                    variant={"outline"}
                    disabled={!form.formState.isValid}
                >
                    Sign In
                </Button>
            </form>
        </Form>
    );
};

