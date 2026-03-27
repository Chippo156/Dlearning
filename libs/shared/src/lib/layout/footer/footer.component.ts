import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzInputModule } from 'ng-zorro-antd/input'
import { Component } from '@angular/core'
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NzIconModule,
    NzButtonModule,
    NzInputModule
  ],
  templateUrl: './footer.component.html'
})
export class FooterComponent {}