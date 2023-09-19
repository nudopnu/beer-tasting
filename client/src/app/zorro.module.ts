import { NgModule } from "@angular/core";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';

const exports = [
    NzSelectModule,
    NzInputModule,
];

@NgModule({ exports })
export class ZorroModule { }