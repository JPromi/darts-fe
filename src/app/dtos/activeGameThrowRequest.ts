import { GameThrowMultiplierEnum } from "../enums/gameThrowMultiplierEnum";
import { GameThrowTypeEnum } from "../enums/gameThtowTypeEnum";

export class ActiveGameThrowRequest {
    constructor(
        public accountUuid: string = "",
        public type: GameThrowTypeEnum = GameThrowTypeEnum.THROW,
        public point: number = 0,
        public multiplier: GameThrowMultiplierEnum = GameThrowMultiplierEnum.NONE,
        public distance: number = 0,
        public round: number = 0,
        public throwPosition: number = 0
    ) { }
}