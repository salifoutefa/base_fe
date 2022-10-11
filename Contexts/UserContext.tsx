import { createContext } from "react";

interface UserContextInterface {
  name: string;
  address: string;
  stars: string;
}

export const UserContext = createContext<UserContextInterface | null>(null);
