import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

export const useUser = () => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();

  const login = useGoogleLogin({
    onSuccess: (user) => {
      console.log("user", user);
      setUser(user);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  console.log("user", user);
  console.log("profile", profile);

  useEffect(() => {
    if (user) {
      console.log("wea", user);

      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          console.log("response", response.data);
          console.log("response2", response);

          setProfile(response);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return { profile, user, login };
};
