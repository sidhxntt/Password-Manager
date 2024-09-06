"use client";
import { AuroraBackgroundForHome } from "@/components/HomeBackground";
import { FollowerPointerCard } from "@/components/FollowingPointer/FollowingPointer";
import TitleComponent from "@/components/FollowingPointer/PointerTitle";
import useFetch from "@/Hooks/useFetch";

interface UserData {
  first_name: string;
  profile_pic: string;
}

export default function Home() {
  const { data } = useFetch<UserData>("http://localhost:8080/users");

  return data ? (
    <div className="absolute w-full top-0 ">
      <FollowerPointerCard
        title={
          <TitleComponent title={data.first_name} avatar={data.profile_pic} />
        }
      >
        <AuroraBackgroundForHome cursor="cursor-none" />
      </FollowerPointerCard>
    </div>
  ) : (
    <div className="absolute w-full top-0 ">
      <AuroraBackgroundForHome />
    </div>
  );
}
