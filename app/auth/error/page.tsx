export default function AuthError() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Authentication Error</h1>
          <p className="mt-2">Invalid credentials. Please try again.</p>
          <a href="/" className="mt-4 text-blue-500 hover:underline">
            Back to Sign In
          </a>
        </div>
      </div>
    );
  }