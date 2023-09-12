import { AbstractEvent } from "./event";

export class ErrorEvent extends AbstractEvent<Error>{
    override readonly type = "ERROR";
}

export class InfoEvent extends AbstractEvent<string>{
    override readonly type = "INFO";
}