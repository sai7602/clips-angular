import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.less'],
})
export class ManageComponent implements OnInit {
  videoOrder = '1';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'];
    });
  }
  sort(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    console.log(value);
    this.router.navigateByUrl(`/manage?sort=${value}`);
  }
}
