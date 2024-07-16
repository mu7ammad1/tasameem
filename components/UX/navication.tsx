import React from "react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { redirect } from "next/navigation";

export default async function Navication() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: full_name, error } = await supabase
    .from("profiles")
    .select("full_name")
    .eq(`id`, user?.id)
    .limit(1)
    .single();

  let { data: username } = await supabase
    .from("profiles")
    .select("username")
    .eq(`id`, user?.id)
    .limit(1)
    .single();

  let { data: avatar } = await supabase
    .from("profiles")
    .select("avatar")
    .eq(`id`, user?.id)
    .limit(1)
    .single();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/signup");
  };

  return (
    <nav className="px-10 py-3">
      <section className="flex justify-between items-center w-full">
        <div className={`flex items-center gap-x-5`}>
          <Link href="/" className="text-2xl font-medium">
            Tasameem
          </Link>
          <Link
            href="/designers"
            className="text-base font-normal hover:opacity-75 duration-150 "
          >
            Designers
          </Link>
          <Link
            href="/jobs"
            className="text-base font-normal hover:opacity-75 duration-150 "
          >
            Jobs
          </Link>
        </div>
        <div>
          {user && (
            <HoverCard>
              <HoverCardTrigger>
                <Avatar>
                  <AvatarImage
                    src={`https://hsmahnunqgbyxyjzikko.supabase.co/storage/v1/object/public/avatars/avatar/${avatar?.avatar}?w=128&q=100/`}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className={`mr-3 mt-2 shadow-none bg-white`}>
                <div className="flex justify-center items-center flex-col">
                  <Link
                    href={`/${username?.username}`}
                    className={`flex justify-center items-center flex-col`}
                  >
                    <Avatar className={`w-20 h-20 size-20`}>
                      <AvatarImage
                        src={`https://hsmahnunqgbyxyjzikko.supabase.co/storage/v1/object/public/avatars/avatar/${avatar?.avatar}?w=128&q=100/`}
                      />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    <p className={`text-lg my-3`}>{full_name?.full_name}</p>
                  </Link>
                  <div className={`pt-3 w-full`}>
                    <Button
                      variant={"ghost"}
                      className={`w-full flex justify-start items-center`}
                    >
                      Profile
                    </Button>
                    <Button
                      variant={"ghost"}
                      className={`w-full flex justify-start items-center`}
                    >
                      Profile
                    </Button>

                    <Button
                      variant={"ghost"}
                      className={`w-full flex justify-start items-center`}
                    >
                      Profile
                    </Button>
                    <Separator
                      className={`my-2 h-[0.5px] bg-gradient-to-r from-stone-200/20 via-stone-200 to-stone-200/20 `}
                    />
                    <form action={signOut}>
                      <Button
                        variant={"ghost"}
                        className={`w-full flex justify-start items-center hover:bg-rose-500 text-rose-500 hover:text-white`}
                      >
                        Logout
                      </Button>
                    </form>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
          {!user && (
            <Link href={`/signup`}>
              <Button
                variant={"secondary"}
                className={`px-5 font-medium rounded-full`}
                size={"default"}
              >
                تسجيل دخول
              </Button>
            </Link>
          )}
        </div>
      </section>
    </nav>
  );
}
{
  /* <Image
src={`/avatar/${user?.id}`}
width={50}
height={50}
alt="Picture of the author"
quality={100}
loading="lazy"
className="rounded-full"
/> */
}
