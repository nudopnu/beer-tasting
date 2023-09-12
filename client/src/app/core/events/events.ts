import { AbstractEvent } from "./event";

export class ErrorEvent extends AbstractEvent<Error>{
    override readonly type = "ErrorEvent";
}

export class InfoEvent extends AbstractEvent<string>{
    override readonly type = "InfoEvent";
}