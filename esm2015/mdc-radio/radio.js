/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, forwardRef, Inject, Optional, QueryList, ViewEncapsulation, } from '@angular/core';
import { MDCRadioFoundation } from '@material/radio';
import { MAT_RADIO_DEFAULT_OPTIONS, _MatRadioButtonBase, MatRadioGroup as BaseMatRadioGroup, } from '@angular/material/radio';
import { FocusMonitor } from '@angular/cdk/a11y';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { numbers } from '@material/ripple';
// Re-export symbols used by the base Material radio component so that users do not need to depend
// on both packages.
export { MatRadioChange, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export const MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatRadioGroup),
    multi: true
};
/** Configuration for the ripple animation. */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS
};
/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
let MatRadioGroup = /** @class */ (() => {
    let MatRadioGroup = class MatRadioGroup extends BaseMatRadioGroup {
    };
    __decorate([
        ContentChildren(forwardRef(() => MatRadioButton), { descendants: true }),
        __metadata("design:type", QueryList)
    ], MatRadioGroup.prototype, "_radios", void 0);
    MatRadioGroup = __decorate([
        Directive({
            selector: 'mat-radio-group',
            exportAs: 'matRadioGroup',
            providers: [MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'radiogroup',
                'class': 'mat-mdc-radio-group',
                '[class.mat-radio-group]': 'false',
            },
        })
    ], MatRadioGroup);
    return MatRadioGroup;
})();
export { MatRadioGroup };
let MatRadioButton = /** @class */ (() => {
    let MatRadioButton = class MatRadioButton extends _MatRadioButtonBase {
        constructor(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, _animationMode, _providerOverride) {
            super(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, _animationMode, _providerOverride);
            this._radioAdapter = {
                addClass: (className) => this._setClass(className, true),
                removeClass: (className) => this._setClass(className, false),
                setNativeControlDisabled: (disabled) => {
                    if (this.disabled !== disabled) {
                        this.disabled = disabled;
                        this._changeDetector.markForCheck();
                    }
                },
            };
            /** Configuration for the underlying ripple. */
            this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
            this._radioFoundation = new MDCRadioFoundation(this._radioAdapter);
            this._classes = {};
        }
        ngAfterViewInit() {
            super.ngAfterViewInit();
            this._radioFoundation.init();
        }
        ngOnDestroy() {
            super.ngOnDestroy();
            this._radioFoundation.destroy();
        }
        _setClass(cssClass, active) {
            this._classes = Object.assign(Object.assign({}, this._classes), { [cssClass]: active });
            this._changeDetector.markForCheck();
        }
        /**
         * Overrides the parent function so that the foundation can be set with the current disabled
         * state.
         */
        _setDisabled(value) {
            super._setDisabled(value);
            this._radioFoundation.setDisabled(this.disabled);
        }
    };
    MatRadioButton = __decorate([
        Component({
            selector: 'mat-radio-button',
            template: "<div class=\"mdc-form-field\" #formField\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <div class=\"mdc-radio\" [ngClass]=\"_classes\">\n    <input #input class=\"mdc-radio__native-control\" type=\"radio\"\n           [id]=\"inputId\"\n           [checked]=\"checked\"\n           [disabled]=\"disabled\"\n           [tabIndex]=\"tabIndex\"\n           [attr.name]=\"name\"\n           [attr.value]=\"value\"\n           [required]=\"required\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-describedby]=\"ariaDescribedby\"\n           (change)=\"_onInputChange($event)\">\n    <div class=\"mdc-radio__background\">\n      <div class=\"mdc-radio__outer-circle\"></div>\n      <div class=\"mdc-radio__inner-circle\"></div>\n    </div>\n    <div class=\"mdc-radio__ripple\"></div>\n    <div mat-ripple class=\"mat-radio-ripple mat-mdc-focus-indicator\"\n         [matRippleTrigger]=\"formField\"\n         [matRippleDisabled]=\"_isRippleDisabled()\"\n         [matRippleCentered]=\"true\"\n         [matRippleAnimation]=\"_rippleAnimation\">\n      <div class=\"mat-ripple-element mat-radio-persistent-ripple\"></div>\n    </div>\n  </div>\n  <label [for]=\"inputId\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
            host: {
                'class': 'mat-mdc-radio-button',
                '[attr.id]': 'id',
                '[class.mat-primary]': 'color === "primary"',
                '[class.mat-accent]': 'color === "accent"',
                '[class.mat-warn]': 'color === "warn"',
                '[attr.tabindex]': 'disabled ? null : -1',
                '[attr.aria-label]': 'null',
                '[attr.aria-labelledby]': 'null',
                '[attr.aria-describedby]': 'null',
                // Note: under normal conditions focus shouldn't land on this element, however it may be
                // programmatically set, for example inside of a focus trap, in this case we want to forward
                // the focus to the native element.
                '(focus)': '_inputElement.nativeElement.focus()',
            },
            inputs: ['disableRipple', 'tabIndex'],
            exportAs: 'matRadioButton',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".mdc-touch-target-wrapper{display:inline}.mdc-radio{padding:10px;display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mdc-radio .mdc-radio__background::before{top:-10px;left:-10px;width:40px;height:40px}.mdc-radio .mdc-radio__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mat-mdc-radio-button .mat-radio-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:50%}.mat-mdc-radio-button .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple){opacity:.14}.cdk-high-contrast-active .mat-mdc-radio-button.cdk-keyboard-focused .mat-radio-ripple{outline:dotted 1px}.cdk-high-contrast-active :host .mat-mdc-radio-button.cdk-keyboard-focused .mat-radio-ripple{outline:dotted 1px}\n"]
        }),
        __param(0, Optional()),
        __param(5, Optional()), __param(5, Inject(ANIMATION_MODULE_TYPE)),
        __param(6, Optional()), __param(6, Inject(MAT_RADIO_DEFAULT_OPTIONS)),
        __metadata("design:paramtypes", [MatRadioGroup,
            ElementRef,
            ChangeDetectorRef,
            FocusMonitor,
            UniqueSelectionDispatcher, String, Object])
    ], MatRadioButton);
    return MatRadioButton;
})();
export { MatRadioButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1yYWRpby9yYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixNQUFNLEVBRU4sUUFBUSxFQUNSLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFrQixrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3BFLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsbUJBQW1CLEVBRW5CLGFBQWEsSUFBSSxpQkFBaUIsR0FDbkMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRXpDLGtHQUFrRztBQUNsRyxvQkFBb0I7QUFDcEIsT0FBTyxFQUFDLGNBQWMsRUFBRSx5QkFBeUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRWxGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxzQ0FBc0MsR0FBUTtJQUN6RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQzVDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLDhD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Y0FBYztRQXhCMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixzekNBQXlCO1lBRXpCLElBQUksRUFBRTtnQkFDSixPQUFPLEVBQUUsc0JBQXNCO2dCQUMvQixXQUFXLEVBQUUsSUFBSTtnQkFDakIscUJBQXFCLEVBQUUscUJBQXFCO2dCQUM1QyxvQkFBb0IsRUFBRSxvQkFBb0I7Z0JBQzFDLGtCQUFrQixFQUFFLGtCQUFrQjtnQkFDdEMsaUJBQWlCLEVBQUUsc0JBQXNCO2dCQUN6QyxtQkFBbUIsRUFBRSxNQUFNO2dCQUMzQix3QkFBd0IsRUFBRSxNQUFNO2dCQUNoQyx5QkFBeUIsRUFBRSxNQUFNO2dCQUNqQyx3RkFBd0Y7Z0JBQ3hGLDRGQUE0RjtnQkFDNUYsbUNBQW1DO2dCQUNuQyxTQUFTLEVBQUUscUNBQXFDO2FBQ2pEO1lBQ0QsTUFBTSxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQztZQUNyQyxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO1FBb0JhLFdBQUEsUUFBUSxFQUFFLENBQUE7UUFLVixXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUN6QyxXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQTt5Q0FOdEIsYUFBYTtZQUN6QixVQUFVO1lBQ0wsaUJBQWlCO1lBQ25CLFlBQVk7WUFDVCx5QkFBeUI7T0F2QjVDLGNBQWMsQ0FzRDFCO0lBQUQscUJBQUM7S0FBQTtTQXREWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBRdWVyeUxpc3QsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TURDUmFkaW9BZGFwdGVyLCBNRENSYWRpb0ZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9yYWRpbyc7XG5pbXBvcnQge1xuICBNQVRfUkFESU9fREVGQVVMVF9PUFRJT05TLFxuICBfTWF0UmFkaW9CdXR0b25CYXNlLFxuICBNYXRSYWRpb0RlZmF1bHRPcHRpb25zLFxuICBNYXRSYWRpb0dyb3VwIGFzIEJhc2VNYXRSYWRpb0dyb3VwLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XG5pbXBvcnQge0ZvY3VzTW9uaXRvcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1JpcHBsZUFuaW1hdGlvbkNvbmZpZ30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUnO1xuXG4vLyBSZS1leHBvcnQgc3ltYm9scyB1c2VkIGJ5IHRoZSBiYXNlIE1hdGVyaWFsIHJhZGlvIGNvbXBvbmVudCBzbyB0aGF0IHVzZXJzIGRvIG5vdCBuZWVkIHRvIGRlcGVuZFxuLy8gb24gYm90aCBwYWNrYWdlcy5cbmV4cG9ydCB7TWF0UmFkaW9DaGFuZ2UsIE1BVF9SQURJT19ERUZBVUxUX09QVElPTlN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcblxuLyoqXG4gKiBQcm92aWRlciBFeHByZXNzaW9uIHRoYXQgYWxsb3dzIG1hdC1yYWRpby1ncm91cCB0byByZWdpc3RlciBhcyBhIENvbnRyb2xWYWx1ZUFjY2Vzc29yLiBUaGlzXG4gKiBhbGxvd3MgaXQgdG8gc3VwcG9ydCBbKG5nTW9kZWwpXSBhbmQgbmdDb250cm9sLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUFUX1JBRElPX0dST1VQX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdFJhZGlvR3JvdXApLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSByaXBwbGUgYW5pbWF0aW9uLiAqL1xuY29uc3QgUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgZXhpdER1cmF0aW9uOiBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NU1xufTtcblxuLyoqXG4gKiBBIGdyb3VwIG9mIHJhZGlvIGJ1dHRvbnMuIE1heSBjb250YWluIG9uZSBvciBtb3JlIGA8bWF0LXJhZGlvLWJ1dHRvbj5gIGVsZW1lbnRzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtcmFkaW8tZ3JvdXAnLFxuICBleHBvcnRBczogJ21hdFJhZGlvR3JvdXAnLFxuICBwcm92aWRlcnM6IFtNQVRfUkFESU9fR1JPVVBfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdyYWRpb2dyb3VwJyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1yYWRpby1ncm91cCcsXG4gICAgJ1tjbGFzcy5tYXQtcmFkaW8tZ3JvdXBdJzogJ2ZhbHNlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UmFkaW9Hcm91cCBleHRlbmRzIEJhc2VNYXRSYWRpb0dyb3VwIHtcbiAgLyoqIENoaWxkIHJhZGlvIGJ1dHRvbnMuICovXG4gIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBNYXRSYWRpb0J1dHRvbiksIHtkZXNjZW5kYW50czogdHJ1ZX0pXG4gICAgICBfcmFkaW9zOiBRdWVyeUxpc3Q8X01hdFJhZGlvQnV0dG9uQmFzZT47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1yYWRpby1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJ3JhZGlvLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncmFkaW8uY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1yYWRpby1idXR0b24nLFxuICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICdbY2xhc3MubWF0LXByaW1hcnldJzogJ2NvbG9yID09PSBcInByaW1hcnlcIicsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdjb2xvciA9PT0gXCJhY2NlbnRcIicsXG4gICAgJ1tjbGFzcy5tYXQtd2Fybl0nOiAnY29sb3IgPT09IFwid2FyblwiJyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IC0xJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbF0nOiAnbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ251bGwnLFxuICAgIC8vIE5vdGU6IHVuZGVyIG5vcm1hbCBjb25kaXRpb25zIGZvY3VzIHNob3VsZG4ndCBsYW5kIG9uIHRoaXMgZWxlbWVudCwgaG93ZXZlciBpdCBtYXkgYmVcbiAgICAvLyBwcm9ncmFtbWF0aWNhbGx5IHNldCwgZm9yIGV4YW1wbGUgaW5zaWRlIG9mIGEgZm9jdXMgdHJhcCwgaW4gdGhpcyBjYXNlIHdlIHdhbnQgdG8gZm9yd2FyZFxuICAgIC8vIHRoZSBmb2N1cyB0byB0aGUgbmF0aXZlIGVsZW1lbnQuXG4gICAgJyhmb2N1cyknOiAnX2lucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCknLFxuICB9LFxuICBpbnB1dHM6IFsnZGlzYWJsZVJpcHBsZScsICd0YWJJbmRleCddLFxuICBleHBvcnRBczogJ21hdFJhZGlvQnV0dG9uJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFJhZGlvQnV0dG9uIGV4dGVuZHMgX01hdFJhZGlvQnV0dG9uQmFzZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBfcmFkaW9BZGFwdGVyOiBNRENSYWRpb0FkYXB0ZXIgPSB7XG4gICAgYWRkQ2xhc3M6IChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5fc2V0Q2xhc3MoY2xhc3NOYW1lLCB0cnVlKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBzZXROYXRpdmVDb250cm9sRGlzYWJsZWQ6IChkaXNhYmxlZDogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgIT09IGRpc2FibGVkKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICAvKiogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgcmlwcGxlLiAqL1xuICBfcmlwcGxlQW5pbWF0aW9uOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRztcblxuICBfcmFkaW9Gb3VuZGF0aW9uID0gbmV3IE1EQ1JhZGlvRm91bmRhdGlvbih0aGlzLl9yYWRpb0FkYXB0ZXIpO1xuICBfY2xhc3Nlczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0ge307XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcmFkaW9Hcm91cDogTWF0UmFkaW9Hcm91cCxcbiAgICAgICAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICAgICAgICBfcmFkaW9EaXNwYXRjaGVyOiBVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1JBRElPX0RFRkFVTFRfT1BUSU9OUylcbiAgICAgICAgICAgICAgX3Byb3ZpZGVyT3ZlcnJpZGU/OiBNYXRSYWRpb0RlZmF1bHRPcHRpb25zKSB7XG4gICAgc3VwZXIocmFkaW9Hcm91cCwgZWxlbWVudFJlZiwgX2NoYW5nZURldGVjdG9yLCBfZm9jdXNNb25pdG9yLFxuICAgICAgICBfcmFkaW9EaXNwYXRjaGVyLCBfYW5pbWF0aW9uTW9kZSwgX3Byb3ZpZGVyT3ZlcnJpZGUpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIHRoaXMuX3JhZGlvRm91bmRhdGlvbi5pbml0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX3JhZGlvRm91bmRhdGlvbi5kZXN0cm95KCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jbGFzc2VzID0gey4uLnRoaXMuX2NsYXNzZXMsIFtjc3NDbGFzc106IGFjdGl2ZX07XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIHRoZSBwYXJlbnQgZnVuY3Rpb24gc28gdGhhdCB0aGUgZm91bmRhdGlvbiBjYW4gYmUgc2V0IHdpdGggdGhlIGN1cnJlbnQgZGlzYWJsZWRcbiAgICogc3RhdGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX3NldERpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgc3VwZXIuX3NldERpc2FibGVkKHZhbHVlKTtcbiAgICB0aGlzLl9yYWRpb0ZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZCk7XG4gIH1cbn1cbiJdfQ==