import { SsoService } from "@joonashak/nestjs-eve-auth";
import { mockEsiCharacter, mockEsiCharacterId } from "./esi-service.mock";
import { provideMockService } from "./mock-services";

export const mockAccessToken = "nf+945173gf3457";
export const mockRefreshToken = "nv3+59237+vbn51";

export const provideMockSsoService = provideMockService(SsoService);

export const MockSsoService = provideMockSsoService({
  callback: jest.fn().mockResolvedValue({
    character: { id: mockEsiCharacterId, name: mockEsiCharacter.name },
    tokens: { accessToken: mockAccessToken, refreshToken: mockRefreshToken },
  }),
});
