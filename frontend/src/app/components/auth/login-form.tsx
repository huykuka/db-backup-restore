import { Button } from '@frontend/shared/components/ui/button';
import { Input } from '@frontend/shared/components/ui/input';
import { Label } from '@frontend/shared/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define the validation schema using Zod
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        console.log(values);
        // Handle the login logic here
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register('email')}
                    required
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    required
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full">
                Sign in
            </Button>
        </form>
    );
};

export default LoginForm;
