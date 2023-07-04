"use client";

import { HabitCard } from "@/components/HabitCard";
import { Completed } from "@/components/Completed";
import Link from "next/link";
import { Navigator } from "@/components/Navigator";
import Image from "next/image";
import { useUser } from "@/libs/hooks";

// @ts-ignore
const Home = () => {
  const subscriptions = [
    {
      userEmail: "midolo.1912@gmail.com",
      habitName: "walk",
      createdAt: "2023-06-30T05:37:27.459Z",
      updatedAt: "2023-06-30T05:37:27.459Z",
      completedAt: null,
      streak: 0,
      habit: {
        name: "walk",
        createdAt: "2023-06-30T05:32:44.703Z",
        updatedAt: "2023-06-30T05:37:24.784Z",
        isPro: false,
        minutes: 20,
        img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2057.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNTcucG5nIiwiaWF0IjoxNjg4MTAzMjkyLCJleHAiOjE3MTk2MzkyOTJ9.d-M5l0HvqOnPP-j4GLraYBTQmaxAaNQWRxgt-8VpyUc&t=2023-06-30T05%3A34%3A53.892Z",
        points: 15,
        followersQty: 0,
        title: "Go for a walk",
        subtitle: "Go for a walk in the park",
      },
    },
    {
      userEmail: "midolo.1912@gmail.com",
      habitName: "train",
      createdAt: "2023-06-30T05:42:43.085Z",
      updatedAt: "2023-06-30T05:42:43.085Z",
      completedAt: null,
      streak: 0,
      habit: {
        name: "train",
        createdAt: "2023-06-30T05:32:44.703Z",
        updatedAt: "2023-06-30T05:37:24.784Z",
        isPro: false,
        minutes: 30,
        img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2062.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNjIucG5nIiwiaWF0IjoxNjg4MTAzMzU1LCJleHAiOjE3MTk2MzkzNTV9.1bWG4rkN0SKWze7vdwyIAEIPqdKRTvTjejRhVM6tX24&t=2023-06-30T05%3A35%3A56.466Z",
        points: 30,
        followersQty: 0,
        title: "Train",
        subtitle: "Train your body",
      },
    },
    {
      userEmail: "midolo.1912@gmail.com",
      habitName: "eat",
      createdAt: "2023-07-01T05:23:20.548Z",
      updatedAt: "2023-07-01T05:23:20.548Z",
      completedAt: null,
      streak: 0,
      habit: {
        name: "eat",
        createdAt: "2023-06-30T05:32:44.703Z",
        updatedAt: "2023-07-01T05:23:20.548Z",
        isPro: false,
        minutes: 30,
        img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2061.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNjEucG5nIiwiaWF0IjoxNjg4MTAzMzQ1LCJleHAiOjE3MTk2MzkzNDV9.XKD73DedlTPO6PZM9C5qmZcLPk5adWoDPydwUqpA9KQ&t=2023-06-30T05%3A35%3A46.237Z",
        points: 20,
        followersQty: 1,
        title: "Healthy meal",
        subtitle: "Eat a healthy meal",
      },
    },
    {
      userEmail: "midolo.1912@gmail.com",
      habitName: "wakeup",
      createdAt: "2023-07-03T02:03:27.430Z",
      updatedAt: "2023-07-03T02:03:27.430Z",
      completedAt: null,
      streak: 0,
      habit: {
        name: "wakeup",
        createdAt: "2023-06-30T05:32:44.703Z",
        updatedAt: "2023-07-03T02:03:27.430Z",
        isPro: false,
        minutes: 10,
        img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2054.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNTQucG5nIiwiaWF0IjoxNjg4MTAzMjQ5LCJleHAiOjE3MTk2MzkyNDl9.RwesWwc3PBxDjNb4AkD-z3NYFPU3RjTYkVxMNYuFRKc&t=2023-06-30T05%3A34%3A10.266Z",
        points: 15,
        followersQty: 1,
        title: "Wake up early",
        subtitle: "Wake up early in the morning",
      },
    },
  ];

  //   const { login, profile } = useUser();

  // no anda
  return (
    <>
      <button onClick={() => login()}>Weador</button>
      <main className="flex flex-col container mx-auto px-4 gap-8">
        <figure className="flex items-center gap-4 mt-8">
          <Image
            // @ts-ignore
            src={profile?.picture}
            width={70}
            height={70}
            alt={""}
            className="rounded-full"
          />
          <figcaption>
            <p className="text-sm text-slate-500">Welcome</p>
            {/* @ts-ignore */}
            <h2 className="text-slate-900 font-bold">{profile?.name}</h2>
          </figcaption>
        </figure>
        <div>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for a habit"
            className="bg-slate-200 rounded-md w-full p-4 text-sm"
          />
        </div>
        <div className="max-w-md md:max-w-7xl">
          <h1 className="font-bold text-slate-950 text-2xl mb-4">
            Your Habits
          </h1>
          <div className="overflow-x-auto">
            <div className="flex flex-row gap-4">
              {subscriptions.map((sub: any) => (
                <Link
                  href={`/habit/${sub.habit.name}/scan`}
                  key={sub.habit.name}
                  passHref
                  legacyBehavior
                >
                  <HabitCard
                    minutes={20}
                    habitName={sub.habit.name}
                    title={sub.habit.title}
                    suffix={<Completed completed={!!sub.completedAt} />}
                    src={sub.habit.img}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Navigator />
    </>
  );
};

export default Home;
