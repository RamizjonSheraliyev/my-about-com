"use client";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export function AuthSection() {
  return (
    <div className="flex items-center gap-4">
      {/* Agar foydalanuvchi tizimga kirgan bo'lsa */}
      <SignedIn>
        <UserButton />
      </SignedIn>

      {/* Agar foydalanuvchi tizimga kirmagan bo'lsa */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
