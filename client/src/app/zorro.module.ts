import { NgModule } from "@angular/core";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { MailOutline, MenuUnfoldOutline, MenuFoldOutline, AppstoreOutline, SettingOutline, LineChartOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';


const icons: IconDefinition[] = [
    MailOutline,
    SettingOutline,
    MenuUnfoldOutline,
    AppstoreOutline,
    MenuFoldOutline,
    LineChartOutline,
];

const exports = [
    NzSelectModule,
    NzInputModule,
    NzMenuModule,
    NzIconModule,
    NzToolTipModule,
    NzLayoutModule,
    NzButtonModule,
];

@NgModule({
    imports: [
        NzIconModule.forRoot(icons)
    ],
    exports
})
export class ZorroModule { }