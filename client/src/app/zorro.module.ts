import { NgModule } from "@angular/core";
import { IconDefinition } from '@ant-design/icons-angular';
import { AppstoreOutline, HomeOutline, LineChartOutline, PlusOutline, MailOutline, MenuFoldOutline, MenuUnfoldOutline, SettingOutline, ExportOutline, SyncOutline, ExclamationCircleOutline, FileTwoTone } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';


const icons: IconDefinition[] = [
    MailOutline,
    SettingOutline,
    MenuUnfoldOutline,
    AppstoreOutline,
    MenuFoldOutline,
    LineChartOutline,
    HomeOutline,
    ExportOutline,
    SyncOutline,
    ExclamationCircleOutline,
    FileTwoTone,
    PlusOutline,
];

const exports = [
    NzSelectModule,
    NzInputModule,
    NzMenuModule,
    NzIconModule,
    NzToolTipModule,
    NzLayoutModule,
    NzButtonModule,
    NzQRCodeModule,
    NzProgressModule,
    NzRateModule,
    NzCheckboxModule,
    NzModalModule,
    NzUploadModule,
    NzMessageModule,
];

@NgModule({
    imports: [
        NzIconModule.forRoot(icons)
    ],
    exports
})
export class ZorroModule { }