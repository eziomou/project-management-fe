import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective implements OnInit, OnDestroy {

  private subscription?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscription = this.authService.isLogged().subscribe(isLogged => {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef, { $implicit: isLogged });
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
