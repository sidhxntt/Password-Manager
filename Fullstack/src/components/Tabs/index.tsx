"use client";
import Image from "next/image";
import { CardHoverEffectDemo } from "../Cards/Index";
import Form from "../Form/Form";
import { Tabs } from "./Tabs";
import styles from "./styles.module.css";

export function TabsDemo() {
  const tabs = [
    {
      title: "Add Account",
      value: "Add",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Add Account</p>
          <div className="relative left-[6.3cm] bottom-8">
            <Image
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Down.png"
              alt="Backhand Index Pointing Down"
              width="40"
              height="30"
              unoptimized
            />
          </div>
          <Form />
        </div>
      ),
    },
    {
      title: "Your Accounts",
      value: "your_accounts",
      content: (
        <div
          className={`w-full ${styles.custom_scroll}  relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900`}
        >
          <p>Your Accounts</p>
          <div
            className={`${styles.custom_scroll} font-normal max-w-5xl mx-auto px-8 h-[20cm] relative top-10 `}
          >
            <CardHoverEffectDemo />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[44rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}
