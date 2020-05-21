/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatList } from './list';
import { MatListBase } from './list-base';
let MatNavList = /** @class */ (() => {
    var MatNavList_1;
    let MatNavList = MatNavList_1 = class MatNavList extends MatListBase {
    };
    MatNavList = MatNavList_1 = __decorate([
        Component({
            selector: 'mat-nav-list',
            /**
             * @deprecated `matList` export will be removed, use `matNavList`
             * @breaking-change 11.0.0
             */
            exportAs: 'matNavList, matList',
            template: '<ng-content></ng-content>',
            host: {
                'class': 'mat-mdc-nav-list mat-mdc-list-base mdc-list',
            },
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [
                { provide: MatListBase, useExisting: MatNavList_1 },
                /**
                 * @deprecated Provider for `MatList` will be removed, use `MatNavList` instead.
                 * @breaking-change 11.0.0
                 */
                { provide: MatList, useExisting: MatNavList_1 },
            ],
            styles: [".mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;padding:0 16px;overflow:hidden}.mdc-list-item:focus{outline:none}.mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor}.mdc-list-item[dir=rtl] .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list-item__graphic{margin-left:32px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:36px;width:20px;height:20px}.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic{margin-left:36px;margin-right:0}.mdc-list--avatar-list .mdc-list-item{height:56px}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic{margin-left:16px;margin-right:0}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:20px;width:36px;height:36px}.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:20px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider--padded{margin:0 16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.mdc-list-group[dir=rtl] .mdc-list-divider--inset,[dir=rtl] .mdc-list-group .mdc-list-divider--inset{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{width:calc(100% - 72px - 16px)}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{margin:calc((3rem - 1.5rem) / 2) 16px}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text),.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text){margin:0}.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text,.mat-mdc-list-base .mdc-list-item__text>:not(.mdc-list-item__primary-text).mdc-list-item__secondary-text{margin-top:-3px}.mat-mdc-2-line{height:72px}.mat-mdc-2-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-3-line{height:88px}.mat-mdc-3-line .mdc-list-item__text{align-self:flex-start}.mat-mdc-list-avatar{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list-item .mat-mdc-list-avatar{margin-left:16px;margin-right:0}.mat-mdc-list-avatar{object-fit:cover}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{content:\"\";position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}\n"]
        })
    ], MatNavList);
    return MatNavList;
})();
export { MatNavList };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1saXN0L25hdi1saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDL0IsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQXlCeEM7O0lBQUEsSUFBYSxVQUFVLGtCQUF2QixNQUFhLFVBQVcsU0FBUSxXQUFXO0tBQUcsQ0FBQTtJQUFqQyxVQUFVO1FBdkJ0QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsY0FBYztZQUN4Qjs7O2VBR0c7WUFDSCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSw2Q0FBNkM7YUFDdkQ7WUFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFVLEVBQUM7Z0JBQy9DOzs7bUJBR0c7Z0JBQ0gsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFVLEVBQUM7YUFDNUM7O1NBQ0YsQ0FBQztPQUNXLFVBQVUsQ0FBdUI7SUFBRCxpQkFBQztLQUFBO1NBQWpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdExpc3R9IGZyb20gJy4vbGlzdCc7XG5pbXBvcnQge01hdExpc3RCYXNlfSBmcm9tICcuL2xpc3QtYmFzZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1uYXYtbGlzdCcsXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBgbWF0TGlzdGAgZXhwb3J0IHdpbGwgYmUgcmVtb3ZlZCwgdXNlIGBtYXROYXZMaXN0YFxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDExLjAuMFxuICAgKi9cbiAgZXhwb3J0QXM6ICdtYXROYXZMaXN0LCBtYXRMaXN0JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLW5hdi1saXN0IG1hdC1tZGMtbGlzdC1iYXNlIG1kYy1saXN0JyxcbiAgfSxcbiAgc3R5bGVVcmxzOiBbJ2xpc3QuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTWF0TGlzdEJhc2UsIHVzZUV4aXN0aW5nOiBNYXROYXZMaXN0fSxcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBQcm92aWRlciBmb3IgYE1hdExpc3RgIHdpbGwgYmUgcmVtb3ZlZCwgdXNlIGBNYXROYXZMaXN0YCBpbnN0ZWFkLlxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgMTEuMC4wXG4gICAgICovXG4gICAge3Byb3ZpZGU6IE1hdExpc3QsIHVzZUV4aXN0aW5nOiBNYXROYXZMaXN0fSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXROYXZMaXN0IGV4dGVuZHMgTWF0TGlzdEJhc2Uge31cbiJdfQ==