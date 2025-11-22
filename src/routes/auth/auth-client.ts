import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

const data = await authClient.signIn.social({
  provider: "google",
  idToken: {
    token: "<GOOGLE_ID_TOKEN>",
    accessToken: "<GOOGLE_ACCESS_TOKEN>",
  },
});
