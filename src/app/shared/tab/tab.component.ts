import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less'],
})
export class TabComponent implements OnInit {
  @Input() tabTitle = '';
  @Input() isActive = false;
  constructor() {}

  ngOnInit(): void {}
}
