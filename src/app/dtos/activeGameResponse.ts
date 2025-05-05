import { GameTypeEnum } from "../enums/gameTypeEnum";
import { ActiveGamePlayerResponse } from "./activeGamePlayerResponse";

export class ActiveGameResponse {
    constructor (
        public uuid: string = "",
        public gameType: GameTypeEnum = GameTypeEnum.CLASSIC,
        public turns: number = 0,
        public gameTypeClassicPoints: number = 301,
        public gameTypeClassicInType: string = "",
        public gameTypeClassicOutType: string = "",
        public gameStartTime: Date | null = null,
        public gameEndTime: Date | null = null,
        public currentTurn: number = 0,
        public players: ActiveGamePlayerResponse[] = [],
    ) {}
}