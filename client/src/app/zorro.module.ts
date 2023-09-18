import { NgModule } from "@angular/core";
import { NzSelectModule } from 'ng-zorro-antd/select';

const exports = [
    NzSelectModule,
];

@NgModule({
    exports
})
export class ZorroModule { }