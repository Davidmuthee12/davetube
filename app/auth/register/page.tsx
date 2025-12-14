"use client";
import { Button } from "@/components/ui/button";
import { useEmailAuth } from "@/hooks/auth/use-email-auth";
import { LucideLoader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";


export default function Page() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [confirmError, setConfirmError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();
  const { loading, error, signUp } = useEmailAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setConfirmError("password dont match");
      return;
    }

    if (!user.userName || !user.email || !user.password) {
      toast.error("All fields are Required");
      return;
    }

    const { success } = await signUp(user);
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
            <h3 className="font-light">Sign Up </h3>
          </div>
          <div className="flex flex-col p-5">
            {(error || confirmError) && (
              <span className="text-red-500">{error || confirmError}</span>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col p-5 gap-5">
              <div className="flex flex-col gap-5">
                <label htmlFor="name">UserName</label>
                <input
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  placeholder="Enter your Username"
                  className="border-2 p-5 rounded-2xl w-90 focus:outline-none focus:border-gray-500"
                />
              </div>

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

              <div className="flex flex-col gap-5">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="text"
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="Confirm Your Password"
                  className="border-2 p-5 rounded-2xl w-90 focus:outline-none focus:border-gray-500"
                />
              </div>

              <Button className="bg-blue-400">
                {" "}
                {loading && <LucideLoader2 className="animate-spin" />}
                {loading ? "Registering..." : "Register"}
              </Button>

              <div className="flex items-center gap-5 text-muted-foreground">
                <hr className="grow border-gray-500" />
                <span>Already have an account</span>
                <hr className="grow  border-gray-500" />
              </div>
              <p className="flex justify-center">
                <Link
                  href="/auth/register"
                  className="hover:underline text-accent-foreground"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
