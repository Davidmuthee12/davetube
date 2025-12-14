"use client";
import { Button } from "@/components/ui/button";
import { useEmailAuth } from "@/hooks/auth/use-email-auth";
import { LucideLoader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
  const { error, loading, login } = useEmailAuth();
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user.email || !user.password) return;

    const { success } = await login(user);

    if (success) router.push("/");
  };

  return (
    <div className="flex w-full h-dvh items-center justify-center bg-gray-100">
      <div className="grid grid-cols-2 m-40 ">
        <div className="flex">
          <Image
            src="/chick.png"
            width={500}
            height={400}
            className="object-cover rounded"
            alt="placeholder image"
          />
        </div>
        <div className="flex flex-col gap-5 h-full bg-amber-100">
          <div className="flex flex-col items-center p-5 gap-5 justify-center">
            <h1 className="text-3xl font-bold">Welcome to Davetube</h1>
            <h3 className="font-light">SignIn to Your Account</h3>
          </div>
          <div className="flex flex-col h-80 p-5">
            {error && <span className="text-red-500">{error}</span>}
            <form onSubmit={handleSubmit} className="flex flex-col p-5 gap-5">
              <div className="flex flex-col gap-5">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="border-2 p-5 rounded-2xl w-90 focus:outline-none focus:border-gray-500"
                />
              </div>
              <div className="flex flex-col gap-5">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  className="border-2 p-5 rounded-2xl w-90 focus:outline-none focus:border-gray-500"
                />
              </div>

              <Button className="bg-blue-400">
                {loading && <LucideLoader2 className="animate-spin" />}
                {loading ? "Signing In" : "SignIn"}
              </Button>

              <div className="flex items-center gap-5 text-muted-foreground">
                <hr className="grow border-gray-500" />
                <span>No Account</span>
                <hr className="grow  border-gray-500" />
              </div>
              <p className="flex justify-center">
                <Link
                  href="/auth/register"
                  className="hover:underline text-accent-foreground"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
