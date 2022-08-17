import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
})
export class SectionHeaderComponent implements OnInit {
  title$ = this.breadcrumbService.breadcrumbs$.pipe(
    filter((bcs) => bcs.length > 0),
    map((bcs) => bcs[bcs.length - 1].label as string)
  );

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$;
  }
}
