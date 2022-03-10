/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { _MatOptgroupBase, MAT_OPTGROUP } from '@angular/material/core';
import * as i0 from "@angular/core";
// Notes on the accessibility pattern used for `mat-optgroup`.
// The option group has two different "modes": regular and inert. The regular mode uses the
// recommended a11y pattern which has `role="group"` on the group element with `aria-labelledby`
// pointing to the label. This works for `mat-select`, but it seems to hit a bug for autocomplete
// under VoiceOver where the group doesn't get read out at all. The bug appears to be that if
// there's __any__ a11y-related attribute on the group (e.g. `role` or `aria-labelledby`),
// VoiceOver on Safari won't read it out.
// We've introduced the `inert` mode as a workaround. Under this mode, all a11y attributes are
// removed from the group, and we get the screen reader to read out the group label by mirroring it
// inside an invisible element in the option. This is sub-optimal, because the screen reader will
// repeat the group label on each navigation, whereas the default pattern only reads the group when
// the user enters a new group. The following alternate approaches were considered:
// 1. Reading out the group label using the `LiveAnnouncer` solves the problem, but we can't control
//    when the text will be read out so sometimes it comes in too late or never if the user
//    navigates quickly.
// 2. `<mat-option aria-describedby="groupLabel"` - This works on Safari, but VoiceOver in Chrome
//    won't read out the description at all.
// 3. `<mat-option aria-labelledby="optionLabel groupLabel"` - This works on Chrome, but Safari
//     doesn't read out the text at all. Furthermore, on
/**
 * Component that is used to group instances of `mat-option`.
 */
export class MatOptgroup extends _MatOptgroupBase {
}
MatOptgroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: MatOptgroup, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatOptgroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "14.0.0-next.6", type: MatOptgroup, selector: "mat-optgroup", inputs: { disabled: "disabled" }, host: { properties: { "attr.role": "_inert ? null : \"group\"", "attr.aria-disabled": "_inert ? null : disabled.toString()", "attr.aria-labelledby": "_inert ? null : _labelId" }, classAttribute: "mat-mdc-optgroup" }, providers: [{ provide: MAT_OPTGROUP, useExisting: MatOptgroup }], exportAs: ["matOptgroup"], usesInheritance: true, ngImport: i0, template: "<span\n  class=\"mat-mdc-optgroup-label\"\n  aria-hidden=\"true\"\n  [class.mdc-list-item--disabled]=\"disabled\"\n  [id]=\"_labelId\">\n  <span class=\"mdc-list-item__primary-text\">{{ label }} <ng-content></ng-content></span>\n</span>\n\n<ng-content select=\"mat-option, ng-container\"></ng-content>\n", styles: [".mat-mdc-optgroup-label{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;min-height:48px}.mat-mdc-optgroup-label:focus{outline:none}[dir=rtl] .mat-mdc-optgroup-label,.mat-mdc-optgroup-label[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-optgroup-label.mdc-list-item--disabled{opacity:.38}.mat-mdc-optgroup-label .mdc-list-item__primary-text{white-space:normal}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.6", ngImport: i0, type: MatOptgroup, decorators: [{
            type: Component,
            args: [{ selector: 'mat-optgroup', exportAs: 'matOptgroup', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, inputs: ['disabled'], host: {
                        'class': 'mat-mdc-optgroup',
                        '[attr.role]': '_inert ? null : "group"',
                        '[attr.aria-disabled]': '_inert ? null : disabled.toString()',
                        '[attr.aria-labelledby]': '_inert ? null : _labelId',
                    }, providers: [{ provide: MAT_OPTGROUP, useExisting: MatOptgroup }], template: "<span\n  class=\"mat-mdc-optgroup-label\"\n  aria-hidden=\"true\"\n  [class.mdc-list-item--disabled]=\"disabled\"\n  [id]=\"_labelId\">\n  <span class=\"mdc-list-item__primary-text\">{{ label }} <ng-content></ng-content></span>\n</span>\n\n<ng-content select=\"mat-option, ng-container\"></ng-content>\n", styles: [".mat-mdc-optgroup-label{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;min-height:48px}.mat-mdc-optgroup-label:focus{outline:none}[dir=rtl] .mat-mdc-optgroup-label,.mat-mdc-optgroup-label[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-optgroup-label.mdc-list-item--disabled{opacity:.38}.mat-mdc-optgroup-label .mdc-list-item__primary-text{white-space:normal}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlL29wdGlvbi9vcHRncm91cC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUvb3B0aW9uL29wdGdyb3VwLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7O0FBRXRFLDhEQUE4RDtBQUM5RCwyRkFBMkY7QUFDM0YsZ0dBQWdHO0FBQ2hHLGlHQUFpRztBQUNqRyw2RkFBNkY7QUFDN0YsMEZBQTBGO0FBQzFGLHlDQUF5QztBQUN6Qyw4RkFBOEY7QUFDOUYsbUdBQW1HO0FBQ25HLGlHQUFpRztBQUNqRyxtR0FBbUc7QUFDbkcsbUZBQW1GO0FBQ25GLG9HQUFvRztBQUNwRywyRkFBMkY7QUFDM0Ysd0JBQXdCO0FBQ3hCLGlHQUFpRztBQUNqRyw0Q0FBNEM7QUFDNUMsK0ZBQStGO0FBQy9GLHdEQUF3RDtBQUV4RDs7R0FFRztBQWlCSCxNQUFNLE9BQU8sV0FBWSxTQUFRLGdCQUFnQjs7K0dBQXBDLFdBQVc7bUdBQVgsV0FBVyxrU0FGWCxDQUFDLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFDLENBQUMsNEVDaERoRSxpVEFTQTtrR0R5Q2EsV0FBVztrQkFoQnZCLFNBQVM7K0JBQ0UsY0FBYyxZQUNkLGFBQWEsaUJBRVIsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxVQUN2QyxDQUFDLFVBQVUsQ0FBQyxRQUVkO3dCQUNKLE9BQU8sRUFBRSxrQkFBa0I7d0JBQzNCLGFBQWEsRUFBRSx5QkFBeUI7d0JBQ3hDLHNCQUFzQixFQUFFLHFDQUFxQzt3QkFDN0Qsd0JBQXdCLEVBQUUsMEJBQTBCO3FCQUNyRCxhQUNVLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsYUFBYSxFQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge19NYXRPcHRncm91cEJhc2UsIE1BVF9PUFRHUk9VUH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbi8vIE5vdGVzIG9uIHRoZSBhY2Nlc3NpYmlsaXR5IHBhdHRlcm4gdXNlZCBmb3IgYG1hdC1vcHRncm91cGAuXG4vLyBUaGUgb3B0aW9uIGdyb3VwIGhhcyB0d28gZGlmZmVyZW50IFwibW9kZXNcIjogcmVndWxhciBhbmQgaW5lcnQuIFRoZSByZWd1bGFyIG1vZGUgdXNlcyB0aGVcbi8vIHJlY29tbWVuZGVkIGExMXkgcGF0dGVybiB3aGljaCBoYXMgYHJvbGU9XCJncm91cFwiYCBvbiB0aGUgZ3JvdXAgZWxlbWVudCB3aXRoIGBhcmlhLWxhYmVsbGVkYnlgXG4vLyBwb2ludGluZyB0byB0aGUgbGFiZWwuIFRoaXMgd29ya3MgZm9yIGBtYXQtc2VsZWN0YCwgYnV0IGl0IHNlZW1zIHRvIGhpdCBhIGJ1ZyBmb3IgYXV0b2NvbXBsZXRlXG4vLyB1bmRlciBWb2ljZU92ZXIgd2hlcmUgdGhlIGdyb3VwIGRvZXNuJ3QgZ2V0IHJlYWQgb3V0IGF0IGFsbC4gVGhlIGJ1ZyBhcHBlYXJzIHRvIGJlIHRoYXQgaWZcbi8vIHRoZXJlJ3MgX19hbnlfXyBhMTF5LXJlbGF0ZWQgYXR0cmlidXRlIG9uIHRoZSBncm91cCAoZS5nLiBgcm9sZWAgb3IgYGFyaWEtbGFiZWxsZWRieWApLFxuLy8gVm9pY2VPdmVyIG9uIFNhZmFyaSB3b24ndCByZWFkIGl0IG91dC5cbi8vIFdlJ3ZlIGludHJvZHVjZWQgdGhlIGBpbmVydGAgbW9kZSBhcyBhIHdvcmthcm91bmQuIFVuZGVyIHRoaXMgbW9kZSwgYWxsIGExMXkgYXR0cmlidXRlcyBhcmVcbi8vIHJlbW92ZWQgZnJvbSB0aGUgZ3JvdXAsIGFuZCB3ZSBnZXQgdGhlIHNjcmVlbiByZWFkZXIgdG8gcmVhZCBvdXQgdGhlIGdyb3VwIGxhYmVsIGJ5IG1pcnJvcmluZyBpdFxuLy8gaW5zaWRlIGFuIGludmlzaWJsZSBlbGVtZW50IGluIHRoZSBvcHRpb24uIFRoaXMgaXMgc3ViLW9wdGltYWwsIGJlY2F1c2UgdGhlIHNjcmVlbiByZWFkZXIgd2lsbFxuLy8gcmVwZWF0IHRoZSBncm91cCBsYWJlbCBvbiBlYWNoIG5hdmlnYXRpb24sIHdoZXJlYXMgdGhlIGRlZmF1bHQgcGF0dGVybiBvbmx5IHJlYWRzIHRoZSBncm91cCB3aGVuXG4vLyB0aGUgdXNlciBlbnRlcnMgYSBuZXcgZ3JvdXAuIFRoZSBmb2xsb3dpbmcgYWx0ZXJuYXRlIGFwcHJvYWNoZXMgd2VyZSBjb25zaWRlcmVkOlxuLy8gMS4gUmVhZGluZyBvdXQgdGhlIGdyb3VwIGxhYmVsIHVzaW5nIHRoZSBgTGl2ZUFubm91bmNlcmAgc29sdmVzIHRoZSBwcm9ibGVtLCBidXQgd2UgY2FuJ3QgY29udHJvbFxuLy8gICAgd2hlbiB0aGUgdGV4dCB3aWxsIGJlIHJlYWQgb3V0IHNvIHNvbWV0aW1lcyBpdCBjb21lcyBpbiB0b28gbGF0ZSBvciBuZXZlciBpZiB0aGUgdXNlclxuLy8gICAgbmF2aWdhdGVzIHF1aWNrbHkuXG4vLyAyLiBgPG1hdC1vcHRpb24gYXJpYS1kZXNjcmliZWRieT1cImdyb3VwTGFiZWxcImAgLSBUaGlzIHdvcmtzIG9uIFNhZmFyaSwgYnV0IFZvaWNlT3ZlciBpbiBDaHJvbWVcbi8vICAgIHdvbid0IHJlYWQgb3V0IHRoZSBkZXNjcmlwdGlvbiBhdCBhbGwuXG4vLyAzLiBgPG1hdC1vcHRpb24gYXJpYS1sYWJlbGxlZGJ5PVwib3B0aW9uTGFiZWwgZ3JvdXBMYWJlbFwiYCAtIFRoaXMgd29ya3Mgb24gQ2hyb21lLCBidXQgU2FmYXJpXG4vLyAgICAgZG9lc24ndCByZWFkIG91dCB0aGUgdGV4dCBhdCBhbGwuIEZ1cnRoZXJtb3JlLCBvblxuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGlzIHVzZWQgdG8gZ3JvdXAgaW5zdGFuY2VzIG9mIGBtYXQtb3B0aW9uYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LW9wdGdyb3VwJyxcbiAgZXhwb3J0QXM6ICdtYXRPcHRncm91cCcsXG4gIHRlbXBsYXRlVXJsOiAnb3B0Z3JvdXAuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgc3R5bGVVcmxzOiBbJ29wdGdyb3VwLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtb3B0Z3JvdXAnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdfaW5lcnQgPyBudWxsIDogXCJncm91cFwiJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnX2luZXJ0ID8gbnVsbCA6IGRpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ19pbmVydCA/IG51bGwgOiBfbGFiZWxJZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfT1BUR1JPVVAsIHVzZUV4aXN0aW5nOiBNYXRPcHRncm91cH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRPcHRncm91cCBleHRlbmRzIF9NYXRPcHRncm91cEJhc2Uge31cbiIsIjxzcGFuXG4gIGNsYXNzPVwibWF0LW1kYy1vcHRncm91cC1sYWJlbFwiXG4gIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gIFtjbGFzcy5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIFtpZF09XCJfbGFiZWxJZFwiPlxuICA8c3BhbiBjbGFzcz1cIm1kYy1saXN0LWl0ZW1fX3ByaW1hcnktdGV4dFwiPnt7IGxhYmVsIH19IDxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XG48L3NwYW4+XG5cbjxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC1vcHRpb24sIG5nLWNvbnRhaW5lclwiPjwvbmctY29udGVudD5cbiJdfQ==