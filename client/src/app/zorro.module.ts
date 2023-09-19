import { NgModule } from "@angular/core";
import { IconDefinition } from '@ant-design/icons-angular';
import { AppstoreOutline, HomeOutline, LineChartOutline, MailOutline, MenuFoldOutline, MenuUnfoldOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';


const icons: IconDefinition[] = [
    MailOutline,
    SettingOutline,
    MenuUnfoldOutline,
    AppstoreOutline,
    MenuFoldOutline,
    LineChartOutline,
    HomeOutline,
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