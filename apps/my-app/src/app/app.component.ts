import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonContent,
  IonHeader,
} from '@ionic/angular/standalone';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, NzIconTestModule],
})
export class AppComponent {}
