import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "./declarations/backend"; // Import the generated IDL
import { canisterId } from "./declarations/backend"; // Import the backend canister ID

// Create and export the actor
export const createBackendActor = () => {
  const agent = new HttpAgent();
  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey(); // Necessary in local environments
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};
