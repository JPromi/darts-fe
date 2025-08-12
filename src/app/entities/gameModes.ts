import { GameTypeEnum } from "../enums/gameTypeEnum";

export class GameModes {
    constructor (
        public translationKey: string,
        public name: GameTypeEnum,
        public isPopular: boolean = false,
        public icon: string | null = null
    ) {}

    public static list(): GameModes[] {
        return [
            new GameModes('Classic', GameTypeEnum.CLASSIC, true, './assets/images/error-drawing.svg'),
            new GameModes('Cricket', GameTypeEnum.CRICKET, true, './assets/images/error-drawing.svg'),
            new GameModes('Training', GameTypeEnum.TRAINING, false, './assets/images/error-drawing.svg'),
        ];
    }
}
