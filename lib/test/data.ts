import { User } from "../src";
import { Corporation } from "../src/entities/corporation/corporation.model";

export const mockCorp: Corporation = {
  eveId: 98765,
  name: "Test Corp Do Not Ignore",
  ticker: "MOCKCO",
};

export const mockUser: User = {
  id: "h0f284hg",
  admin: false,
  main: {
    eveId: 12345,
    name: "Mister Mock",
    corporation: mockCorp,
  },
  alts: [],
};
