
export type Pos = {x: number, y: number};

export type SocketDefType = {
    color: string
}

export type SocketPositionType = {
    pos : Pos
}

export type NonPreyerInfo = {id:string, color: string, isPreyer: false, pos: Pos, preyerStartDate: null}
export type PreyerInfo = {id:string, color: string, isPreyer: true, pos: Pos, preyerStartDate: number}
export type PlayerInfo = NonPreyerInfo | PreyerInfo
export type SocketUpdateType = PlayerInfo[];

export type SocketExitType = {
    id : string
}
