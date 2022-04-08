import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  private static readonly MAPPING = {
    'not-found': {
      'message': 'Ups... Page not found.'
    }
  } as { [key: string]: { message: string } };

  error$: Observable<any>;

  constructor(route: ActivatedRoute) {
    this.error$ = route.paramMap.pipe(map(params => ErrorPageComponent.MAPPING[params.get('type')!]));
  }

  ngOnInit(): void {
  }
}
