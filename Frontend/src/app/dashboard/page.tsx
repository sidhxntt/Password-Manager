import React from "react";
import { SignedOut, SignedIn, SignIn } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Manager | Dashboard",
  description: "Account Dashboard Page for users to add their accounts and edit it",
};

const Dashboard = dynamic(() => import("@/components/Dashboard/Dashboard"), { ssr: false });

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