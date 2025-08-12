import { GameThrowMultiplierEnum } from "../enums/gameThrowMultiplierEnum";
import { GameTypeEnum } from "../enums/gameTypeEnum";

export class GameNewRequest {
  constructor(
    public groupUuid: string | null = null,
    public locationUuid: string | null = null,
    public players: any[] = [],
    public gameType: GameTypeEnum = GameTypeEnum.CLASSIC,
    public gameTypeClassicPoints: number | null = null,
    public gameTypeClassicIn: GameThrowMultiplierEnum = GameThrowMultiplierEnum.NONE,
    public gameTypeClassicOut: GameThrowMultiplierEnum = GameThrowMultiplierEnum.NONE,
  ) { }
}