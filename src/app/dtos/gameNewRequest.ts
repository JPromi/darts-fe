import { GameThrowMultiplierEnum } from "../enums/gameThrowMultiplierEnum";
import { GameTypeEnum } from "../enums/gameTypeEnum";

export class GameNewRequest {
  constructor(
    public groupUuid: string | null = null,
    public locationUuid: string | null = null,
    public players: any[] = [],
    public gameType: GameTypeEnum = GameTypeEnum.CLASSIC,
    public gameTypeClassicPoints: number | null = 301,
    public gameTypeClassicIn: GameThrowMultiplierEnum = GameThrowMultiplierEnum.SINGLE,
    public gameTypeClassicOut: GameThrowMultiplierEnum = GameThrowMultiplierEnum.DOUBLE,
  ) { }
}