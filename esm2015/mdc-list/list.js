/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, ContentChildren, Directive, ElementRef, NgZone, QueryList, ViewEncapsulation } from '@angular/core';
import { MatLine } from '@angular/material/core';
import { MatListBase, MatListItemBase } from './list-base';
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
let MatListAvatarCssMatStyler = /** @class */ (() => {
    class MatListAvatarCssMatStyler {
    }
    MatListAvatarCssMatStyler.decorators = [
        { type: Directive, args: [{
                    selector: '[mat-list-avatar], [matListAvatar]',
                    host: { 'class': 'mat-mdc-list-avatar mdc-list-item__graphic' }
                },] }
    ];
    return MatListAvatarCssMatStyler;
})();
export { MatListAvatarCssMatStyler };
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
let MatListIconCssMatStyler = /** @class */ (() => {
    class MatListIconCssMatStyler {
    }
    MatListIconCssMatStyler.decorators = [
        { type: Directive, args: [{
                    selector: '[mat-list-icon], [matListIcon]',
                    host: { 'class': 'mat-mdc-list-icon mdc-list-item__graphic' }
                },] }
    ];
    return MatListIconCssMatStyler;
})();
export { MatListIconCssMatStyler };
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
let MatListSubheaderCssMatStyler = /** @class */ (() => {
    class MatListSubheaderCssMatStyler {
    }
    MatListSubheaderCssMatStyler.decorators = [
        { type: Directive, args: [{
                    selector: '[mat-subheader], [matSubheader]',
                    // TODO(mmalerba): MDC's subheader font looks identical to the list item font, figure out why and
                    //  make a change in one of the repos to visually distinguish.
                    host: { 'class': 'mat-mdc-subheader mdc-list-group__subheader' }
                },] }
    ];
    return MatListSubheaderCssMatStyler;
})();
export { MatListSubheaderCssMatStyler };
let MatList = /** @class */ (() => {
    class MatList extends MatListBase {
        constructor() {
            super(...arguments);
            this._isNonInteractive = true;
        }
    }
    MatList.decorators = [
        { type: Component, args: [{
                    selector: 'mat-list',
                    exportAs: 'matList',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-mdc-list mat-mdc-list-base mdc-list',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        { provide: MatListBase, useExisting: MatList },
                    ],
                    styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;padding:0 16px;overflow:hidden}.mdc-list-item:focus{outline:none}.mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor}.mdc-list-item[dir=rtl] .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list-item__graphic{margin-left:32px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:36px;width:20px;height:20px}.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic{margin-left:36px;margin-right:0}.mdc-list--avatar-list .mdc-list-item{height:56px}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic{margin-left:16px;margin-right:0}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:20px;width:36px;height:36px}.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:20px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin:0 16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.mdc-list-group[dir=rtl] .mdc-list-divider--inset,[dir=rtl] .mdc-list-group .mdc-list-divider--inset{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{width:calc(100% - 72px - 16px)}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem) / 2) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{content:\"\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}\n"]
                }] }
    ];
    return MatList;
})();
export { MatList };
let MatListItem = /** @class */ (() => {
    class MatListItem extends MatListItemBase {
        constructor(element, ngZone, listBase, platform) {
            super(element, ngZone, listBase, platform);
        }
    }
    MatListItem.decorators = [
        { type: Component, args: [{
                    selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
                    exportAs: 'matListItem',
                    host: {
                        'class': 'mat-mdc-list-item mdc-list-item',
                    },
                    template: "<ng-content select=\"[mat-list-avatar],[matListAvatar],[mat-list-icon],[matListIcon]\"></ng-content>\n\n<!-- If lines were explicitly given, use those as the text. -->\n<ng-container *ngIf=\"lines.length\">\n  <span class=\"mdc-list-item__text\"><ng-content select=\"[mat-line],[matLine]\"></ng-content></span>\n</ng-container>\n\n<!--\n  If lines were not explicitly given, assume the remaining content is the text, otherwise assume it\n  is an action that belongs in the \"meta\" section.\n-->\n<span [class.mdc-list-item__text]=\"!lines.length\" [class.mdc-list-item__meta]=\"lines.length\">\n  <ng-content></ng-content>\n</span>\n\n<ng-content select=\"mat-divider\"></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    MatListItem.ctorParameters = () => [
        { type: ElementRef },
        { type: NgZone },
        { type: MatListBase },
        { type: Platform }
    ];
    MatListItem.propDecorators = {
        lines: [{ type: ContentChildren, args: [MatLine, { read: ElementRef, descendants: true },] }]
    };
    return MatListItem;
})();
export { MatListItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWxpc3QvbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxXQUFXLEVBQUUsZUFBZSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXpEOzs7R0FHRztBQUNIO0lBQUEsTUFJYSx5QkFBeUI7OztnQkFKckMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQ0FBb0M7b0JBQzlDLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSw0Q0FBNEMsRUFBQztpQkFDOUQ7O0lBQ3VDLGdDQUFDO0tBQUE7U0FBNUIseUJBQXlCO0FBRXRDOzs7R0FHRztBQUNIO0lBQUEsTUFJYSx1QkFBdUI7OztnQkFKbkMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQ0FBZ0M7b0JBQzFDLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSwwQ0FBMEMsRUFBQztpQkFDNUQ7O0lBQ3FDLDhCQUFDO0tBQUE7U0FBMUIsdUJBQXVCO0FBRXBDOzs7R0FHRztBQUNIO0lBQUEsTUFNYSw0QkFBNEI7OztnQkFOeEMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQ0FBaUM7b0JBQzNDLGlHQUFpRztvQkFDakcsOERBQThEO29CQUM5RCxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsNkNBQTZDLEVBQUM7aUJBQy9EOztJQUMwQyxtQ0FBQztLQUFBO1NBQS9CLDRCQUE0QjtBQUV6QztJQUFBLE1BY2EsT0FBUSxTQUFRLFdBQVc7UUFkeEM7O1lBZUUsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzNCLENBQUM7OztnQkFoQkEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSx5Q0FBeUM7cUJBQ25EO29CQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsU0FBUyxFQUFFO3dCQUNULEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFDO3FCQUM3Qzs7aUJBQ0Y7O0lBR0QsY0FBQztLQUFBO1NBRlksT0FBTztBQUlwQjtJQUFBLE1BVWEsV0FBWSxTQUFRLGVBQWU7UUFJOUMsWUFBWSxPQUFtQixFQUFFLE1BQWMsRUFBRSxRQUFxQixFQUFFLFFBQWtCO1lBQ3hGLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3QyxDQUFDOzs7Z0JBaEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0RBQXdEO29CQUNsRSxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxpQ0FBaUM7cUJBQzNDO29CQUNELDByQkFBNkI7b0JBQzdCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBbkVDLFVBQVU7Z0JBQ1YsTUFBTTtnQkFLQSxXQUFXO2dCQVpYLFFBQVE7Ozt3QkEyRWIsZUFBZSxTQUFDLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBQzs7SUFNakUsa0JBQUM7S0FBQTtTQVBZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBOZ1pvbmUsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdExpbmV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRMaXN0QmFzZSwgTWF0TGlzdEl0ZW1CYXNlfSBmcm9tICcuL2xpc3QtYmFzZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHdob3NlIHB1cnBvc2UgaXMgdG8gYWRkIHRoZSBtYXQtIENTUyBzdHlsaW5nIHRvIHRoaXMgc2VsZWN0b3IuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtbGlzdC1hdmF0YXJdLCBbbWF0TGlzdEF2YXRhcl0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtbGlzdC1hdmF0YXIgbWRjLWxpc3QtaXRlbV9fZ3JhcGhpYyd9XG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIge31cblxuLyoqXG4gKiBEaXJlY3RpdmUgd2hvc2UgcHVycG9zZSBpcyB0byBhZGQgdGhlIG1hdC0gQ1NTIHN0eWxpbmcgdG8gdGhpcyBzZWxlY3Rvci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1saXN0LWljb25dLCBbbWF0TGlzdEljb25dJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWxpc3QtaWNvbiBtZGMtbGlzdC1pdGVtX19ncmFwaGljJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdEljb25Dc3NNYXRTdHlsZXIge31cblxuLyoqXG4gKiBEaXJlY3RpdmUgd2hvc2UgcHVycG9zZSBpcyB0byBhZGQgdGhlIG1hdC0gQ1NTIHN0eWxpbmcgdG8gdGhpcyBzZWxlY3Rvci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdC1zdWJoZWFkZXJdLCBbbWF0U3ViaGVhZGVyXScsXG4gIC8vIFRPRE8obW1hbGVyYmEpOiBNREMncyBzdWJoZWFkZXIgZm9udCBsb29rcyBpZGVudGljYWwgdG8gdGhlIGxpc3QgaXRlbSBmb250LCBmaWd1cmUgb3V0IHdoeSBhbmRcbiAgLy8gIG1ha2UgYSBjaGFuZ2UgaW4gb25lIG9mIHRoZSByZXBvcyB0byB2aXN1YWxseSBkaXN0aW5ndWlzaC5cbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLXN1YmhlYWRlciBtZGMtbGlzdC1ncm91cF9fc3ViaGVhZGVyJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlciB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtbGlzdCcsXG4gIGV4cG9ydEFzOiAnbWF0TGlzdCcsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1saXN0IG1hdC1tZGMtbGlzdC1iYXNlIG1kYy1saXN0JyxcbiAgfSxcbiAgc3R5bGVVcmxzOiBbJ2xpc3QuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTWF0TGlzdEJhc2UsIHVzZUV4aXN0aW5nOiBNYXRMaXN0fSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0IGV4dGVuZHMgTWF0TGlzdEJhc2Uge1xuICBfaXNOb25JbnRlcmFjdGl2ZSA9IHRydWU7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1saXN0LWl0ZW0sIGFbbWF0LWxpc3QtaXRlbV0sIGJ1dHRvblttYXQtbGlzdC1pdGVtXScsXG4gIGV4cG9ydEFzOiAnbWF0TGlzdEl0ZW0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtbGlzdC1pdGVtIG1kYy1saXN0LWl0ZW0nLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogJ2xpc3QtaXRlbS5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RJdGVtIGV4dGVuZHMgTWF0TGlzdEl0ZW1CYXNlIHtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRMaW5lLCB7cmVhZDogRWxlbWVudFJlZiwgZGVzY2VuZGFudHM6IHRydWV9KSBsaW5lczpcbiAgICAgIFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PjtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBuZ1pvbmU6IE5nWm9uZSwgbGlzdEJhc2U6IE1hdExpc3RCYXNlLCBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcbiAgICBzdXBlcihlbGVtZW50LCBuZ1pvbmUsIGxpc3RCYXNlLCBwbGF0Zm9ybSk7XG4gIH1cbn1cbiJdfQ==