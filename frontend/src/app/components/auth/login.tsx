import { ModeToggle } from "@components/core";
import { authService } from "@core/services/auth.service";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@frontend/shared/components/ui/card";
import { LogInDto, LoginForm } from "./login-form";


export function Login() {
    const { setState } = authService

    const handleLogin = async (data: LogInDto) => {
        // setState('isAuthenticated', true)
        await authService.login(data)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="fixed top-0 right-0 m-2">
                <ModeToggle></ModeToggle>
            </div>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm onLogin={handleLogin} />
                </CardContent>
            </Card>
        </div >
    )
}