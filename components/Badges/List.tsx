import { generatePrismaClient } from "@/prisma/client";

const DIAMOND_ICON = ({ fill }: { fill: string }) => (
  <svg
    id="Layer_1"
    height="30"
    viewBox="0 0 24 24"
    width="30"
    className="text-white"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
  >
    <path d="m24 9a5 5 0 0 1 -.845 2.016l-8.783 11.82a3 3 0 0 1 -4.722.029l-8.826-12.065a5.045 5.045 0 0 1 -.779-1.8h6.268l4.753 12.359a1 1 0 0 0 1.868 0l4.753-12.359zm-6.3-2h6.257a4.974 4.974 0 0 0 -.857-1.871l-2.558-3.454a4.006 4.006 0 0 0 -3.255-1.675h-2.2zm-6.592-7-2.659 7h7.112l-2.606-7zm-4.798 7 2.658-7h-2.322a3.99 3.99 0 0 0 -3.235 1.649l-2.473 3.242a4.99 4.99 0 0 0 -.938 2.109zm9.234 2h-7.088l3.544 9.214z" />
  </svg>
);

const SMALL_FIRE = ({ fill }: { fill: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    height={30}
    width={30}
    fill={fill}
  >
    <path d="m19.738,5.105l-3.734-3.465c-1.076-1.058-2.498-1.641-4.004-1.641s-2.928.583-3.973,1.61l-3.809,3.536C-.065,9.452-.065,16.457,4.219,20.763c2.078,2.088,4.842,3.237,7.781,3.237s5.703-1.149,7.781-3.237c4.284-4.306,4.284-11.311-.043-15.657Zm-2.084,13.54c-1.511,1.519-3.519,2.354-5.654,2.354s-4.144-.836-5.654-2.354c-3.124-3.138-3.124-8.244-.043-11.341l3.797-3.525c.511-.503,1.187-.779,1.9-.779s1.39.276,1.932.81l3.723,3.454c3.124,3.138,3.124,8.244,0,11.382Zm-2.826-6.507c1.562,1.57,1.562,4.114,0,5.684-.781.785-1.805,1.177-2.828,1.177-1.024,0-2.047-.392-2.829-1.177-1.562-1.57-1.562-4.114,0-5.684l1.586-1.63c.345-.34.794-.509,1.243-.509s.898.17,1.243.509l1.585,1.63Z" />
  </svg>
);

const STAR_ICON = ({ fill }: { fill: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Filled"
    viewBox="0 0 24 24"
    width="30"
    height="30"
    fill={fill}
  >
    <path d="M1.327,12.4,4.887,15,3.535,19.187A3.178,3.178,0,0,0,4.719,22.8a3.177,3.177,0,0,0,3.8-.019L12,20.219l3.482,2.559a3.227,3.227,0,0,0,4.983-3.591L19.113,15l3.56-2.6a3.227,3.227,0,0,0-1.9-5.832H16.4L15.073,2.432a3.227,3.227,0,0,0-6.146,0L7.6,6.568H3.231a3.227,3.227,0,0,0-1.9,5.832Z" />
  </svg>
);

const LEAF_ICON = ({ fill }: { fill: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width="30"
    height="30"
    fill={fill}
  >
    <path d="M23.119.872A2.985,2.985,0,0,0,20.714.015C17.921.285,8.528,1.448,4.9,5.072a9.931,9.931,0,0,0-.671,13.281l11.06-11.06a1,1,0,0,1,1.414,1.414L5.647,19.767A9.929,9.929,0,0,0,18.928,19.1c3.676-3.677,4.8-13.041,5.059-15.823A2.987,2.987,0,0,0,23.119.872ZM4.9,19.1q.358.357.743.671l-3.94,3.94A1,1,0,0,1,.293,22.293l3.94-3.94Q4.547,18.737,4.9,19.1Z" />
  </svg>
);

const TREE_ICON = ({ fill }: { fill: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width="30"
    height="30"
    fill={fill}
  >
    <path d="M11,19h2v4c0,.553-.448,1-1,1s-1-.447-1-1v-4Zm7.483-13.843h0c-.315-.067-.591-.371-.703-.772-.72-2.582-3.097-4.385-5.78-4.385S6.94,1.803,6.22,4.385c-.112,.401-.388,.705-.703,.772C2.221,5.869-.098,8.837,.003,12.215c.112,3.741,3.364,6.785,7.248,6.785h3.749v-3.586l-3.707-3.707c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293v-3.586c0-.553,.448-1,1-1s1,.447,1,1v3.586l2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-3.707,3.707v3.586h2.784c4.641,0,8.095-2.854,8.213-6.785,.102-3.378-2.217-6.346-5.514-7.058Z" />
  </svg>
);

const MARATHONER_ICON = ({ fill }: { fill: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width="30"
    height="30"
    fill={fill}
  >
    <path d="M23,12.5A1.5,1.5,0,0,1,21.5,14H18.63a3.516,3.516,0,0,1-3-1.7l-1.225-2.034-1.79,4.363,2.614,1.487A3.507,3.507,0,0,1,17,19.163V22.5a1.5,1.5,0,0,1-3,0V19.163a.5.5,0,0,0-.252-.434L9.666,16.406a3.511,3.511,0,0,1-1.427-4.322L9.5,9H7.736a.5.5,0,0,0-.447.277L5.842,12.171a1.5,1.5,0,0,1-2.684-1.342L4.605,7.935A3.483,3.483,0,0,1,7.736,6H13.36a3.516,3.516,0,0,1,3,1.7L18.2,10.758A.5.5,0,0,0,18.63,11H21.5A1.5,1.5,0,0,1,23,12.5ZM8.057,16.85a1.5,1.5,0,0,0-1.95.836A.5.5,0,0,1,5.643,18H3.5a1.5,1.5,0,0,0,0,3H5.643a3.484,3.484,0,0,0,3.25-2.2A1.5,1.5,0,0,0,8.057,16.85ZM14.5,5A2.5,2.5,0,1,0,12,2.5,2.5,2.5,0,0,0,14.5,5Z" />
  </svg>
);

const FIRE_ICON = ({ fill }: { fill: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Filled"
    viewBox="0 0 24 24"
    width="30"
    height="30"
    fill={fill}
  >
    <path d="M15.746,18.254c0-1.5-1.031-3.55-2.9-5.773A1.088,1.088,0,0,0,12,12.092h0a1.117,1.117,0,0,0-.854.391h0C9.1,14.88,8.1,17,8.273,18.625a3.668,3.668,0,0,0,1.582,2.557A3.622,3.622,0,0,0,12,22,3.75,3.75,0,0,0,15.746,18.254Z" />
    <path d="M16.629,2.9c-.786-.668-1.611-1.368-2.451-2.132A2.952,2.952,0,0,0,11.8.028a2.847,2.847,0,0,0-2.032,1.3A20.39,20.39,0,0,0,7.276,7.776,6.233,6.233,0,0,1,6.8,6.961a2,2,0,0,0-3.3-.473A9.069,9.069,0,0,0,.915,12.909,10.979,10.979,0,0,0,9.136,23.64a11.651,11.651,0,0,0,2.776.352,5.552,5.552,0,0,1-3.278-1.226,5.631,5.631,0,0,1-2.35-3.934c-.23-2.21.893-4.783,3.338-7.647h0A3.114,3.114,0,0,1,12,10.092h.01a3.1,3.1,0,0,1,2.366,1.1c1.538,1.827,3.373,4.535,3.373,7.061A5.749,5.749,0,0,1,12.39,23.98a11.056,11.056,0,0,0,10.7-11.065C23.085,8.385,20.093,5.845,16.629,2.9Z" />
  </svg>
);

const SMILE_ICON = ({ fill }: { fill: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width="30"
    height="30"
    fill={fill}
  >
    <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0ZM8,8a2,2,0,0,1,2,2c0,1-.895,1-2,1s-2,0-2-1A2,2,0,0,1,8,8Zm9.666,7.746A9.454,9.454,0,0,1,12,18a9.454,9.454,0,0,1-5.666-2.254,1,1,0,0,1,1.332-1.492A7.509,7.509,0,0,0,12,16a7.508,7.508,0,0,0,4.336-1.748,1,1,0,0,1,1.33,1.494ZM16,11c-1.105,0-2,0-2-1a2,2,0,0,1,4,0C18,11,17.105,11,16,11Z" />
  </svg>
);

const COIN_ICON = ({ fill }: { fill: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width="30"
    height="30"
    fill={fill}
  >
    <path d="M12,15C5.271,15,0,12.145,0,8.5S5.271,2,12,2s12,2.855,12,6.5-5.271,6.5-12,6.5Zm4,6.636c1.083-.201,2.09-.481,3-.831v-4.88c-.93,.314-1.938,.559-3,.739v4.971Zm-11-.831c.91,.349,1.917,.629,3,.831v-4.971c-1.062-.18-2.07-.425-3-.739v4.88Zm9-3.887c-.651,.052-1.317,.082-2,.082s-1.349-.03-2-.082v4.988c.651,.057,1.315,.094,2,.094s1.349-.037,2-.094v-4.988Zm7-1.836v4.75c1.869-1.143,3-2.651,3-4.332v-2.513c-.794,.806-1.818,1.505-3,2.096Zm-18,0c-1.182-.591-2.206-1.29-3-2.096v2.513c0,1.681,1.131,3.19,3,4.332v-4.75Z" />
  </svg>
);

const TRANSLATOR = {
  ON_STREAK: {
    title: "On a Streak",
    subtitle: "21 Days streak",
    style: "bg-red-500 border-red-900",
    icon: SMALL_FIRE,
  },
  TOP_RANKER: {
    title: "Top Ranker",
    subtitle: "Be on top 10",
    style: "bg-yellow-500 border-yellow-900",
    icon: STAR_ICON,
  },
  FIRST_STEPS: {
    title: "First Steps",
    subtitle: "Follow one habit",
    style: "bg-green-500 border-green-800",
    icon: LEAF_ICON,
  },
  CONNOISSEUR: {
    title: "Connoisseur",
    subtitle: "Follow three habits",
    style: "bg-green-600 border-green-900",
    icon: TREE_ICON,
  },
  PIOONER: {
    title: "Piooner",
    subtitle: "Be one of the first 1000 users",
    style: "bg-cyan-400 border-cyan-800",
    icon: DIAMOND_ICON,
  },
  MARATHONER: {
    title: "Marathoner",
    subtitle: "Get 10K points",
    style: "bg-yellow-500 border-yellow-900",
    icon: MARATHONER_ICON,
  },
  ON_FIRE: {
    title: "On Fire!",
    subtitle: "100 Days streak",
    style: "bg-red-500 border-red-900",
    icon: FIRE_ICON,
  },
  NICE: {
    title: "Nice",
    subtitle: "Get 6969 Points",
    style: "bg-pink-500 border-pink-900",
    icon: SMILE_ICON,
  },
  COLLECTOR: {
    title: "Collector",
    subtitle: "Get 2K points",
    style: "bg-yellow-500 border-yellow-900",
    icon: COIN_ICON,
  },
};

const BADGES = Object.keys(TRANSLATOR);

export const BadgeList = async ({ userEmail }: { userEmail: string }) => {
  const prisma = generatePrismaClient();

  const badgesOfUser = await prisma.badgeOfUser.findMany({
    where: {
      userEmail,
    },
  });

  const badgeComponents = (
    badge:
      | "ON_STREAK"
      | "TOP_RANKER"
      | "FIRST_STEPS"
      | "CONNOISSEUR"
      | "PIOONER"
      | "MARATHONER"
      | "ON_FIRE"
      | "NICE"
      | "COLLECTOR"
  ) => {
    console.log({ badgesOfUser });

    const isFollowing = badgesOfUser.find((el) => el.badgeTitle === badge);
    const additionalFollowingClass = !isFollowing
      ? `bg-zinc-600 border-zinc-800`
      : TRANSLATOR[badge].style;
    const className = `flex items-center justify-center w-20 h-20 rounded-full border-4 ${additionalFollowingClass}`;

    const fill = isFollowing ? "#fff" : "#71717a";

    return (
      <div className="text-center max-w-[10rem]  flex flex-col items-center">
        <div className={className}>{TRANSLATOR[badge].icon({ fill })}</div>
        <h4 className="text-white font-semibold mt-2">
          {TRANSLATOR[badge].title}
        </h4>
        <p className="text-zinc-400">{TRANSLATOR[badge].subtitle}</p>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-3 lg:flex lg:justify-between gap-6">
      {/* @ts-ignore */}
      {BADGES.map(badgeComponents)}
    </div>
  );
};
