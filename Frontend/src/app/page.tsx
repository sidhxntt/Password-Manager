"use client";
import { AuroraBackgroundForHome } from "@/components/HomeBackground";
import { FollowerPointerCard } from "@/components/FollowingPointer/FollowingPointer";
import TitleComponent from "@/components/FollowingPointer/PointerTitle";
import useFetch from "@/Hooks/useFetch";

interface UserData {
  username: string;
  profile_pic: string;
}

export default function Home() {
  const { data } = useFetch<UserData>("http://localhost:8080/users");

  return data ? (
    <FollowerPointerCard
      title={<TitleComponent title={data.username} avatar={data.profile_pic} />}
    >
      <AuroraBackgroundForHome cursor="cursor-none" />
    </FollowerPointerCard>
  ) : (
    <AuroraBackgroundForHome />
  );
}