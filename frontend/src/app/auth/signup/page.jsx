"use client";

import { Suspense } from "react";
import SignupPageContent from "./SignupPageContent";

export default function SignupPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        }>
            <SignupPageContent />
        </Suspense>
    );
}

