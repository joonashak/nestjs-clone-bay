import { EsiService } from "../../src/esi/esi.service";
import {
  EsiAlliancePublicInfo,
  EsiCharacterPublicInfo,
  EsiCorporationPublicInfo,
} from "../../src/esi/esi.types";
import { provideMockService } from "./mock-services";

export const mockEsiCharacterId = 123456789;

export const mockEsiCharacter: EsiCharacterPublicInfo = {
  alliance_id: 99004344,
  birthday: "2014-02-03T10:37:46Z",
  bloodline_id: 7,
  corporation_id: 98600992,
  description:
    '<b>Jean le Flambeur</b> <i>(flambeur, French, "big-time gambler")</i> was the greatest thief in the solar system.<br><br>He was captured by Matjek Chen and incarcerated within <b>the Dilemma Prison</b>, a Sobornost prison located in the Neptunian Trojan belt, He is rescued by <i>Mieli</i> at the behest of <i>Josephine Pellegrini</i>, and tasked to undertake another heist. Clues from his memories lead them to <b>Oubliette</b>, a Moving City of Mars.',
  gender: "male",
  name: "Jean LeFlambeur",
  race_id: 8,
  security_status: 4.984242052,
  title: "<color=0xff00ccff>Kolumbus</color>",
};

export const mockEsiCorporation: EsiCorporationPublicInfo = {
  alliance_id: 99004344,
  ceo_id: 93280169,
  creator_id: 2115210637,
  date_founded: "2019-05-11T20:02:30Z",
  description: `u'<font size="14" color="#bfffffff"></font><font size="18" color="#ff00ff00">Jokainen reik\\xe4 on mahdollisuus!<br><br></font><font size="12" color="#ffffff00">Never stop the madness!<br><br></font><font size="12" color="#ff6868e1"><a href="joinChannel:player_b7ea27e12e2311e9b9709abe94f5a167//None//None">Avanto Public</a></font><font size="12" color="#ffffff00"> </font>'`,
  home_station_id: 60004402,
  member_count: 456,
  name: "Avanto",
  shares: 1000,
  tax_rate: 0.041999999433755875,
  ticker: "KUURA",
  url: "http://",
  war_eligible: true,
};

export const mockEsiAlliance: EsiAlliancePublicInfo = {
  creator_corporation_id: 98306612,
  creator_id: 91990613,
  date_founded: "2014-04-12T12:36:21Z",
  executor_corporation_id: 98306612,
  name: "Hole Control",
  ticker: "HOLE",
};

export const provideMockEsiService = provideMockService(EsiService);

export const MockEsiService = provideMockEsiService({
  getCharacterPublicInfo: jest.fn().mockResolvedValue(mockEsiCharacter),
  getCorporationPublicInfo: jest.fn().mockResolvedValue(mockEsiCorporation),
  getAlliancePublicInfo: jest.fn().mockResolvedValue(mockEsiAlliance),
});
