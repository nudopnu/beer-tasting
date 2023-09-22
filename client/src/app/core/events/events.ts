import { AbstractEvent } from "./event";
import { FaceExpressions } from 'face-api.js';

export class ErrorEvent extends AbstractEvent<Error>{
    override readonly type = "ErrorEvent";
}

export class InfoEvent extends AbstractEvent<string>{
    override readonly type = "InfoEvent";
}

export class FaceExpressionEvent extends AbstractEvent<FaceExpressions>{
    override readonly type = "FaceExpressionEvent";
}

export class OpenDialogEvent extends AbstractEvent<{ component: any, onClose: () => void }>{
    override readonly type = "OpenDialogEvent";
}

export class ChangeVideoSourceEvent extends AbstractEvent<{ deviceId: string }>{
    override readonly type = "ChangeVideoSourceEvent";
}