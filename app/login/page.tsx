import { LoginForm } from '@/components/auth/login-form';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Sign In - Timely',
  description: 'Sign in to your Timely account',
};

export default function LoginPage() {
  return (
    <div className="h-[calc(100vh-10rem)] flex items-center justify-center bg-background p-4">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Timely</h1>
          <p className="text-muted-foreground">Smart Timetable Manager</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
