/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, Optional, ViewEncapsulation } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MAT_ANCHOR_HOST, MAT_ANCHOR_INPUTS, MAT_BUTTON_HOST, MAT_BUTTON_INPUTS, MatAnchorBase, MatButtonBase } from './button-base';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
import * as i2 from "@angular/material-experimental/mdc-core";
/**
 * Material Design icon button component. This type of button displays a single interactive icon for
 * users to perform an action.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
export class MatIconButton extends MatButtonBase {
    constructor(elementRef, platform, ngZone, animationMode) {
        super(elementRef, platform, ngZone, animationMode);
        // Set the ripple to be centered for icon buttons
        this._isRippleCentered = true;
    }
}
MatIconButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatIconButton, deps: [{ token: i0.ElementRef }, { token: i1.Platform }, { token: i0.NgZone }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatIconButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatIconButton, selector: "button[mat-icon-button]", inputs: { disabled: "disabled", disableRipple: "disableRipple", color: "color" }, host: { properties: { "attr.disabled": "disabled || null", "class._mat-animation-noopable": "_animationMode === \"NoopAnimations\"", "class.mat-unthemed": "!color", "class.mat-mdc-button-base": "true" } }, exportAs: ["matButton"], usesInheritance: true, ngImport: i0, template: "<span\n    [class.mdc-button__ripple]=\"!_isFab\"\n    [class.mdc-fab__ripple]=\"_isFab\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-mdc-focus-indicator\"></span>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<span class=\"mat-mdc-button-touch-target\"></span>\n", styles: [".mdc-icon-button{font-size:24px;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--touch{margin-top:0px;margin-bottom:0px}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%;flex-shrink:0}.mat-mdc-icon-button .mdc-button__ripple::before,.mat-mdc-icon-button .mdc-button__ripple::after,.mat-mdc-icon-button .mdc-fab__ripple::before,.mat-mdc-icon-button .mdc-fab__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mdc-button__ripple,.mat-mdc-icon-button .mdc-fab__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-icon-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}._mat-animation-noopable.mat-mdc-icon-button{transition:none;animation:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n", ".cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-button-base:focus{outline:solid 3px}\n"], directives: [{ type: i2.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatIconButton, decorators: [{
            type: Component,
            args: [{ selector: `button[mat-icon-button]`, inputs: MAT_BUTTON_INPUTS, host: MAT_BUTTON_HOST, exportAs: 'matButton', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<span\n    [class.mdc-button__ripple]=\"!_isFab\"\n    [class.mdc-fab__ripple]=\"_isFab\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-mdc-focus-indicator\"></span>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<span class=\"mat-mdc-button-touch-target\"></span>\n", styles: [".mdc-icon-button{font-size:24px;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--touch{margin-top:0px;margin-bottom:0px}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%;flex-shrink:0}.mat-mdc-icon-button .mdc-button__ripple::before,.mat-mdc-icon-button .mdc-button__ripple::after,.mat-mdc-icon-button .mdc-fab__ripple::before,.mat-mdc-icon-button .mdc-fab__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mdc-button__ripple,.mat-mdc-icon-button .mdc-fab__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-icon-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}._mat-animation-noopable.mat-mdc-icon-button{transition:none;animation:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n", ".cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-button-base:focus{outline:solid 3px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Platform }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; } });
/**
 * Material Design icon button component for anchor elements. This button displays a single
 * interaction icon that allows users to navigate across different routes or pages.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
export class MatIconAnchor extends MatAnchorBase {
    constructor(elementRef, platform, ngZone, animationMode) {
        super(elementRef, platform, ngZone, animationMode);
        // Set the ripple to be centered for icon buttons
        this._isRippleCentered = true;
    }
}
MatIconAnchor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatIconAnchor, deps: [{ token: i0.ElementRef }, { token: i1.Platform }, { token: i0.NgZone }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatIconAnchor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatIconAnchor, selector: "a[mat-icon-button]", inputs: { disabled: "disabled", disableRipple: "disableRipple", color: "color", tabIndex: "tabIndex" }, host: { properties: { "attr.disabled": "disabled || null", "class._mat-animation-noopable": "_animationMode === \"NoopAnimations\"", "attr.tabindex": "disabled ? -1 : (tabIndex || 0)", "attr.aria-disabled": "disabled.toString()", "class.mat-unthemed": "!color", "class.mat-mdc-button-base": "true" } }, exportAs: ["matButton", "matAnchor"], usesInheritance: true, ngImport: i0, template: "<span\n    [class.mdc-button__ripple]=\"!_isFab\"\n    [class.mdc-fab__ripple]=\"_isFab\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-mdc-focus-indicator\"></span>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<span class=\"mat-mdc-button-touch-target\"></span>\n", styles: [".mdc-icon-button{font-size:24px;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--touch{margin-top:0px;margin-bottom:0px}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%;flex-shrink:0}.mat-mdc-icon-button .mdc-button__ripple::before,.mat-mdc-icon-button .mdc-button__ripple::after,.mat-mdc-icon-button .mdc-fab__ripple::before,.mat-mdc-icon-button .mdc-fab__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mdc-button__ripple,.mat-mdc-icon-button .mdc-fab__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-icon-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}._mat-animation-noopable.mat-mdc-icon-button{transition:none;animation:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n", ".cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-button-base:focus{outline:solid 3px}\n"], directives: [{ type: i2.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatIconAnchor, decorators: [{
            type: Component,
            args: [{ selector: `a[mat-icon-button]`, inputs: MAT_ANCHOR_INPUTS, host: MAT_ANCHOR_HOST, exportAs: 'matButton, matAnchor', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<span\n    [class.mdc-button__ripple]=\"!_isFab\"\n    [class.mdc-fab__ripple]=\"_isFab\"></span>\n\n<ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\">\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\">\n</ng-content>\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-mdc-focus-indicator\"></span>\n\n<span matRipple class=\"mat-mdc-button-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<span class=\"mat-mdc-button-touch-target\"></span>\n", styles: [".mdc-icon-button{font-size:24px;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--touch{margin-top:0px;margin-bottom:0px}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%;flex-shrink:0}.mat-mdc-icon-button .mdc-button__ripple::before,.mat-mdc-icon-button .mdc-button__ripple::after,.mat-mdc-icon-button .mdc-fab__ripple::before,.mat-mdc-icon-button .mdc-fab__ripple::after{content:\"\";pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mdc-button__ripple,.mat-mdc-icon-button .mdc-fab__ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mdc-button__label{z-index:1}.mat-mdc-icon-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-icon-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}._mat-animation-noopable.mat-mdc-icon-button{transition:none;animation:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:transparent;opacity:1}\n", ".cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-button-base:focus{outline:solid 3px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Platform }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1idXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1idXR0b24vaWNvbi1idXR0b24udHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1idXR0b24vYnV0dG9uLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsT0FBTyxFQUNMLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsYUFBYSxFQUNkLE1BQU0sZUFBZSxDQUFDOzs7O0FBRXZCOzs7O0dBSUc7QUFXSCxNQUFNLE9BQU8sYUFBYyxTQUFRLGFBQWE7SUFJOUMsWUFDSSxVQUFzQixFQUFFLFFBQWtCLEVBQUUsTUFBYyxFQUNmLGFBQXNCO1FBQ25FLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztRQU5yRCxpREFBaUQ7UUFDeEMsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO0lBTWxDLENBQUM7O2tIQVJVLGFBQWEsMEZBTUEscUJBQXFCO3NHQU5sQyxhQUFhLCtZQzVDMUIsNDRCQXdCQTttR0RvQmEsYUFBYTtrQkFWekIsU0FBUzsrQkFDRSx5QkFBeUIsVUFHM0IsaUJBQWlCLFFBQ25CLGVBQWUsWUFDWCxXQUFXLGlCQUNOLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07OzBCQVExQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLHFCQUFxQjs7QUFLL0M7Ozs7R0FJRztBQVdILE1BQU0sT0FBTyxhQUFjLFNBQVEsYUFBYTtJQUk5QyxZQUNJLFVBQXNCLEVBQUUsUUFBa0IsRUFBRSxNQUFjLEVBQ2YsYUFBc0I7UUFDbkUsS0FBSyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBTnJELGlEQUFpRDtRQUN4QyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7SUFNbEMsQ0FBQzs7a0hBUlUsYUFBYSwwRkFNQSxxQkFBcUI7c0dBTmxDLGFBQWEsOGdCQ3RFMUIsNDRCQXdCQTttR0Q4Q2EsYUFBYTtrQkFWekIsU0FBUzsrQkFDRSxvQkFBb0IsVUFHdEIsaUJBQWlCLFFBQ25CLGVBQWUsWUFDWCxzQkFBc0IsaUJBQ2pCLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07OzBCQVExQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBOZ1pvbmUsXG4gIE9wdGlvbmFsLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge1xuICBNQVRfQU5DSE9SX0hPU1QsXG4gIE1BVF9BTkNIT1JfSU5QVVRTLFxuICBNQVRfQlVUVE9OX0hPU1QsXG4gIE1BVF9CVVRUT05fSU5QVVRTLFxuICBNYXRBbmNob3JCYXNlLFxuICBNYXRCdXR0b25CYXNlXG59IGZyb20gJy4vYnV0dG9uLWJhc2UnO1xuXG4vKipcbiAqIE1hdGVyaWFsIERlc2lnbiBpY29uIGJ1dHRvbiBjb21wb25lbnQuIFRoaXMgdHlwZSBvZiBidXR0b24gZGlzcGxheXMgYSBzaW5nbGUgaW50ZXJhY3RpdmUgaWNvbiBmb3JcbiAqIHVzZXJzIHRvIHBlcmZvcm0gYW4gYWN0aW9uLlxuICogU2VlIGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGV2ZWxvcC93ZWIvY29tcG9uZW50cy9idXR0b25zL2ljb24tYnV0dG9ucy9cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgYnV0dG9uW21hdC1pY29uLWJ1dHRvbl1gLFxuICB0ZW1wbGF0ZVVybDogJ2J1dHRvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2ljb24tYnV0dG9uLmNzcycsICdidXR0b24taGlnaC1jb250cmFzdC5jc3MnXSxcbiAgaW5wdXRzOiBNQVRfQlVUVE9OX0lOUFVUUyxcbiAgaG9zdDogTUFUX0JVVFRPTl9IT1NULFxuICBleHBvcnRBczogJ21hdEJ1dHRvbicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRJY29uQnV0dG9uIGV4dGVuZHMgTWF0QnV0dG9uQmFzZSB7XG4gIC8vIFNldCB0aGUgcmlwcGxlIHRvIGJlIGNlbnRlcmVkIGZvciBpY29uIGJ1dHRvbnNcbiAgb3ZlcnJpZGUgX2lzUmlwcGxlQ2VudGVyZWQgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcGxhdGZvcm06IFBsYXRmb3JtLCBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgcGxhdGZvcm0sIG5nWm9uZSwgYW5pbWF0aW9uTW9kZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBNYXRlcmlhbCBEZXNpZ24gaWNvbiBidXR0b24gY29tcG9uZW50IGZvciBhbmNob3IgZWxlbWVudHMuIFRoaXMgYnV0dG9uIGRpc3BsYXlzIGEgc2luZ2xlXG4gKiBpbnRlcmFjdGlvbiBpY29uIHRoYXQgYWxsb3dzIHVzZXJzIHRvIG5hdmlnYXRlIGFjcm9zcyBkaWZmZXJlbnQgcm91dGVzIG9yIHBhZ2VzLlxuICogU2VlIGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGV2ZWxvcC93ZWIvY29tcG9uZW50cy9idXR0b25zL2ljb24tYnV0dG9ucy9cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBgYVttYXQtaWNvbi1idXR0b25dYCxcbiAgdGVtcGxhdGVVcmw6ICdidXR0b24uaHRtbCcsXG4gIHN0eWxlVXJsczogWydpY29uLWJ1dHRvbi5jc3MnLCAnYnV0dG9uLWhpZ2gtY29udHJhc3QuY3NzJ10sXG4gIGlucHV0czogTUFUX0FOQ0hPUl9JTlBVVFMsXG4gIGhvc3Q6IE1BVF9BTkNIT1JfSE9TVCxcbiAgZXhwb3J0QXM6ICdtYXRCdXR0b24sIG1hdEFuY2hvcicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRJY29uQW5jaG9yIGV4dGVuZHMgTWF0QW5jaG9yQmFzZSB7XG4gIC8vIFNldCB0aGUgcmlwcGxlIHRvIGJlIGNlbnRlcmVkIGZvciBpY29uIGJ1dHRvbnNcbiAgb3ZlcnJpZGUgX2lzUmlwcGxlQ2VudGVyZWQgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcGxhdGZvcm06IFBsYXRmb3JtLCBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgcGxhdGZvcm0sIG5nWm9uZSwgYW5pbWF0aW9uTW9kZSk7XG4gIH1cbn1cbiIsIjxzcGFuXG4gICAgW2NsYXNzLm1kYy1idXR0b25fX3JpcHBsZV09XCIhX2lzRmFiXCJcbiAgICBbY2xhc3MubWRjLWZhYl9fcmlwcGxlXT1cIl9pc0ZhYlwiPjwvc3Bhbj5cblxuPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hdGVyaWFsLWljb25zOm5vdChbaWNvblBvc2l0aW9uRW5kXSksIG1hdC1pY29uOm5vdChbaWNvblBvc2l0aW9uRW5kXSlcIj5cbjwvbmctY29udGVudD5cblxuPHNwYW4gY2xhc3M9XCJtZGMtYnV0dG9uX19sYWJlbFwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XG5cbjxuZy1jb250ZW50IHNlbGVjdD1cIi5tYXRlcmlhbC1pY29uc1tpY29uUG9zaXRpb25FbmRdLCBtYXQtaWNvbltpY29uUG9zaXRpb25FbmRdXCI+XG48L25nLWNvbnRlbnQ+XG5cbjwhLS1cbiAgVGhlIGluZGljYXRvciBjYW4ndCBiZSBkaXJlY3RseSBvbiB0aGUgYnV0dG9uLCBiZWNhdXNlIE1EQyB1c2VzIDo6YmVmb3JlIGZvciBoaWdoIGNvbnRyYXN0XG4gIGluZGljYXRpb24gYW5kIGl0IGNhbid0IGJlIG9uIHRoZSByaXBwbGUsIGJlY2F1c2UgaXQgaGFzIGEgYm9yZGVyIHJhZGl1cyBhbmQgb3ZlcmZsb3c6IGhpZGRlbi5cbi0tPlxuPHNwYW4gY2xhc3M9XCJtYXQtbWRjLWZvY3VzLWluZGljYXRvclwiPjwvc3Bhbj5cblxuPHNwYW4gbWF0UmlwcGxlIGNsYXNzPVwibWF0LW1kYy1idXR0b24tcmlwcGxlXCJcbiAgICAgW21hdFJpcHBsZURpc2FibGVkXT1cIl9pc1JpcHBsZURpc2FibGVkKClcIlxuICAgICBbbWF0UmlwcGxlQ2VudGVyZWRdPVwiX2lzUmlwcGxlQ2VudGVyZWRcIlxuICAgICBbbWF0UmlwcGxlVHJpZ2dlcl09XCJfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50XCI+PC9zcGFuPlxuXG48c3BhbiBjbGFzcz1cIm1hdC1tZGMtYnV0dG9uLXRvdWNoLXRhcmdldFwiPjwvc3Bhbj5cbiJdfQ==