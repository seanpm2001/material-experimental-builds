/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Inject, Input, Optional, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { _MatTabGroupBase, MAT_TAB_GROUP, MAT_TABS_CONFIG, } from '@angular/material/tabs';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MatTab } from './tab';
import { MatTabHeader } from './tab-header';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/portal";
import * as i3 from "@angular/material-experimental/mdc-core";
import * as i4 from "@angular/cdk/a11y";
import * as i5 from "./tab-body";
import * as i6 from "./tab-label-wrapper";
import * as i7 from "./tab-header";
/**
 * Material design tab-group component. Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://material.io/design/components/tabs.html
 */
export class MatTabGroup extends _MatTabGroupBase {
    constructor(elementRef, changeDetectorRef, defaultConfig, animationMode) {
        super(elementRef, changeDetectorRef, defaultConfig, animationMode);
        this._fitInkBarToContent = false;
        this._stretchTabs = true;
        this.fitInkBarToContent =
            defaultConfig && defaultConfig.fitInkBarToContent != null
                ? defaultConfig.fitInkBarToContent
                : false;
    }
    /** Whether the ink bar should fit its width to the size of the tab label content. */
    get fitInkBarToContent() {
        return this._fitInkBarToContent;
    }
    set fitInkBarToContent(v) {
        this._fitInkBarToContent = coerceBooleanProperty(v);
        this._changeDetectorRef.markForCheck();
    }
    /** Whether tabs should be stretched to fill the header. */
    get stretchTabs() {
        return this._stretchTabs;
    }
    set stretchTabs(v) {
        this._stretchTabs = coerceBooleanProperty(v);
    }
}
MatTabGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatTabGroup, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: MAT_TABS_CONFIG, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatTabGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.1", type: MatTabGroup, selector: "mat-tab-group", inputs: { color: "color", disableRipple: "disableRipple", fitInkBarToContent: "fitInkBarToContent", stretchTabs: ["mat-stretch-tabs", "stretchTabs"] }, host: { properties: { "class.mat-mdc-tab-group-dynamic-height": "dynamicHeight", "class.mat-mdc-tab-group-inverted-header": "headerPosition === \"below\"", "class.mat-mdc-tab-group-stretch-tabs": "stretchTabs" }, classAttribute: "mat-mdc-tab-group" }, providers: [
        {
            provide: MAT_TAB_GROUP,
            useExisting: MatTabGroup,
        },
    ], queries: [{ propertyName: "_allTabs", predicate: MatTab, descendants: true }], viewQueries: [{ propertyName: "_tabBodyWrapper", first: true, predicate: ["tabBodyWrapper"], descendants: true }, { propertyName: "_tabHeader", first: true, predicate: ["tabHeader"], descendants: true }], exportAs: ["matTabGroup"], usesInheritance: true, ngImport: i0, template: "<mat-tab-header #tabHeader\n                [selectedIndex]=\"selectedIndex || 0\"\n                [disableRipple]=\"disableRipple\"\n                (indexFocused)=\"_focusChanged($event)\"\n                (selectFocusedIndex)=\"selectedIndex = $event\">\n\n  <div class=\"mdc-tab mat-mdc-tab mat-mdc-focus-indicator\"\n       #tabNode\n       role=\"tab\"\n       matTabLabelWrapper\n       cdkMonitorElementFocus\n       *ngFor=\"let tab of _tabs; let i = index\"\n       [id]=\"_getTabLabelId(i)\"\n       [attr.tabIndex]=\"_getTabIndex(tab, i)\"\n       [attr.aria-posinset]=\"i + 1\"\n       [attr.aria-setsize]=\"_tabs.length\"\n       [attr.aria-controls]=\"_getTabContentId(i)\"\n       [attr.aria-selected]=\"selectedIndex === i\"\n       [attr.aria-label]=\"tab.ariaLabel || null\"\n       [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\"\n       [class.mdc-tab--active]=\"selectedIndex === i\"\n       [ngClass]=\"tab.labelClass\"\n       [disabled]=\"tab.disabled\"\n       [fitInkBarToContent]=\"fitInkBarToContent\"\n       (click)=\"_handleClick(tab, tabHeader, i)\"\n       (cdkFocusChange)=\"_tabFocusChanged($event, i)\">\n    <span class=\"mdc-tab__ripple\"></span>\n\n    <!-- Needs to be a separate element, because we can't put\n         `overflow: hidden` on tab due to the ink bar. -->\n    <div\n      class=\"mat-mdc-tab-ripple\"\n      mat-ripple\n      [matRippleTrigger]=\"tabNode\"\n      [matRippleDisabled]=\"tab.disabled || disableRipple\"></div>\n\n    <span class=\"mdc-tab__content\">\n      <span class=\"mdc-tab__text-label\">\n        <!-- If there is a label template, use it. -->\n        <ng-template [ngIf]=\"tab.templateLabel\" [ngIfElse]=\"tabTextLabel\">\n          <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n        </ng-template>\n\n        <!-- If there is not a label template, fall back to the text label. -->\n        <ng-template #tabTextLabel>{{tab.textLabel}}</ng-template>\n      </span>\n    </span>\n  </div>\n</mat-tab-header>\n\n<div\n  class=\"mat-mdc-tab-body-wrapper\"\n  [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\"\n  #tabBodyWrapper>\n  <mat-tab-body role=\"tabpanel\"\n               *ngFor=\"let tab of _tabs; let i = index\"\n               [id]=\"_getTabContentId(i)\"\n               [attr.tabindex]=\"(contentTabIndex != null && selectedIndex === i) ? contentTabIndex : null\"\n               [attr.aria-labelledby]=\"_getTabLabelId(i)\"\n               [class.mat-mdc-tab-body-active]=\"selectedIndex === i\"\n               [ngClass]=\"tab.bodyClass\"\n               [content]=\"tab.content!\"\n               [position]=\"tab.position!\"\n               [origin]=\"tab.origin\"\n               [animationDuration]=\"animationDuration\"\n               [preserveContent]=\"preserveContent\"\n               (_onCentered)=\"_removeTabBodyWrapperHeight()\"\n               (_onCentering)=\"_setTabBodyWrapperHeight($event)\">\n  </mat-tab-body>\n</div>\n", styles: [".mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab.mdc-tab{height:48px;flex-grow:0}.mat-mdc-tab .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none}.mat-mdc-tab .mdc-tab__content{position:relative}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab .mat-ripple-element{opacity:.12}.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-mdc-tab-body-wrapper._mat-animation-noopable{transition:none !important;animation:none !important}"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }, { kind: "directive", type: i3.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "directive", type: i4.CdkMonitorFocus, selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]", outputs: ["cdkFocusChange"] }, { kind: "component", type: i5.MatTabBody, selector: "mat-tab-body" }, { kind: "directive", type: i6.MatTabLabelWrapper, selector: "[matTabLabelWrapper]", inputs: ["disabled", "fitInkBarToContent"] }, { kind: "component", type: i7.MatTabHeader, selector: "mat-tab-header", inputs: ["selectedIndex"], outputs: ["selectFocusedIndex", "indexFocused"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatTabGroup, decorators: [{
            type: Component,
            args: [{ selector: 'mat-tab-group', exportAs: 'matTabGroup', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.Default, inputs: ['color', 'disableRipple'], providers: [
                        {
                            provide: MAT_TAB_GROUP,
                            useExisting: MatTabGroup,
                        },
                    ], host: {
                        'class': 'mat-mdc-tab-group',
                        '[class.mat-mdc-tab-group-dynamic-height]': 'dynamicHeight',
                        '[class.mat-mdc-tab-group-inverted-header]': 'headerPosition === "below"',
                        '[class.mat-mdc-tab-group-stretch-tabs]': 'stretchTabs',
                    }, template: "<mat-tab-header #tabHeader\n                [selectedIndex]=\"selectedIndex || 0\"\n                [disableRipple]=\"disableRipple\"\n                (indexFocused)=\"_focusChanged($event)\"\n                (selectFocusedIndex)=\"selectedIndex = $event\">\n\n  <div class=\"mdc-tab mat-mdc-tab mat-mdc-focus-indicator\"\n       #tabNode\n       role=\"tab\"\n       matTabLabelWrapper\n       cdkMonitorElementFocus\n       *ngFor=\"let tab of _tabs; let i = index\"\n       [id]=\"_getTabLabelId(i)\"\n       [attr.tabIndex]=\"_getTabIndex(tab, i)\"\n       [attr.aria-posinset]=\"i + 1\"\n       [attr.aria-setsize]=\"_tabs.length\"\n       [attr.aria-controls]=\"_getTabContentId(i)\"\n       [attr.aria-selected]=\"selectedIndex === i\"\n       [attr.aria-label]=\"tab.ariaLabel || null\"\n       [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\"\n       [class.mdc-tab--active]=\"selectedIndex === i\"\n       [ngClass]=\"tab.labelClass\"\n       [disabled]=\"tab.disabled\"\n       [fitInkBarToContent]=\"fitInkBarToContent\"\n       (click)=\"_handleClick(tab, tabHeader, i)\"\n       (cdkFocusChange)=\"_tabFocusChanged($event, i)\">\n    <span class=\"mdc-tab__ripple\"></span>\n\n    <!-- Needs to be a separate element, because we can't put\n         `overflow: hidden` on tab due to the ink bar. -->\n    <div\n      class=\"mat-mdc-tab-ripple\"\n      mat-ripple\n      [matRippleTrigger]=\"tabNode\"\n      [matRippleDisabled]=\"tab.disabled || disableRipple\"></div>\n\n    <span class=\"mdc-tab__content\">\n      <span class=\"mdc-tab__text-label\">\n        <!-- If there is a label template, use it. -->\n        <ng-template [ngIf]=\"tab.templateLabel\" [ngIfElse]=\"tabTextLabel\">\n          <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n        </ng-template>\n\n        <!-- If there is not a label template, fall back to the text label. -->\n        <ng-template #tabTextLabel>{{tab.textLabel}}</ng-template>\n      </span>\n    </span>\n  </div>\n</mat-tab-header>\n\n<div\n  class=\"mat-mdc-tab-body-wrapper\"\n  [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\"\n  #tabBodyWrapper>\n  <mat-tab-body role=\"tabpanel\"\n               *ngFor=\"let tab of _tabs; let i = index\"\n               [id]=\"_getTabContentId(i)\"\n               [attr.tabindex]=\"(contentTabIndex != null && selectedIndex === i) ? contentTabIndex : null\"\n               [attr.aria-labelledby]=\"_getTabLabelId(i)\"\n               [class.mat-mdc-tab-body-active]=\"selectedIndex === i\"\n               [ngClass]=\"tab.bodyClass\"\n               [content]=\"tab.content!\"\n               [position]=\"tab.position!\"\n               [origin]=\"tab.origin\"\n               [animationDuration]=\"animationDuration\"\n               [preserveContent]=\"preserveContent\"\n               (_onCentered)=\"_removeTabBodyWrapperHeight()\"\n               (_onCentering)=\"_setTabBodyWrapperHeight($event)\">\n  </mat-tab-body>\n</div>\n", styles: [".mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab.mdc-tab{height:48px;flex-grow:0}.mat-mdc-tab .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none}.mat-mdc-tab .mdc-tab__content{position:relative}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab .mat-ripple-element{opacity:.12}.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-mdc-tab-body-wrapper._mat-animation-noopable{transition:none !important;animation:none !important}"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_TABS_CONFIG]
                }, {
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; }, propDecorators: { _allTabs: [{
                type: ContentChildren,
                args: [MatTab, { descendants: true }]
            }], _tabBodyWrapper: [{
                type: ViewChild,
                args: ['tabBodyWrapper']
            }], _tabHeader: [{
                type: ViewChild,
                args: ['tabHeader']
            }], fitInkBarToContent: [{
                type: Input
            }], stretchTabs: [{
                type: Input,
                args: ['mat-stretch-tabs']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFicy90YWItZ3JvdXAudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1ncm91cC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGVBQWUsR0FFaEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQzdCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7Ozs7Ozs7OztBQUUxRTs7OztHQUlHO0FBdUJILE1BQU0sT0FBTyxXQUFZLFNBQVEsZ0JBQWdCO0lBMEIvQyxZQUNFLFVBQXNCLEVBQ3RCLGlCQUFvQyxFQUNDLGFBQTZCLEVBQ3ZCLGFBQXNCO1FBRWpFLEtBQUssQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBbEI3RCx3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFVNUIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFTMUIsSUFBSSxDQUFDLGtCQUFrQjtZQUNyQixhQUFhLElBQUksYUFBYSxDQUFDLGtCQUFrQixJQUFJLElBQUk7Z0JBQ3ZELENBQUMsQ0FBQyxhQUFhLENBQUMsa0JBQWtCO2dCQUNsQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQWhDRCxxRkFBcUY7SUFDckYsSUFDSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDbEMsQ0FBQztJQUNELElBQUksa0JBQWtCLENBQUMsQ0FBZTtRQUNwQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFHRCwyREFBMkQ7SUFDM0QsSUFDSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFJLFdBQVcsQ0FBQyxDQUFlO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7d0dBdkJVLFdBQVcsNkVBNkJaLGVBQWUsNkJBQ0gscUJBQXFCOzRGQTlCaEMsV0FBVyw0YkFiWDtRQUNUO1lBQ0UsT0FBTyxFQUFFLGFBQWE7WUFDdEIsV0FBVyxFQUFFLFdBQVc7U0FDekI7S0FDRixtREFTZ0IsTUFBTSwrU0M1RHpCLHM5RkFzRUE7MkZEWGEsV0FBVztrQkF0QnZCLFNBQVM7K0JBQ0UsZUFBZSxZQUNmLGFBQWEsaUJBR1IsaUJBQWlCLENBQUMsSUFBSSxtQkFFcEIsdUJBQXVCLENBQUMsT0FBTyxVQUN4QyxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsYUFDdkI7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGFBQWE7NEJBQ3RCLFdBQVcsYUFBYTt5QkFDekI7cUJBQ0YsUUFDSzt3QkFDSixPQUFPLEVBQUUsbUJBQW1CO3dCQUM1QiwwQ0FBMEMsRUFBRSxlQUFlO3dCQUMzRCwyQ0FBMkMsRUFBRSw0QkFBNEI7d0JBQ3pFLHdDQUF3QyxFQUFFLGFBQWE7cUJBQ3hEOzswQkErQkUsTUFBTTsyQkFBQyxlQUFlOzswQkFBRyxRQUFROzswQkFDakMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxxQkFBcUI7NENBN0JHLFFBQVE7c0JBQXJELGVBQWU7dUJBQUMsTUFBTSxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQztnQkFDZixlQUFlO3NCQUEzQyxTQUFTO3VCQUFDLGdCQUFnQjtnQkFDSCxVQUFVO3NCQUFqQyxTQUFTO3VCQUFDLFdBQVc7Z0JBSWxCLGtCQUFrQjtzQkFEckIsS0FBSztnQkFZRixXQUFXO3NCQURkLEtBQUs7dUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgX01hdFRhYkdyb3VwQmFzZSxcbiAgTUFUX1RBQl9HUk9VUCxcbiAgTUFUX1RBQlNfQ09ORklHLFxuICBNYXRUYWJzQ29uZmlnLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtNYXRUYWJ9IGZyb20gJy4vdGFiJztcbmltcG9ydCB7TWF0VGFiSGVhZGVyfSBmcm9tICcuL3RhYi1oZWFkZXInO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuLyoqXG4gKiBNYXRlcmlhbCBkZXNpZ24gdGFiLWdyb3VwIGNvbXBvbmVudC4gU3VwcG9ydHMgYmFzaWMgdGFiIHBhaXJzIChsYWJlbCArIGNvbnRlbnQpIGFuZCBpbmNsdWRlc1xuICogYW5pbWF0ZWQgaW5rLWJhciwga2V5Ym9hcmQgbmF2aWdhdGlvbiwgYW5kIHNjcmVlbiByZWFkZXIuXG4gKiBTZWU6IGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGVzaWduL2NvbXBvbmVudHMvdGFicy5odG1sXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC10YWItZ3JvdXAnLFxuICBleHBvcnRBczogJ21hdFRhYkdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICd0YWItZ3JvdXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0YWItZ3JvdXAuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVSaXBwbGUnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTUFUX1RBQl9HUk9VUCxcbiAgICAgIHVzZUV4aXN0aW5nOiBNYXRUYWJHcm91cCxcbiAgICB9LFxuICBdLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtdGFiLWdyb3VwJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtdGFiLWdyb3VwLWR5bmFtaWMtaGVpZ2h0XSc6ICdkeW5hbWljSGVpZ2h0JyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtdGFiLWdyb3VwLWludmVydGVkLWhlYWRlcl0nOiAnaGVhZGVyUG9zaXRpb24gPT09IFwiYmVsb3dcIicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXRhYi1ncm91cC1zdHJldGNoLXRhYnNdJzogJ3N0cmV0Y2hUYWJzJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFiR3JvdXAgZXh0ZW5kcyBfTWF0VGFiR3JvdXBCYXNlIHtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRUYWIsIHtkZXNjZW5kYW50czogdHJ1ZX0pIF9hbGxUYWJzOiBRdWVyeUxpc3Q8TWF0VGFiPjtcbiAgQFZpZXdDaGlsZCgndGFiQm9keVdyYXBwZXInKSBfdGFiQm9keVdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3RhYkhlYWRlcicpIF90YWJIZWFkZXI6IE1hdFRhYkhlYWRlcjtcblxuICAvKiogV2hldGhlciB0aGUgaW5rIGJhciBzaG91bGQgZml0IGl0cyB3aWR0aCB0byB0aGUgc2l6ZSBvZiB0aGUgdGFiIGxhYmVsIGNvbnRlbnQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBmaXRJbmtCYXJUb0NvbnRlbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpdElua0JhclRvQ29udGVudDtcbiAgfVxuICBzZXQgZml0SW5rQmFyVG9Db250ZW50KHY6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2ZpdElua0JhclRvQ29udGVudCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBwcml2YXRlIF9maXRJbmtCYXJUb0NvbnRlbnQgPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0YWJzIHNob3VsZCBiZSBzdHJldGNoZWQgdG8gZmlsbCB0aGUgaGVhZGVyLiAqL1xuICBASW5wdXQoJ21hdC1zdHJldGNoLXRhYnMnKVxuICBnZXQgc3RyZXRjaFRhYnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmV0Y2hUYWJzO1xuICB9XG4gIHNldCBzdHJldGNoVGFicyh2OiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9zdHJldGNoVGFicyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBwcml2YXRlIF9zdHJldGNoVGFicyA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChNQVRfVEFCU19DT05GSUcpIEBPcHRpb25hbCgpIGRlZmF1bHRDb25maWc/OiBNYXRUYWJzQ29uZmlnLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGVmYXVsdENvbmZpZywgYW5pbWF0aW9uTW9kZSk7XG4gICAgdGhpcy5maXRJbmtCYXJUb0NvbnRlbnQgPVxuICAgICAgZGVmYXVsdENvbmZpZyAmJiBkZWZhdWx0Q29uZmlnLmZpdElua0JhclRvQ29udGVudCAhPSBudWxsXG4gICAgICAgID8gZGVmYXVsdENvbmZpZy5maXRJbmtCYXJUb0NvbnRlbnRcbiAgICAgICAgOiBmYWxzZTtcbiAgfVxufVxuIiwiPG1hdC10YWItaGVhZGVyICN0YWJIZWFkZXJcbiAgICAgICAgICAgICAgICBbc2VsZWN0ZWRJbmRleF09XCJzZWxlY3RlZEluZGV4IHx8IDBcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlUmlwcGxlXT1cImRpc2FibGVSaXBwbGVcIlxuICAgICAgICAgICAgICAgIChpbmRleEZvY3VzZWQpPVwiX2ZvY3VzQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoc2VsZWN0Rm9jdXNlZEluZGV4KT1cInNlbGVjdGVkSW5kZXggPSAkZXZlbnRcIj5cblxuICA8ZGl2IGNsYXNzPVwibWRjLXRhYiBtYXQtbWRjLXRhYiBtYXQtbWRjLWZvY3VzLWluZGljYXRvclwiXG4gICAgICAgI3RhYk5vZGVcbiAgICAgICByb2xlPVwidGFiXCJcbiAgICAgICBtYXRUYWJMYWJlbFdyYXBwZXJcbiAgICAgICBjZGtNb25pdG9yRWxlbWVudEZvY3VzXG4gICAgICAgKm5nRm9yPVwibGV0IHRhYiBvZiBfdGFiczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgW2lkXT1cIl9nZXRUYWJMYWJlbElkKGkpXCJcbiAgICAgICBbYXR0ci50YWJJbmRleF09XCJfZ2V0VGFiSW5kZXgodGFiLCBpKVwiXG4gICAgICAgW2F0dHIuYXJpYS1wb3NpbnNldF09XCJpICsgMVwiXG4gICAgICAgW2F0dHIuYXJpYS1zZXRzaXplXT1cIl90YWJzLmxlbmd0aFwiXG4gICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJfZ2V0VGFiQ29udGVudElkKGkpXCJcbiAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInNlbGVjdGVkSW5kZXggPT09IGlcIlxuICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwidGFiLmFyaWFMYWJlbCB8fCBudWxsXCJcbiAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiKCF0YWIuYXJpYUxhYmVsICYmIHRhYi5hcmlhTGFiZWxsZWRieSkgPyB0YWIuYXJpYUxhYmVsbGVkYnkgOiBudWxsXCJcbiAgICAgICBbY2xhc3MubWRjLXRhYi0tYWN0aXZlXT1cInNlbGVjdGVkSW5kZXggPT09IGlcIlxuICAgICAgIFtuZ0NsYXNzXT1cInRhYi5sYWJlbENsYXNzXCJcbiAgICAgICBbZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCJcbiAgICAgICBbZml0SW5rQmFyVG9Db250ZW50XT1cImZpdElua0JhclRvQ29udGVudFwiXG4gICAgICAgKGNsaWNrKT1cIl9oYW5kbGVDbGljayh0YWIsIHRhYkhlYWRlciwgaSlcIlxuICAgICAgIChjZGtGb2N1c0NoYW5nZSk9XCJfdGFiRm9jdXNDaGFuZ2VkKCRldmVudCwgaSlcIj5cbiAgICA8c3BhbiBjbGFzcz1cIm1kYy10YWJfX3JpcHBsZVwiPjwvc3Bhbj5cblxuICAgIDwhLS0gTmVlZHMgdG8gYmUgYSBzZXBhcmF0ZSBlbGVtZW50LCBiZWNhdXNlIHdlIGNhbid0IHB1dFxuICAgICAgICAgYG92ZXJmbG93OiBoaWRkZW5gIG9uIHRhYiBkdWUgdG8gdGhlIGluayBiYXIuIC0tPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwibWF0LW1kYy10YWItcmlwcGxlXCJcbiAgICAgIG1hdC1yaXBwbGVcbiAgICAgIFttYXRSaXBwbGVUcmlnZ2VyXT1cInRhYk5vZGVcIlxuICAgICAgW21hdFJpcHBsZURpc2FibGVkXT1cInRhYi5kaXNhYmxlZCB8fCBkaXNhYmxlUmlwcGxlXCI+PC9kaXY+XG5cbiAgICA8c3BhbiBjbGFzcz1cIm1kYy10YWJfX2NvbnRlbnRcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibWRjLXRhYl9fdGV4dC1sYWJlbFwiPlxuICAgICAgICA8IS0tIElmIHRoZXJlIGlzIGEgbGFiZWwgdGVtcGxhdGUsIHVzZSBpdC4gLS0+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJ0YWIudGVtcGxhdGVMYWJlbFwiIFtuZ0lmRWxzZV09XCJ0YWJUZXh0TGFiZWxcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW2Nka1BvcnRhbE91dGxldF09XCJ0YWIudGVtcGxhdGVMYWJlbFwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgPCEtLSBJZiB0aGVyZSBpcyBub3QgYSBsYWJlbCB0ZW1wbGF0ZSwgZmFsbCBiYWNrIHRvIHRoZSB0ZXh0IGxhYmVsLiAtLT5cbiAgICAgICAgPG5nLXRlbXBsYXRlICN0YWJUZXh0TGFiZWw+e3t0YWIudGV4dExhYmVsfX08L25nLXRlbXBsYXRlPlxuICAgICAgPC9zcGFuPlxuICAgIDwvc3Bhbj5cbiAgPC9kaXY+XG48L21hdC10YWItaGVhZGVyPlxuXG48ZGl2XG4gIGNsYXNzPVwibWF0LW1kYy10YWItYm9keS13cmFwcGVyXCJcbiAgW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXT1cIl9hbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnXCJcbiAgI3RhYkJvZHlXcmFwcGVyPlxuICA8bWF0LXRhYi1ib2R5IHJvbGU9XCJ0YWJwYW5lbFwiXG4gICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgdGFiIG9mIF90YWJzOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgICAgIFtpZF09XCJfZ2V0VGFiQ29udGVudElkKGkpXCJcbiAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIihjb250ZW50VGFiSW5kZXggIT0gbnVsbCAmJiBzZWxlY3RlZEluZGV4ID09PSBpKSA/IGNvbnRlbnRUYWJJbmRleCA6IG51bGxcIlxuICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cIl9nZXRUYWJMYWJlbElkKGkpXCJcbiAgICAgICAgICAgICAgIFtjbGFzcy5tYXQtbWRjLXRhYi1ib2R5LWFjdGl2ZV09XCJzZWxlY3RlZEluZGV4ID09PSBpXCJcbiAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInRhYi5ib2R5Q2xhc3NcIlxuICAgICAgICAgICAgICAgW2NvbnRlbnRdPVwidGFiLmNvbnRlbnQhXCJcbiAgICAgICAgICAgICAgIFtwb3NpdGlvbl09XCJ0YWIucG9zaXRpb24hXCJcbiAgICAgICAgICAgICAgIFtvcmlnaW5dPVwidGFiLm9yaWdpblwiXG4gICAgICAgICAgICAgICBbYW5pbWF0aW9uRHVyYXRpb25dPVwiYW5pbWF0aW9uRHVyYXRpb25cIlxuICAgICAgICAgICAgICAgW3ByZXNlcnZlQ29udGVudF09XCJwcmVzZXJ2ZUNvbnRlbnRcIlxuICAgICAgICAgICAgICAgKF9vbkNlbnRlcmVkKT1cIl9yZW1vdmVUYWJCb2R5V3JhcHBlckhlaWdodCgpXCJcbiAgICAgICAgICAgICAgIChfb25DZW50ZXJpbmcpPVwiX3NldFRhYkJvZHlXcmFwcGVySGVpZ2h0KCRldmVudClcIj5cbiAgPC9tYXQtdGFiLWJvZHk+XG48L2Rpdj5cbiJdfQ==