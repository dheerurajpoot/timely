import { SignupForm } from '@/components/auth/signup-form';

export const metadata = {
  title: 'Create Account - Timely',
  description: 'Create a new Timely account',
};

export default function SignupPage() {
  return (
    <div className="h-[calc(100vh-10rem)] flex items-center justify-center bg-background p-4">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Timely</h1>
          <p className="text-muted-foreground">Smart Timetable Manager</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
