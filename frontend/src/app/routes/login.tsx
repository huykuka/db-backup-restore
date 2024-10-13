import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@frontend/shared/components/ui/card";
import {Label} from "@frontend/shared/components/ui/label";
import {Input} from "@frontend/shared/components/ui/input";
import {Button} from "@frontend/shared/components/ui/button";
import {Link} from "react-router-dom";


export  function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input id="email" type="email" placeholder="you@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign in
                        </Button>
                    </form>
                </CardContent>
                {/*<CardFooter className="flex justify-center">*/}
                {/*    <p className="text-sm text-muted-foreground">*/}
                {/*        Don't have an account?{" "}*/}
                {/*        <Link href="/register" className="font-medium text-primary hover:underline">*/}
                {/*            Sign up*/}
                {/*        </Link>*/}
                {/*    </p>*/}
                {/*</CardFooter>*/}
            </Card>
        </div>
    )
}