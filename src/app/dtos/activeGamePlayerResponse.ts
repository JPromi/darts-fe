import { GameThrow } from "../entities/gameThrow";

export class ActiveGamePlayerResponse {
    constructor (
        public uuid: string = "",
        public order: number = 0,
        public username: string = "",
        public avatar: string | null = null,
        public throws: GameThrow[] = [],
        public hints: GameThrow[] = [],
        public score: number = 0,
        public highscore: number = 0,
        public average: number = 0,
        public isCurrentPlayer: boolean = false,
        public isEliminated: boolean = false,
        public isWinner: boolean = false,
    ) {}
}