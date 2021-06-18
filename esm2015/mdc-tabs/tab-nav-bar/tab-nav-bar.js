/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, forwardRef, QueryList, ViewChild, ViewEncapsulation, Optional, Inject, Attribute, NgZone, ChangeDetectorRef, Input, } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MAT_RIPPLE_GLOBAL_OPTIONS, } from '@angular/material-experimental/mdc-core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { _MatTabNavBase, _MatTabLinkBase, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';
import { MatInkBar, MatInkBarFoundation } from '../ink-bar';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
export class MatTabNav extends _MatTabNavBase {
    constructor(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode, defaultConfig) {
        super(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode);
        this._fitInkBarToContent = new BehaviorSubject(false);
        this.disablePagination = defaultConfig && defaultConfig.disablePagination != null ?
            defaultConfig.disablePagination : false;
        this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ?
            defaultConfig.fitInkBarToContent : false;
    }
    /** Whether the ink bar should fit its width to the size of the tab label content. */
    get fitInkBarToContent() { return this._fitInkBarToContent.value; }
    set fitInkBarToContent(v) {
        this._fitInkBarToContent.next(coerceBooleanProperty(v));
        this._changeDetectorRef.markForCheck();
    }
    ngAfterContentInit() {
        this._inkBar = new MatInkBar(this._items);
        super.ngAfterContentInit();
    }
}
MatTabNav.decorators = [
    { type: Component, args: [{
                selector: '[mat-tab-nav-bar]',
                exportAs: 'matTabNavBar, matTabNav',
                inputs: ['color'],
                template: "<!-- TODO: this also had `mat-elevation-z4`. Figure out what we should do with it. -->\n<div class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before\"\n     #previousPaginator\n     aria-hidden=\"true\"\n     mat-ripple [matRippleDisabled]=\"_disableScrollBefore || disableRipple\"\n     [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollBefore\"\n     (click)=\"_handlePaginatorClick('before')\"\n     (mousedown)=\"_handlePaginatorPress('before', $event)\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-mdc-tab-header-pagination-chevron\"></div>\n</div>\n\n<div class=\"mat-mdc-tab-link-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\">\n  <div class=\"mat-mdc-tab-list\" #tabList (cdkObserveContent)=\"_onContentChanges()\">\n    <div class=\"mat-mdc-tab-links\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n\n<!-- TODO: this also had `mat-elevation-z4`. Figure out what we should do with it. -->\n<div class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after\"\n     #nextPaginator\n     aria-hidden=\"true\"\n     mat-ripple [matRippleDisabled]=\"_disableScrollAfter || disableRipple\"\n     [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollAfter\"\n     (mousedown)=\"_handlePaginatorPress('after', $event)\"\n     (click)=\"_handlePaginatorClick('after')\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-mdc-tab-header-pagination-chevron\"></div>\n</div>\n",
                host: {
                    'class': 'mat-mdc-tab-nav-bar mat-mdc-tab-header',
                    '[class.mat-mdc-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                    '[class.mat-mdc-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
                    '[class.mat-primary]': 'color !== "warn" && color !== "accent"',
                    '[class.mat-accent]': 'color === "accent"',
                    '[class.mat-warn]': 'color === "warn"',
                    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-mdc-tab-header-pagination{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:\"\";height:8px;width:8px}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}\n"]
            },] }
];
MatTabNav.ctorParameters = () => [
    { type: ElementRef },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: ViewportRuler },
    { type: Platform },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_TABS_CONFIG,] }] }
];
MatTabNav.propDecorators = {
    fitInkBarToContent: [{ type: Input }],
    _items: [{ type: ContentChildren, args: [forwardRef(() => MatTabLink), { descendants: true },] }],
    _tabListContainer: [{ type: ViewChild, args: ['tabListContainer', { static: true },] }],
    _tabList: [{ type: ViewChild, args: ['tabList', { static: true },] }],
    _nextPaginator: [{ type: ViewChild, args: ['nextPaginator',] }],
    _previousPaginator: [{ type: ViewChild, args: ['previousPaginator',] }]
};
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
export class MatTabLink extends _MatTabLinkBase {
    constructor(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, _document, animationMode) {
        super(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, animationMode);
        this._document = _document;
        this._foundation = new MatInkBarFoundation(this.elementRef.nativeElement, this._document);
        this._destroyed = new Subject();
        tabNavBar._fitInkBarToContent.pipe(takeUntil(this._destroyed)).subscribe(fitInkBarToContent => {
            this._foundation.setFitToContent(fitInkBarToContent);
        });
    }
    ngOnInit() {
        this._foundation.init();
    }
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
        super.ngOnDestroy();
        this._foundation.destroy();
    }
}
MatTabLink.decorators = [
    { type: Component, args: [{
                selector: '[mat-tab-link], [matTabLink]',
                exportAs: 'matTabLink',
                inputs: ['disabled', 'disableRipple', 'tabIndex'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: "<span class=\"mdc-tab__ripple\"></span>\n\n<div\n  class=\"mat-mdc-tab-ripple\"\n  mat-ripple\n  [matRippleTrigger]=\"elementRef.nativeElement\"\n  [matRippleDisabled]=\"rippleDisabled\"></div>\n\n<span class=\"mdc-tab__content\">\n  <span class=\"mdc-tab__text-label\">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n",
                host: {
                    'class': 'mdc-tab mat-mdc-tab-link mat-mdc-focus-indicator',
                    '[attr.aria-current]': 'active ? "page" : null',
                    '[attr.aria-disabled]': 'disabled',
                    '[attr.tabIndex]': 'tabIndex',
                    '[class.mat-mdc-tab-disabled]': 'disabled',
                    '[class.mdc-tab--active]': 'active',
                },
                styles: [".mdc-tab{padding-right:24px;padding-left:24px;min-width:90px;position:relative;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;background:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{position:relative;display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;width:24px;height:24px;font-size:24px;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-link.mdc-tab{height:48px;flex-grow:0}.mat-mdc-tab-link .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.cdk-high-contrast-active .mat-mdc-tab-link.cdk-program-focused,.cdk-high-contrast-active .mat-mdc-tab-link.cdk-keyboard-focused{outline:dotted 2px;outline-offset:-2px}.cdk-high-contrast-active :host .mat-mdc-tab-link.cdk-program-focused,.cdk-high-contrast-active :host .mat-mdc-tab-link.cdk-keyboard-focused{outline:dotted 2px;outline-offset:-2px}.mat-mdc-tab-link .mat-ripple-element{opacity:.12}.mat-mdc-tab-link.mat-mdc-tab-disabled{pointer-events:none;opacity:.4}.mat-mdc-tab-header[mat-stretch-tabs] .mat-mdc-tab-link{flex-grow:1}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}\n"]
            },] }
];
MatTabLink.ctorParameters = () => [
    { type: MatTabNav },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: FocusMonitor },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1uYXYtYmFyL3RhYi1uYXYtYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUdULE1BQU0sRUFDTixpQkFBaUIsRUFBVSxLQUFLLEdBQ2pDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFDTCx5QkFBeUIsR0FFMUIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUNMLGNBQWMsRUFDZCxlQUFlLEVBQ2YsZUFBZSxFQUVoQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsU0FBUyxFQUFpQixtQkFBbUIsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUN6RSxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsZUFBZSxFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHekM7OztHQUdHO0FBbUJILE1BQU0sT0FBTyxTQUFVLFNBQVEsY0FBYztJQWlCM0MsWUFBWSxVQUFzQixFQUNWLEdBQW1CLEVBQy9CLE1BQWMsRUFDZCxpQkFBb0MsRUFDcEMsYUFBNEIsRUFDNUIsUUFBa0IsRUFDeUIsYUFBc0IsRUFDNUIsYUFBNkI7UUFDNUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFqQjVGLHdCQUFtQixHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBa0IvQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxJQUFJLGFBQWEsQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUMvRSxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsYUFBYSxJQUFJLGFBQWEsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUNqRixhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMvQyxDQUFDO0lBN0JELHFGQUFxRjtJQUNyRixJQUNJLGtCQUFrQixLQUFjLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUUsSUFBSSxrQkFBa0IsQ0FBQyxDQUFVO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQXlCUSxrQkFBa0I7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDN0IsQ0FBQzs7O1lBckRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLDI5Q0FBK0I7Z0JBRS9CLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsd0NBQXdDO29CQUNqRCx3REFBd0QsRUFBRSx5QkFBeUI7b0JBQ25GLGdDQUFnQyxFQUFFLGdDQUFnQztvQkFDbEUscUJBQXFCLEVBQUUsd0NBQXdDO29CQUMvRCxvQkFBb0IsRUFBRSxvQkFBb0I7b0JBQzFDLGtCQUFrQixFQUFFLGtCQUFrQjtvQkFDdEMsaUNBQWlDLEVBQUcscUNBQXFDO2lCQUMxRTtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7WUF4REMsVUFBVTtZQTBCSixjQUFjLHVCQWlEUCxRQUFRO1lBakVyQixNQUFNO1lBQ04saUJBQWlCO1lBZ0JYLGFBQWE7WUFDYixRQUFRO3lDQW9ERCxRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs0Q0FDeEMsUUFBUSxZQUFJLE1BQU0sU0FBQyxlQUFlOzs7aUNBdEI5QyxLQUFLO3FCQVFMLGVBQWUsU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDO2dDQUNqRSxTQUFTLFNBQUMsa0JBQWtCLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO3VCQUM1QyxTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzs2QkFDbkMsU0FBUyxTQUFDLGVBQWU7aUNBQ3pCLFNBQVMsU0FBQyxtQkFBbUI7O0FBMkJoQzs7R0FFRztBQWtCSCxNQUFNLE9BQU8sVUFBVyxTQUFRLGVBQWU7SUFLN0MsWUFDRSxTQUFvQixFQUNwQixVQUFzQixFQUN5QixtQkFBNkMsRUFDckUsUUFBZ0IsRUFBRSxZQUEwQixFQUN6QyxTQUFjLEVBQ0csYUFBc0I7UUFDakUsS0FBSyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUYvRCxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBVDFDLGdCQUFXLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEUsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFXaEQsU0FBUyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDNUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRVEsV0FBVztRQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7O1lBN0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsOEJBQThCO2dCQUN4QyxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7Z0JBQ2pELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsaVZBQTRCO2dCQUU1QixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLGtEQUFrRDtvQkFDM0QscUJBQXFCLEVBQUUsd0JBQXdCO29CQUMvQyxzQkFBc0IsRUFBRSxVQUFVO29CQUNsQyxpQkFBaUIsRUFBRSxVQUFVO29CQUM3Qiw4QkFBOEIsRUFBRSxVQUFVO29CQUMxQyx5QkFBeUIsRUFBRSxRQUFRO2lCQUNwQzs7YUFDRjs7O1lBT2MsU0FBUztZQTVIdEIsVUFBVTs0Q0E4SFAsUUFBUSxZQUFJLE1BQU0sU0FBQyx5QkFBeUI7eUNBQzVDLFNBQVMsU0FBQyxVQUFVO1lBN0dqQixZQUFZOzRDQThHZixNQUFNLFNBQUMsUUFBUTt5Q0FDZixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9wdGlvbmFsLFxuICBJbmplY3QsXG4gIEF0dHJpYnV0ZSxcbiAgT25EZXN0cm95LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBOZ1pvbmUsXG4gIENoYW5nZURldGVjdG9yUmVmLCBPbkluaXQsIElucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUyxcbiAgUmlwcGxlR2xvYmFsT3B0aW9ucyxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7Rm9jdXNNb25pdG9yfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICBfTWF0VGFiTmF2QmFzZSxcbiAgX01hdFRhYkxpbmtCYXNlLFxuICBNQVRfVEFCU19DT05GSUcsXG4gIE1hdFRhYnNDb25maWdcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtWaWV3cG9ydFJ1bGVyfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge01hdElua0JhciwgTWF0SW5rQmFySXRlbSwgTWF0SW5rQmFyRm91bmRhdGlvbn0gZnJvbSAnLi4vaW5rLWJhcic7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG4vKipcbiAqIE5hdmlnYXRpb24gY29tcG9uZW50IG1hdGNoaW5nIHRoZSBzdHlsZXMgb2YgdGhlIHRhYiBncm91cCBoZWFkZXIuXG4gKiBQcm92aWRlcyBhbmNob3JlZCBuYXZpZ2F0aW9uIHdpdGggYW5pbWF0ZWQgaW5rIGJhci5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW21hdC10YWItbmF2LWJhcl0nLFxuICBleHBvcnRBczogJ21hdFRhYk5hdkJhciwgbWF0VGFiTmF2JyxcbiAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gIHRlbXBsYXRlVXJsOiAndGFiLW5hdi1iYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0YWItbmF2LWJhci5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXRhYi1uYXYtYmFyIG1hdC1tZGMtdGFiLWhlYWRlcicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXRhYi1oZWFkZXItcGFnaW5hdGlvbi1jb250cm9scy1lbmFibGVkXSc6ICdfc2hvd1BhZ2luYXRpb25Db250cm9scycsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXRhYi1oZWFkZXItcnRsXSc6IFwiX2dldExheW91dERpcmVjdGlvbigpID09ICdydGwnXCIsXG4gICAgJ1tjbGFzcy5tYXQtcHJpbWFyeV0nOiAnY29sb3IgIT09IFwid2FyblwiICYmIGNvbG9yICE9PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2NvbG9yID09PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PT0gXCJ3YXJuXCInLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJyA6ICdfYW5pbWF0aW9uTW9kZSA9PT0gXCJOb29wQW5pbWF0aW9uc1wiJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRhYk5hdiBleHRlbmRzIF9NYXRUYWJOYXZCYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIC8qKiBXaGV0aGVyIHRoZSBpbmsgYmFyIHNob3VsZCBmaXQgaXRzIHdpZHRoIHRvIHRoZSBzaXplIG9mIHRoZSB0YWIgbGFiZWwgY29udGVudC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGZpdElua0JhclRvQ29udGVudCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2ZpdElua0JhclRvQ29udGVudC52YWx1ZTsgfVxuICBzZXQgZml0SW5rQmFyVG9Db250ZW50KHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maXRJbmtCYXJUb0NvbnRlbnQubmV4dChjb2VyY2VCb29sZWFuUHJvcGVydHkodikpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG4gIF9maXRJbmtCYXJUb0NvbnRlbnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcblxuICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTWF0VGFiTGluayksIHtkZXNjZW5kYW50czogdHJ1ZX0pIF9pdGVtczogUXVlcnlMaXN0PE1hdFRhYkxpbms+O1xuICBAVmlld0NoaWxkKCd0YWJMaXN0Q29udGFpbmVyJywge3N0YXRpYzogdHJ1ZX0pIF90YWJMaXN0Q29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCd0YWJMaXN0Jywge3N0YXRpYzogdHJ1ZX0pIF90YWJMaXN0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCduZXh0UGFnaW5hdG9yJykgX25leHRQYWdpbmF0b3I6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdwcmV2aW91c1BhZ2luYXRvcicpIF9wcmV2aW91c1BhZ2luYXRvcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIF9pbmtCYXI6IE1hdElua0JhcjtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICB2aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgICAgICAgICAgICBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9UQUJTX0NPTkZJRykgZGVmYXVsdENvbmZpZz86IE1hdFRhYnNDb25maWcpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBkaXIsIG5nWm9uZSwgY2hhbmdlRGV0ZWN0b3JSZWYsIHZpZXdwb3J0UnVsZXIsIHBsYXRmb3JtLCBhbmltYXRpb25Nb2RlKTtcbiAgICB0aGlzLmRpc2FibGVQYWdpbmF0aW9uID0gZGVmYXVsdENvbmZpZyAmJiBkZWZhdWx0Q29uZmlnLmRpc2FibGVQYWdpbmF0aW9uICE9IG51bGwgP1xuICAgICAgICBkZWZhdWx0Q29uZmlnLmRpc2FibGVQYWdpbmF0aW9uIDogZmFsc2U7XG4gICAgdGhpcy5maXRJbmtCYXJUb0NvbnRlbnQgPSBkZWZhdWx0Q29uZmlnICYmIGRlZmF1bHRDb25maWcuZml0SW5rQmFyVG9Db250ZW50ICE9IG51bGwgP1xuICAgICAgICBkZWZhdWx0Q29uZmlnLmZpdElua0JhclRvQ29udGVudCA6IGZhbHNlO1xuICB9XG5cbiAgb3ZlcnJpZGUgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2lua0JhciA9IG5ldyBNYXRJbmtCYXIodGhpcy5faXRlbXMpO1xuICAgIHN1cGVyLm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpdElua0JhclRvQ29udGVudDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuXG4vKipcbiAqIExpbmsgaW5zaWRlIG9mIGEgYG1hdC10YWItbmF2LWJhcmAuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1ttYXQtdGFiLWxpbmtdLCBbbWF0VGFiTGlua10nLFxuICBleHBvcnRBczogJ21hdFRhYkxpbmsnLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAnZGlzYWJsZVJpcHBsZScsICd0YWJJbmRleCddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGVVcmw6ICd0YWItbGluay5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RhYi1saW5rLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy10YWIgbWF0LW1kYy10YWItbGluayBtYXQtbWRjLWZvY3VzLWluZGljYXRvcicsXG4gICAgJ1thdHRyLmFyaWEtY3VycmVudF0nOiAnYWN0aXZlID8gXCJwYWdlXCIgOiBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbYXR0ci50YWJJbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICdbY2xhc3MubWF0LW1kYy10YWItZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1kYy10YWItLWFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWJMaW5rIGV4dGVuZHMgX01hdFRhYkxpbmtCYXNlIGltcGxlbWVudHMgTWF0SW5rQmFySXRlbSwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBfZm91bmRhdGlvbiA9IG5ldyBNYXRJbmtCYXJGb3VuZGF0aW9uKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9kb2N1bWVudCk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICB0YWJOYXZCYXI6IE1hdFRhYk5hdixcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUykgZ2xvYmFsUmlwcGxlT3B0aW9uczogUmlwcGxlR2xvYmFsT3B0aW9uc3xudWxsLFxuICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZywgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHN1cGVyKHRhYk5hdkJhciwgZWxlbWVudFJlZiwgZ2xvYmFsUmlwcGxlT3B0aW9ucywgdGFiSW5kZXgsIGZvY3VzTW9uaXRvciwgYW5pbWF0aW9uTW9kZSk7XG5cbiAgICB0YWJOYXZCYXIuX2ZpdElua0JhclRvQ29udGVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKS5zdWJzY3JpYmUoZml0SW5rQmFyVG9Db250ZW50ID0+IHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0Rml0VG9Db250ZW50KGZpdElua0JhclRvQ29udGVudCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxufVxuIl19