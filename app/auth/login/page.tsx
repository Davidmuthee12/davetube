import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
          <div className="flex h-80 p-5">
            <form action="" className="flex flex-col p-5 gap-5">
              <div className="flex flex-col gap-5">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="border-2 p-5 rounded-2xl w-90 focus:outline-none focus:border-gray-500"
                />
              </div>
              <div className="flex flex-col gap-5">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  placeholder="Enter Your Password"
                  className="border-2 p-5 rounded-2xl w-90 focus:outline-none focus:border-gray-500"
                />
              </div>

              <Button className="bg-blue-400">SignIn</Button>

              <div className="flex items-center gap-5 text-muted-foreground">
                <hr className="grow border-gray-500" />
                <span>No Account</span>
                <hr className="grow  border-gray-500" />
              </div>
              <p className="flex justify-center">
                <Link href="/auth/register" className="hover:underline text-accent-foreground">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
