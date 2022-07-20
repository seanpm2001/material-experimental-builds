/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation, } from '@angular/core';
import { matSnackBarAnimations, _MatSnackBarContainerBase } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/portal";
/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
export class MatSnackBarContainer extends _MatSnackBarContainerBase {
    /** Applies the correct CSS class to the label based on its content. */
    _afterPortalAttached() {
        super._afterPortalAttached();
        // Check to see if the attached component or template uses the MDC template structure,
        // specifically the MDC label. If not, the container should apply the MDC label class to this
        // component's label container, which will apply MDC's label styles to the attached view.
        const label = this._label.nativeElement;
        const labelClass = 'mdc-snackbar__label';
        label.classList.toggle(labelClass, !label.querySelector(`.${labelClass}`));
    }
}
MatSnackBarContainer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatSnackBarContainer, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatSnackBarContainer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.1", type: MatSnackBarContainer, selector: "mat-snack-bar-container", host: { listeners: { "@state.done": "onAnimationEnd($event)" }, properties: { "@state": "_animationState" }, classAttribute: "mdc-snackbar mat-mdc-snack-bar-container mdc-snackbar--open" }, viewQueries: [{ propertyName: "_label", first: true, predicate: ["label"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"mdc-snackbar__surface\">\n  <!--\n    This outer label wrapper will have the class `mdc-snackbar__label` applied if\n    the attached template/component does not contain it.\n  -->\n  <div class=\"mat-mdc-snack-bar-label\" #label>\n    <!-- Initialy holds the snack bar content, will be empty after announcing to screen readers. -->\n    <div aria-hidden=\"true\">\n      <ng-template cdkPortalOutlet></ng-template>\n    </div>\n\n    <!-- Will receive the snack bar content from the non-live div, move will happen a short delay after opening -->\n    <div [attr.aria-live]=\"_live\" [attr.role]=\"_role\"></div>\n  </div>\n</div>\n", styles: [".mdc-snackbar{z-index:8;margin:8px;display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mdc-snackbar__surface{min-width:100%}}.mdc-snackbar__surface{max-width:672px}.mdc-snackbar__surface{border-radius:var(--mdc-shape-small, 4px)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar--leading{justify-content:flex-start}.mdc-snackbar--stacked .mdc-snackbar__label{padding-left:16px;padding-right:8px;padding-bottom:12px}[dir=rtl] .mdc-snackbar--stacked .mdc-snackbar__label,.mdc-snackbar--stacked .mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar--stacked .mdc-snackbar__surface{flex-direction:column;align-items:flex-start}.mdc-snackbar--stacked .mdc-snackbar__actions{align-self:flex-end;margin-bottom:8px}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}.mdc-snackbar__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-snackbar__surface::before{border-color:CanvasText}}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__dismiss.mdc-snackbar__dismiss{width:36px;height:36px;padding:6px;font-size:18px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss .mdc-icon-button__focus-ring{display:none}.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-snackbar__dismiss.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{display:block;max-height:36px;max-width:36px}@media screen and (forced-colors: active){.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-snackbar__dismiss.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-snackbar__dismiss.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring::after,.mdc-snackbar__dismiss.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring::after,.mdc-snackbar__dismiss.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring::after{border-color:CanvasText}}.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-icon-button--reduced-size .mdc-icon-button__ripple{width:36px;height:36px;margin-top:0px;margin-bottom:0px;margin-right:0px;margin-left:0px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-icon-button--reduced-size.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-icon-button--reduced-size:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{max-height:36px;max-width:36px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss .mdc-icon-button__touch{position:absolute;top:50%;height:36px;left:50%;width:36px;transform:translate(-50%, -50%)}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{position:static}.cdk-high-contrast-active .mat-mdc-snack-bar-container{border:solid 1px}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-handset .mdc-snackbar__surface{width:100%}"], dependencies: [{ kind: "directive", type: i1.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [matSnackBarAnimations.snackBarState], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatSnackBarContainer, decorators: [{
            type: Component,
            args: [{ selector: 'mat-snack-bar-container', changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation.None, animations: [matSnackBarAnimations.snackBarState], host: {
                        'class': 'mdc-snackbar mat-mdc-snack-bar-container mdc-snackbar--open',
                        '[@state]': '_animationState',
                        '(@state.done)': 'onAnimationEnd($event)',
                    }, template: "<div class=\"mdc-snackbar__surface\">\n  <!--\n    This outer label wrapper will have the class `mdc-snackbar__label` applied if\n    the attached template/component does not contain it.\n  -->\n  <div class=\"mat-mdc-snack-bar-label\" #label>\n    <!-- Initialy holds the snack bar content, will be empty after announcing to screen readers. -->\n    <div aria-hidden=\"true\">\n      <ng-template cdkPortalOutlet></ng-template>\n    </div>\n\n    <!-- Will receive the snack bar content from the non-live div, move will happen a short delay after opening -->\n    <div [attr.aria-live]=\"_live\" [attr.role]=\"_role\"></div>\n  </div>\n</div>\n", styles: [".mdc-snackbar{z-index:8;margin:8px;display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mdc-snackbar__surface{min-width:100%}}.mdc-snackbar__surface{max-width:672px}.mdc-snackbar__surface{border-radius:var(--mdc-shape-small, 4px)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar--leading{justify-content:flex-start}.mdc-snackbar--stacked .mdc-snackbar__label{padding-left:16px;padding-right:8px;padding-bottom:12px}[dir=rtl] .mdc-snackbar--stacked .mdc-snackbar__label,.mdc-snackbar--stacked .mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar--stacked .mdc-snackbar__surface{flex-direction:column;align-items:flex-start}.mdc-snackbar--stacked .mdc-snackbar__actions{align-self:flex-end;margin-bottom:8px}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}.mdc-snackbar__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-snackbar__surface::before{border-color:CanvasText}}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__dismiss.mdc-snackbar__dismiss{width:36px;height:36px;padding:6px;font-size:18px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss .mdc-icon-button__focus-ring{display:none}.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-snackbar__dismiss.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{display:block;max-height:36px;max-width:36px}@media screen and (forced-colors: active){.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-snackbar__dismiss.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-snackbar__dismiss.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring::after,.mdc-snackbar__dismiss.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring::after{content:\"\";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}}@media screen and (forced-colors: active)and (forced-colors: active){.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring::after,.mdc-snackbar__dismiss.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring::after{border-color:CanvasText}}.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-icon-button--reduced-size .mdc-icon-button__ripple{width:36px;height:36px;margin-top:0px;margin-bottom:0px;margin-right:0px;margin-left:0px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-icon-button--reduced-size.mdc-ripple-upgraded--background-focused .mdc-icon-button__focus-ring,.mdc-snackbar__dismiss.mdc-snackbar__dismiss.mdc-icon-button--reduced-size:not(.mdc-ripple-upgraded):focus .mdc-icon-button__focus-ring{max-height:36px;max-width:36px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss .mdc-icon-button__touch{position:absolute;top:50%;height:36px;left:50%;width:36px;transform:translate(-50%, -50%)}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{position:static}.cdk-high-contrast-active .mat-mdc-snack-bar-container{border:solid 1px}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-handset .mdc-snackbar__surface{width:100%}"] }]
        }], propDecorators: { _label: [{
                type: ViewChild,
                args: ['label', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNuYWNrLWJhci9zbmFjay1iYXItY29udGFpbmVyLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc25hY2stYmFyL3NuYWNrLWJhci1jb250YWluZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMscUJBQXFCLEVBQUUseUJBQXlCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRTdGOzs7R0FHRztBQWtCSCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEseUJBQXlCO0lBUWpFLHVFQUF1RTtJQUNwRCxvQkFBb0I7UUFDckMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFN0Isc0ZBQXNGO1FBQ3RGLDZGQUE2RjtRQUM3Rix5RkFBeUY7UUFDekYsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDeEMsTUFBTSxVQUFVLEdBQUcscUJBQXFCLENBQUM7UUFDekMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDOztpSEFsQlUsb0JBQW9CO3FHQUFwQixvQkFBb0IsbVlDdENqQyx1b0JBZUEsay9LRGdCYyxDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQzsyRkFPdEMsb0JBQW9CO2tCQWpCaEMsU0FBUzsrQkFDRSx5QkFBeUIsbUJBT2xCLHVCQUF1QixDQUFDLE9BQU8saUJBQ2pDLGlCQUFpQixDQUFDLElBQUksY0FDekIsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsUUFDM0M7d0JBQ0osT0FBTyxFQUFFLDZEQUE2RDt3QkFDdEUsVUFBVSxFQUFFLGlCQUFpQjt3QkFDN0IsZUFBZSxFQUFFLHdCQUF3QjtxQkFDMUM7OEJBUW1DLE1BQU07c0JBQXpDLFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7bWF0U25hY2tCYXJBbmltYXRpb25zLCBfTWF0U25hY2tCYXJDb250YWluZXJCYXNlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuXG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IHdyYXBzIHVzZXItcHJvdmlkZWQgc25hY2sgYmFyIGNvbnRlbnQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1zbmFjay1iYXItY29udGFpbmVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzbmFjay1iYXItY29udGFpbmVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc25hY2stYmFyLWNvbnRhaW5lci5jc3MnXSxcbiAgLy8gSW4gSXZ5IGVtYmVkZGVkIHZpZXdzIHdpbGwgYmUgY2hhbmdlIGRldGVjdGVkIGZyb20gdGhlaXIgZGVjbGFyYXRpb24gcGxhY2UsIHJhdGhlciB0aGFuXG4gIC8vIHdoZXJlIHRoZXkgd2VyZSBzdGFtcGVkIG91dC4gVGhpcyBtZWFucyB0aGF0IHdlIGNhbid0IGhhdmUgdGhlIHNuYWNrIGJhciBjb250YWluZXIgYmUgT25QdXNoLFxuICAvLyBiZWNhdXNlIGl0IG1pZ2h0IGNhdXNlIHNuYWNrIGJhcnMgdGhhdCB3ZXJlIG9wZW5lZCBmcm9tIGEgdGVtcGxhdGUgbm90IHRvIGJlIG91dCBvZiBkYXRlLlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFsaWRhdGUtZGVjb3JhdG9yc1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGFuaW1hdGlvbnM6IFttYXRTbmFja0JhckFuaW1hdGlvbnMuc25hY2tCYXJTdGF0ZV0sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLXNuYWNrYmFyIG1hdC1tZGMtc25hY2stYmFyLWNvbnRhaW5lciBtZGMtc25hY2tiYXItLW9wZW4nLFxuICAgICdbQHN0YXRlXSc6ICdfYW5pbWF0aW9uU3RhdGUnLFxuICAgICcoQHN0YXRlLmRvbmUpJzogJ29uQW5pbWF0aW9uRW5kKCRldmVudCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbmFja0JhckNvbnRhaW5lciBleHRlbmRzIF9NYXRTbmFja0JhckNvbnRhaW5lckJhc2Uge1xuICAvKipcbiAgICogRWxlbWVudCB0aGF0IHdpbGwgaGF2ZSB0aGUgYG1kYy1zbmFja2Jhcl9fbGFiZWxgIGNsYXNzIGFwcGxpZWQgaWYgdGhlIGF0dGFjaGVkIGNvbXBvbmVudFxuICAgKiBvciB0ZW1wbGF0ZSBkb2VzIG5vdCBoYXZlIGl0LiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgYXBwcm9wcmlhdGUgc3RydWN0dXJlLCB0eXBvZ3JhcGh5LCBhbmRcbiAgICogY29sb3IgaXMgYXBwbGllZCB0byB0aGUgYXR0YWNoZWQgdmlldy5cbiAgICovXG4gIEBWaWV3Q2hpbGQoJ2xhYmVsJywge3N0YXRpYzogdHJ1ZX0pIF9sYWJlbDogRWxlbWVudFJlZjtcblxuICAvKiogQXBwbGllcyB0aGUgY29ycmVjdCBDU1MgY2xhc3MgdG8gdGhlIGxhYmVsIGJhc2VkIG9uIGl0cyBjb250ZW50LiAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2FmdGVyUG9ydGFsQXR0YWNoZWQoKSB7XG4gICAgc3VwZXIuX2FmdGVyUG9ydGFsQXR0YWNoZWQoKTtcblxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgYXR0YWNoZWQgY29tcG9uZW50IG9yIHRlbXBsYXRlIHVzZXMgdGhlIE1EQyB0ZW1wbGF0ZSBzdHJ1Y3R1cmUsXG4gICAgLy8gc3BlY2lmaWNhbGx5IHRoZSBNREMgbGFiZWwuIElmIG5vdCwgdGhlIGNvbnRhaW5lciBzaG91bGQgYXBwbHkgdGhlIE1EQyBsYWJlbCBjbGFzcyB0byB0aGlzXG4gICAgLy8gY29tcG9uZW50J3MgbGFiZWwgY29udGFpbmVyLCB3aGljaCB3aWxsIGFwcGx5IE1EQydzIGxhYmVsIHN0eWxlcyB0byB0aGUgYXR0YWNoZWQgdmlldy5cbiAgICBjb25zdCBsYWJlbCA9IHRoaXMuX2xhYmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgbGFiZWxDbGFzcyA9ICdtZGMtc25hY2tiYXJfX2xhYmVsJztcbiAgICBsYWJlbC5jbGFzc0xpc3QudG9nZ2xlKGxhYmVsQ2xhc3MsICFsYWJlbC5xdWVyeVNlbGVjdG9yKGAuJHtsYWJlbENsYXNzfWApKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1kYy1zbmFja2Jhcl9fc3VyZmFjZVwiPlxuICA8IS0tXG4gICAgVGhpcyBvdXRlciBsYWJlbCB3cmFwcGVyIHdpbGwgaGF2ZSB0aGUgY2xhc3MgYG1kYy1zbmFja2Jhcl9fbGFiZWxgIGFwcGxpZWQgaWZcbiAgICB0aGUgYXR0YWNoZWQgdGVtcGxhdGUvY29tcG9uZW50IGRvZXMgbm90IGNvbnRhaW4gaXQuXG4gIC0tPlxuICA8ZGl2IGNsYXNzPVwibWF0LW1kYy1zbmFjay1iYXItbGFiZWxcIiAjbGFiZWw+XG4gICAgPCEtLSBJbml0aWFseSBob2xkcyB0aGUgc25hY2sgYmFyIGNvbnRlbnQsIHdpbGwgYmUgZW1wdHkgYWZ0ZXIgYW5ub3VuY2luZyB0byBzY3JlZW4gcmVhZGVycy4gLS0+XG4gICAgPGRpdiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBjZGtQb3J0YWxPdXRsZXQ+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gV2lsbCByZWNlaXZlIHRoZSBzbmFjayBiYXIgY29udGVudCBmcm9tIHRoZSBub24tbGl2ZSBkaXYsIG1vdmUgd2lsbCBoYXBwZW4gYSBzaG9ydCBkZWxheSBhZnRlciBvcGVuaW5nIC0tPlxuICAgIDxkaXYgW2F0dHIuYXJpYS1saXZlXT1cIl9saXZlXCIgW2F0dHIucm9sZV09XCJfcm9sZVwiPjwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19