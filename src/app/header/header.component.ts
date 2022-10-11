import { Component, Input } from '@angular/core';
import { Rate } from '../shared/model/rate.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() rates: Rate[];
  @Input() currenciesToDisplay: string[];
}
