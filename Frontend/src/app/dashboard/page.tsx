import React from "react";
import { SignedOut, SignedIn, SignIn } from "@clerk/nextjs";
import Dashboard from "@/components/Dashboard/Dashboard"; // Adjust the import path according to your project structure

const Page = () => {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <SignedOut>
          <SignIn routing="hash" />
        </SignedOut>
      </div>
      <SignedIn>
        <div className="relative w-screen bottom-24">
            <Dashboard />
        </div>
      </SignedIn>
    </div>
  );
};

export default Page;