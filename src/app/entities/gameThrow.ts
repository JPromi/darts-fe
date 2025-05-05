import { GameThrowMultiplierEnum } from "../enums/gameThrowMultiplierEnum";
import { GameThrowTypeEnum } from "../enums/gameThtowTypeEnum";

export class GameThrow {
    constructor (
        public point: number = 0,
        public multiplier: GameThrowMultiplierEnum = GameThrowMultiplierEnum.NONE,
        public distance: number = 0,
        public type: GameThrowTypeEnum = GameThrowTypeEnum.POINTS,
    ) {}
}