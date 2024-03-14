"use client";

// import CalendarEvents from "../(components)/CalendarEvents";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const Member = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });
  return (
    <div>
      <h1>Member Client Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
      {/* <CalendarEvents /> */}
    </div>
  );
};

export default Member;
