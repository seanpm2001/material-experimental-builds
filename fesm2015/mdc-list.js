import { InjectionToken, Directive, Optional, Inject, ElementRef, NgZone, ContentChildren, Input, HostBinding, Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, EventEmitter, ChangeDetectorRef, Output, HostListener, forwardRef, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { RippleRenderer, setLines, MAT_RIPPLE_GLOBAL_OPTIONS, MatLine, MatCommonModule, MatLineModule, MatRippleModule, MatPseudoCheckboxModule } from '@angular/material-experimental/mdc-core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { numbers } from '@material/ripple';
import { Subscription, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { DOCUMENT, CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { SelectionModel } from '@angular/cdk/collections';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MDCListFoundation, numbers as numbers$1 } from '@material/list';
export { MAT_LIST, MAT_NAV_LIST, MAT_SELECTION_LIST_VALUE_ACCESSOR } from '@angular/material/list';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection token that can be used to reference instances of an `ListOption`. It serves
 * as alternative token to an actual implementation which could result in undesired
 * retention of the class or circular references breaking runtime execution.
 * @docs-private
 */
const LIST_OPTION = new InjectionToken('ListOption');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * MDC uses the very intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end`
 * to position content such as icons or checkboxes that comes either before or after the text
 * content respectively. This directive detects the placement of the checkbox and applies the
 * correct MDC class to position the icon/avatar on the opposite side.
 * @docs-private
 */
class MatListGraphicAlignmentStyler {
    constructor(_listOption) {
        this._listOption = _listOption;
    }
    _isAlignedAtStart() {
        var _a;
        // By default, in all list items the graphic is aligned at start. In list options,
        // the graphic is only aligned at start if the checkbox is at the end.
        return !this._listOption || ((_a = this._listOption) === null || _a === void 0 ? void 0 : _a._getCheckboxPosition()) === 'after';
    }
}
MatListGraphicAlignmentStyler.decorators = [
    { type: Directive, args: [{
                selector: '[mat-list-avatar], [matListAvatar], [mat-list-icon], [matListIcon]',
                host: {
                    '[class.mdc-list-item__start]': '_isAlignedAtStart()',
                    '[class.mdc-list-item__end]': '!_isAlignedAtStart()',
                }
            },] }
];
MatListGraphicAlignmentStyler.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIST_OPTION,] }] }
];
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
class MatListAvatarCssMatStyler {
}
MatListAvatarCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: '[mat-list-avatar], [matListAvatar]',
                host: { 'class': 'mat-mdc-list-avatar' }
            },] }
];
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
class MatListIconCssMatStyler {
}
MatListIconCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: '[mat-list-icon], [matListIcon]',
                host: { 'class': 'mat-mdc-list-icon' }
            },] }
];
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
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

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function toggleClass(el, className, on) {
    if (on) {
        el.classList.add(className);
    }
    else {
        el.classList.remove(className);
    }
}
/** @docs-private */
class MatListItemBase {
    constructor(_elementRef, _ngZone, _listBase, _platform, globalRippleOptions, animationMode) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._listBase = _listBase;
        this._platform = _platform;
        this._disableRipple = false;
        this._disabled = false;
        this._subscriptions = new Subscription();
        this._rippleRenderer = null;
        // We have to clone the object, because we don't want to mutate a global value when we assign
        // the `animation` further down. The downside of doing this is that the ripple renderer won't
        // pick up dynamic changes to `disabled`, but it's not something we officially support.
        this.rippleConfig = Object.assign({}, (globalRippleOptions || {}));
        this._hostElement = this._elementRef.nativeElement;
        this._noopAnimations = animationMode === 'NoopAnimations';
        if (!this.rippleConfig.animation) {
            this.rippleConfig.animation = {
                enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
                exitDuration: numbers.FG_DEACTIVATION_MS
            };
        }
        if (!this._listBase._isNonInteractive) {
            this._initInteractiveListItem();
        }
        // If no type attribute is specified for a host `<button>` element, set it to `button`. If a
        // type attribute is already specified, we do nothing. We do this for backwards compatibility.
        // TODO: Determine if we intend to continue doing this for the MDC-based list.
        if (this._hostElement.nodeName.toLowerCase() === 'button' &&
            !this._hostElement.hasAttribute('type')) {
            this._hostElement.setAttribute('type', 'button');
        }
    }
    get disableRipple() {
        return this.disabled || this._disableRipple || this._listBase.disableRipple ||
            this._noopAnimations;
    }
    set disableRipple(value) { this._disableRipple = coerceBooleanProperty(value); }
    /** Whether the list-item is disabled. */
    get disabled() { return this._disabled || (this._listBase && this._listBase.disabled); }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Implemented as part of `RippleTarget`.
     * @docs-private
     */
    get rippleDisabled() { return this.disableRipple || !!this.rippleConfig.disabled; }
    ngAfterContentInit() {
        this._monitorLines();
    }
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
        if (this._rippleRenderer !== null) {
            this._rippleRenderer._removeTriggerEvents();
        }
    }
    /** Gets the label for the list item. This is used for the typeahead. */
    _getItemLabel() {
        return this._itemText ? (this._itemText.nativeElement.textContent || '') : '';
    }
    /** Whether the list item has icons or avatars. */
    _hasIconOrAvatar() {
        return !!(this._avatars.length || this._icons.length);
    }
    _initInteractiveListItem() {
        this._hostElement.classList.add('mat-mdc-list-item-interactive');
        this._rippleRenderer =
            new RippleRenderer(this, this._ngZone, this._hostElement, this._platform);
        this._rippleRenderer.setupTriggerEvents(this._hostElement);
    }
    /**
     * Subscribes to changes in `MatLine` content children and annotates them
     * appropriately when they change.
     */
    _monitorLines() {
        this._ngZone.runOutsideAngular(() => {
            this._subscriptions.add(this.lines.changes.pipe(startWith(this.lines))
                .subscribe((lines) => {
                toggleClass(this._hostElement, 'mat-mdc-list-item-single-line', lines.length <= 1);
                toggleClass(this._hostElement, 'mdc-list-item--with-one-line', lines.length <= 1);
                lines.forEach((line, index) => {
                    toggleClass(this._hostElement, 'mdc-list-item--with-two-lines', lines.length === 2);
                    toggleClass(this._hostElement, 'mdc-list-item--with-three-lines', lines.length === 3);
                    toggleClass(line.nativeElement, 'mdc-list-item__primary-text', index === 0 && lines.length > 1);
                    toggleClass(line.nativeElement, 'mdc-list-item__secondary-text', index !== 0);
                });
                setLines(lines, this._elementRef, 'mat-mdc');
            }));
        });
    }
}
MatListItemBase.decorators = [
    { type: Directive }
];
MatListItemBase.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: MatListBase },
    { type: Platform },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
MatListItemBase.propDecorators = {
    _avatars: [{ type: ContentChildren, args: [MatListAvatarCssMatStyler, { descendants: false },] }],
    _icons: [{ type: ContentChildren, args: [MatListIconCssMatStyler, { descendants: false },] }],
    disableRipple: [{ type: Input }],
    disabled: [{ type: HostBinding, args: ['class.mdc-list-item--disabled',] }, { type: HostBinding, args: ['attr.aria-disabled',] }, { type: Input }]
};
/** @docs-private */
class MatListBase {
    constructor() {
        this._isNonInteractive = true;
        this._disableRipple = false;
        this._disabled = false;
    }
    /** Whether ripples for all list items is disabled. */
    get disableRipple() { return this._disableRipple; }
    set disableRipple(value) { this._disableRipple = coerceBooleanProperty(value); }
    /** Whether all list items are disabled. */
    get disabled() { return this._disabled; }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
}
MatListBase.decorators = [
    { type: Directive }
];
MatListBase.propDecorators = {
    _isNonInteractive: [{ type: HostBinding, args: ['class.mat-mdc-list-non-interactive',] }],
    disableRipple: [{ type: Input }],
    disabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }, { type: Input }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatActionList extends MatListBase {
    constructor() {
        super(...arguments);
        // An navigation list is considered interactive, but does not extend the interactive list
        // base class. We do this because as per MDC, items of interactive lists are only reachable
        // through keyboard shortcuts. We want all items for the navigation list to be reachable
        // through tab key as we do not intend to provide any special accessibility treatment. The
        // accessibility treatment depends on how the end-user will interact with it.
        this._isNonInteractive = false;
    }
}
MatActionList.decorators = [
    { type: Component, args: [{
                selector: 'mat-action-list',
                exportAs: 'matActionList',
                template: '<ng-content></ng-content>',
                host: {
                    'class': 'mat-mdc-action-list mat-mdc-list-base mdc--list',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    { provide: MatListBase, useExisting: MatActionList },
                ],
                styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text,.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:24px;height:24px}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image .mdc-list-item__start{width:56px;height:56px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{width:100px;height:56px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch .mdc-list-item__start{width:36px;height:20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:24px;height:24px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch .mdc-list-item__end{width:36px;height:20px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-list-divider{height:1px;padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mat-mdc-list-base{display:block}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0}.mat-mdc-list-non-interactive .mdc-list-item{cursor:default}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item.mdc-list-item--with-trailing-meta>.mdc-list-item__end:empty{display:none}\n"]
            },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatList extends MatListBase {
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
                styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text,.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:24px;height:24px}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image .mdc-list-item__start{width:56px;height:56px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{width:100px;height:56px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch .mdc-list-item__start{width:36px;height:20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:24px;height:24px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch .mdc-list-item__end{width:36px;height:20px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-list-divider{height:1px;padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mat-mdc-list-base{display:block}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0}.mat-mdc-list-non-interactive .mdc-list-item{cursor:default}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item.mdc-list-item--with-trailing-meta>.mdc-list-item__end:empty{display:none}\n"]
            },] }
];
class MatListItem extends MatListItemBase {
    constructor(element, ngZone, listBase, platform, globalRippleOptions, animationMode) {
        super(element, ngZone, listBase, platform, globalRippleOptions, animationMode);
    }
}
MatListItem.decorators = [
    { type: Component, args: [{
                selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
                exportAs: 'matListItem',
                host: {
                    'class': 'mat-mdc-list-item mdc-list-item',
                    '[class.mdc-list-item--with-leading-avatar]': '_avatars.length !== 0',
                    '[class.mdc-list-item--with-leading-icon]': '_icons.length !== 0',
                    // If there are projected lines, we project the remaining content into the `mdc-list-item__end`
                    // container. In order to make sure the container aligns properly (if there is content), we add
                    // the trailing meta class. Note that we also add this even if there is no projected `meta`
                    // content. This is because there is no good way to check for remaining projected content.
                    '[class.mdc-list-item--with-trailing-meta]': 'lines.length !== 0',
                    '[class._mat-animation-noopable]': '_noopAnimations',
                },
                template: "<ng-content select=\"[mat-list-avatar],[matListAvatar],[mat-list-icon],[matListIcon]\"></ng-content>\n\n<!-- If lines were explicitly given, use those as the text. -->\n<ng-container *ngIf=\"lines.length\">\n  <span class=\"mdc-list-item__content\"><ng-content select=\"[mat-line],[matLine]\"></ng-content></span>\n</ng-container>\n\n<!--\n  If lines were not explicitly given, assume the remaining content is the text, otherwise assume it\n  is an action that belongs in the \"end\" section.\n-->\n<span [class.mdc-list-item__content]=\"!lines.length\"\n      [class.mdc-list-item__end]=\"lines.length\" #text>\n  <ng-content></ng-content>\n</span>\n\n<ng-content select=\"mat-divider\"></ng-content>\n\n<!--\n  Strong focus indicator element. MDC uses the `::before` pseudo element for the default\n  focus/hover/selected state, so we need a separate element.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
MatListItem.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: MatListBase },
    { type: Platform },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
MatListItem.propDecorators = {
    lines: [{ type: ContentChildren, args: [MatLine, { read: ElementRef, descendants: true },] }],
    _itemText: [{ type: ViewChild, args: ['text',] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection token that can be used to reference instances of an `SelectionList`. It serves
 * as alternative token to an actual implementation which would result in circular references.
 * @docs-private
 */
const SELECTION_LIST = new InjectionToken('SelectionList');
class MatListOption extends MatListItemBase {
    constructor(element, ngZone, platform, _selectionList, _changeDetectorRef, globalRippleOptions, animationMode) {
        super(element, ngZone, _selectionList, platform, globalRippleOptions, animationMode);
        this._selectionList = _selectionList;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * This is set to true after the first OnChanges cycle so we don't
         * clear the value of `selected` in the first cycle.
         */
        this._inputsInitialized = false;
        /**
         * Emits when the selected state of the option has changed.
         * Use to facilitate two-data binding to the `selected` property.
         * @docs-private
         */
        this.selectedChange = new EventEmitter();
        /** Whether the label should appear before or after the checkbox. Defaults to 'after' */
        this.checkboxPosition = 'after';
        this._selected = false;
        // By default, we mark all options as unselected. The MDC list foundation will
        // automatically update the attribute based on selection. Note that we need to
        // initially set this because MDC does not set the default attributes for list
        // items but expects items to be set up properly in the static markup.
        element.nativeElement.setAttribute('aria-selected', 'false');
    }
    /** Theme color of the list option. This sets the color of the checkbox. */
    get color() { return this._color || this._selectionList.color; }
    set color(newValue) { this._color = newValue; }
    /** Value of the option */
    get value() { return this._value; }
    set value(newValue) {
        if (this.selected && newValue !== this.value && this._inputsInitialized) {
            this.selected = false;
        }
        this._value = newValue;
    }
    /** Whether the option is selected. */
    get selected() { return this._selectionList.selectedOptions.isSelected(this); }
    set selected(value) {
        const isSelected = coerceBooleanProperty(value);
        if (isSelected !== this._selected) {
            this._setSelected(isSelected);
            if (isSelected || this._selectionList.multiple) {
                this._selectionList._reportValueChange();
            }
        }
    }
    ngOnInit() {
        const list = this._selectionList;
        if (list._value && list._value.some(value => list.compareWith(value, this._value))) {
            this._setSelected(true);
        }
        const wasSelected = this._selected;
        // List options that are selected at initialization can't be reported properly to the form
        // control. This is because it takes some time until the selection-list knows about all
        // available options. Also it can happen that the ControlValueAccessor has an initial value
        // that should be used instead. Deferring the value change report to the next tick ensures
        // that the form control value is not being overwritten.
        Promise.resolve().then(() => {
            if (this._selected || wasSelected) {
                this.selected = true;
                this._changeDetectorRef.markForCheck();
            }
        });
        this._inputsInitialized = true;
    }
    ngOnDestroy() {
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(() => {
                this.selected = false;
            });
        }
    }
    /** Toggles the selection state of the option. */
    toggle() {
        this.selected = !this.selected;
    }
    /** Allows for programmatic focusing of the option. */
    focus() {
        this._hostElement.focus();
    }
    /** Whether a checkbox is shown at the given position. */
    _hasCheckboxAt(position) {
        return this._selectionList.multiple && this._getCheckboxPosition() === position;
    }
    /** Whether icons or avatars are shown at the given position. */
    _hasIconsOrAvatarsAt(position) {
        return this._hasProjected('icons', position) || this._hasProjected('avatars', position);
    }
    /** Gets whether the given type of element is projected at the specified position. */
    _hasProjected(type, position) {
        // If the checkbox is shown at the specified position, neither icons or
        // avatars can be shown at the position.
        return this._getCheckboxPosition() !== position &&
            (type === 'avatars' ? this._avatars.length !== 0 : this._icons.length !== 0);
    }
    _handleBlur() {
        this._selectionList._onTouched();
    }
    /** Gets the current position of the checkbox. */
    _getCheckboxPosition() {
        return this.checkboxPosition || 'after';
    }
    /**
     * Sets the selected state of the option.
     * @returns Whether the value has changed.
     */
    _setSelected(selected) {
        if (selected === this._selected) {
            return false;
        }
        this._selected = selected;
        if (selected) {
            this._selectionList.selectedOptions.select(this);
        }
        else {
            this._selectionList.selectedOptions.deselect(this);
        }
        this.selectedChange.emit(selected);
        this._changeDetectorRef.markForCheck();
        return true;
    }
    /**
     * Notifies Angular that the option needs to be checked in the next change detection run.
     * Mainly used to trigger an update of the list option if the disabled state of the selection
     * list changed.
     */
    _markForCheck() {
        this._changeDetectorRef.markForCheck();
    }
}
MatListOption.decorators = [
    { type: Component, args: [{
                selector: 'mat-list-option',
                exportAs: 'matListOption',
                host: {
                    'class': 'mat-mdc-list-item mat-mdc-list-option mdc-list-item',
                    'role': 'option',
                    // As per MDC, only list items in single selection mode should receive the `--selected`
                    // class. For multi selection, the checkbox is used as indicator.
                    '[class.mdc-list-item--selected]': 'selected && !_selectionList.multiple',
                    // Based on the checkbox position and whether there are icons or avatars, we apply MDC's
                    // list-item `--leading` and `--trailing` classes.
                    '[class.mdc-list-item--with-leading-avatar]': '_hasProjected("avatars", "before")',
                    '[class.mdc-list-item--with-leading-icon]': '_hasProjected("icons", "before")',
                    '[class.mdc-list-item--with-trailing-icon]': '_hasProjected("icons", "after")',
                    '[class.mat-mdc-list-option-with-trailing-avatar]': '_hasProjected("avatars", "after")',
                    // Based on the checkbox position, we apply the `--leading` or `--trailing` MDC classes
                    // which ensure that the checkbox is positioned correctly within the list item.
                    '[class.mdc-list-item--with-leading-checkbox]': '_hasCheckboxAt("before")',
                    '[class.mdc-list-item--with-trailing-checkbox]': '_hasCheckboxAt("after")',
                    '[class.mat-accent]': 'color !== "primary" && color !== "warn"',
                    '[class.mat-warn]': 'color === "warn"',
                    '[class._mat-animation-noopable]': '_noopAnimations',
                    '(blur)': '_handleBlur()',
                },
                template: "<!--\n  Save icons and the pseudo checkbox so that they can be re-used in the template without\n  duplication. Also content can only be injected once so we need to extract icons/avatars\n  into a template since we use it in multiple places.\n-->\n<ng-template #icons>\n  <ng-content select=\"[mat-list-avatar],[matListAvatar],[mat-list-icon],[matListIcon]\">\n  </ng-content>\n</ng-template>\n\n<ng-template #checkbox>\n  <div class=\"mdc-checkbox\" [class.mdc-checkbox--disabled]=\"disabled\">\n    <input type=\"checkbox\" class=\"mdc-checkbox__native-control\"\n           [checked]=\"selected\" [disabled]=\"disabled\"/>\n    <div class=\"mdc-checkbox__background\">\n      <svg class=\"mdc-checkbox__checkmark\"\n           viewBox=\"0 0 24 24\">\n        <path class=\"mdc-checkbox__checkmark-path\"\n              fill=\"none\"\n              d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n      </svg>\n      <div class=\"mdc-checkbox__mixedmark\"></div>\n    </div>\n  </div>\n</ng-template>\n\n<!-- Container for the checkbox at start. -->\n<span class=\"mdc-list-item__start mat-mdc-list-option-checkbox-before\"\n      *ngIf=\"_hasCheckboxAt('before')\">\n  <ng-template [ngTemplateOutlet]=\"checkbox\"></ng-template>\n</span>\n<!-- Conditionally renders icons/avatars before the list item text. -->\n<ng-template [ngIf]=\"_hasIconsOrAvatarsAt('before')\">\n  <ng-template [ngTemplateOutlet]=\"icons\"></ng-template>\n</ng-template>\n\n<!-- Text -->\n<span class=\"mdc-list-item__content\" #text>\n  <ng-content></ng-content>\n</span>\n\n<!-- Container for the checkbox at the end. -->\n<span class=\"mdc-list-item__end\" *ngIf=\"_hasCheckboxAt('after')\">\n  <ng-template [ngTemplateOutlet]=\"checkbox\"></ng-template>\n</span>\n<!-- Conditionally renders icons/avatars after the list item text. -->\n<ng-template [ngIf]=\"_hasIconsOrAvatarsAt('after')\">\n  <ng-template [ngTemplateOutlet]=\"icons\"></ng-template>\n</ng-template>\n\n<!-- Divider -->\n<ng-content select=\"mat-divider\"></ng-content>\n\n<!--\n  Strong focus indicator element. MDC uses the `::before` pseudo element for the default\n  focus/hover/selected state, so we need a separate element.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    { provide: MatListItemBase, useExisting: MatListOption },
                    { provide: LIST_OPTION, useExisting: MatListOption },
                ],
                styles: [".mat-mdc-list-option-with-trailing-avatar.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mat-mdc-list-option-with-trailing-avatar.mdc-list-item,.mat-mdc-list-option-with-trailing-avatar.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end,.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{width:40px;height:40px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end{border-radius:50%}.mat-mdc-list-option .mdc-checkbox{padding:calc((40px - 18px) / 2);padding:calc((var(--mdc-checkbox-ripple-size, 40px) - 18px) / 2);margin:calc((40px - 40px) / 2);margin:calc((var(--mdc-checkbox-touch-target-size, 40px) - 40px) / 2)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__background{top:calc((40px - 18px) / 2);top:calc((var(--mdc-checkbox-ripple-size, 40px) - 18px) / 2);left:calc((40px - 18px) / 2);left:calc((var(--mdc-checkbox-ripple-size, 40px) - 18px) / 2)}.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control{top:calc((40px - 40px) / 2);top:calc((40px - var(--mdc-checkbox-touch-target-size, 40px)) / 2);right:calc((40px - 40px) / 2);right:calc((40px - var(--mdc-checkbox-touch-target-size, 40px)) / 2);left:calc((40px - 40px) / 2);left:calc((40px - var(--mdc-checkbox-touch-target-size, 40px)) / 2);width:40px;width:var(--mdc-checkbox-touch-target-size, 40px);height:40px;height:var(--mdc-checkbox-touch-target-size, 40px)}.mat-mdc-list-option .mdc-touch-target-wrapper{display:inline}.mat-mdc-list-option .mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-list-option .mdc-checkbox__mixedmark{margin:0 1px}}.mat-mdc-list-option .mdc-checkbox--disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color}.mat-mdc-list-option .mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0}.mdc-checkbox--upgraded .mat-mdc-list-option .mdc-checkbox__checkmark{opacity:1}.mat-mdc-list-option .mdc-checkbox__checkmark-path{stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mat-mdc-list-option .mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mat-mdc-list-option .mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mat-mdc-list-option .mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mat-mdc-list-option .mdc-checkbox--touch{margin:calc((48px - 40px) / 2);margin:calc((var(--mdc-checkbox-state-layer-size, 48px) - var(--mdc-checkbox-state-layer-size, 40px)) / 2)}.mat-mdc-list-option .mdc-checkbox--touch .mdc-checkbox__native-control{top:calc((40px - 48px) / 2);top:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);right:calc((40px - 48px) / 2);right:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);left:calc((40px - 48px) / 2);left:calc((var(--mdc-checkbox-state-layer-size, 40px) - var(--mdc-checkbox-state-layer-size, 48px)) / 2);width:48px;width:var(--mdc-checkbox-state-layer-size, 48px);height:48px;height:var(--mdc-checkbox-state-layer-size, 48px)}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{opacity:1}.mat-mdc-list-option .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0}.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mat-mdc-list-option .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}@keyframes mdc-checkbox-fade-in-background-8A000000FF01878600000000FF018786{0%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unchecked-color, rgba(0, 0, 0, 0.54));background-color:transparent}50%{border-color:#018786;border-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #018786));background-color:#018786;background-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #018786))}}@keyframes mdc-checkbox-fade-out-background-8A000000FF01878600000000FF018786{0%,80%{border-color:#018786;border-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #018786));background-color:#018786;background-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #018786))}100%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unchecked-color, rgba(0, 0, 0, 0.54));background-color:transparent}}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FF01878600000000FF018786}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FF01878600000000FF018786}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__background{transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__mixedmark{transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mat-mdc-list-option:not(._mat-animation-noopable) .mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}.mat-mdc-list-option .mdc-checkbox__native-control{display:none}.cdk-high-contrast-active .mat-mdc-list-option.mdc-deprecated-list-item--selected::after{content:\"\";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active [dir=rtl] .mat-mdc-list-option.mdc-deprecated-list-item--selected::after{right:auto;left:16px}\n"]
            },] }
];
MatListOption.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Platform },
    { type: undefined, decorators: [{ type: Inject, args: [SELECTION_LIST,] }] },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
MatListOption.propDecorators = {
    selectedChange: [{ type: Output }],
    _itemText: [{ type: ViewChild, args: ['text',] }],
    lines: [{ type: ContentChildren, args: [MatLine, { read: ElementRef, descendants: true },] }],
    checkboxPosition: [{ type: Input }],
    color: [{ type: Input }],
    value: [{ type: Input }],
    selected: [{ type: Input }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatNavList extends MatListBase {
    constructor() {
        super(...arguments);
        // An navigation list is considered interactive, but does not extend the interactive list
        // base class. We do this because as per MDC, items of interactive lists are only reachable
        // through keyboard shortcuts. We want all items for the navigation list to be reachable
        // through tab key as we do not intend to provide any special accessibility treatment. The
        // accessibility treatment depends on how the end-user will interact with it.
        this._isNonInteractive = false;
    }
}
MatNavList.decorators = [
    { type: Component, args: [{
                selector: 'mat-nav-list',
                exportAs: 'matNavList',
                template: '<ng-content></ng-content>',
                host: {
                    'class': 'mat-mdc-nav-list mat-mdc-list-base mdc-list',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    { provide: MatListBase, useExisting: MatNavList },
                ],
                styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text,.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:24px;height:24px}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image .mdc-list-item__start{width:56px;height:56px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{width:100px;height:56px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch .mdc-list-item__start{width:36px;height:20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:24px;height:24px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch .mdc-list-item__end{width:36px;height:20px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-list-divider{height:1px;padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mat-mdc-list-base{display:block}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0}.mat-mdc-list-non-interactive .mdc-list-item{cursor:default}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item.mdc-list-item--with-trailing-meta>.mdc-list-item__end:empty{display:none}\n"]
            },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @docs-private */
class MatInteractiveListBase extends MatListBase {
    constructor(_element, document) {
        super();
        this._element = _element;
        this._itemsArr = [];
        this._subscriptions = new Subscription();
        this._document = document;
        this._isNonInteractive = false;
    }
    _handleKeydown(event) {
        const index = this._indexForElement(event.target);
        this._foundation.handleKeydown(event, this._elementAtIndex(index) === event.target, index);
    }
    _handleClick(event) {
        // The `toggleCheckbox` parameter can always be `true` as it only has an effect if the list
        // is recognized as checkbox selection list. For such lists, we would always want to toggle
        // the checkbox on list item click. MDC added this parameter so that they can avoid dispatching
        // a fake `change` event when the checkbox is directly clicked for the list item. We don't
        // need this as we require such list item checkboxes to stop propagation of the change event.
        // https://github.com/material-components/material-components-web/blob/08ca4d0ec5f359bc3a20bd2a302fa6b733b5e135/packages/mdc-list/component.ts#L308-L310
        this._foundation.handleClick(this._indexForElement(event.target), 
        /* toggleCheckbox */ true);
    }
    _handleFocusin(event) {
        var _a;
        const itemIndex = this._indexForElement(event.target);
        const tabIndex = (_a = this._itemsArr[itemIndex]) === null || _a === void 0 ? void 0 : _a._hostElement.tabIndex;
        // If the newly focused item is not the designated item that should have received focus
        // first through keyboard interaction, the tabindex of the previously designated list item
        // needs to be cleared, so that only one list item is reachable through tab key at any time.
        // MDC sets a tabindex for the newly focused item, so we do not need to set a tabindex for it.
        // Workaround for: https://github.com/material-components/material-components-web/issues/6363.
        if (tabIndex === undefined || tabIndex === -1) {
            this._clearTabindexForAllItems();
        }
        this._foundation.handleFocusIn(itemIndex);
    }
    _handleFocusout(event) {
        this._foundation.handleFocusOut(this._indexForElement(event.target));
    }
    _initWithAdapter(adapter) {
        this._adapter = adapter;
        this._foundation = new MDCListFoundation(adapter);
    }
    ngAfterViewInit() {
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && !this._foundation) {
            throw Error('MDC list foundation not initialized for Angular Material list.');
        }
        this._foundation.init();
        this._watchListItems();
        // Enable typeahead and focus wrapping for interactive lists.
        this._foundation.setHasTypeahead(true);
        this._foundation.setWrapFocus(true);
    }
    ngOnDestroy() {
        this._foundation.destroy();
        this._subscriptions.unsubscribe();
    }
    _watchListItems() {
        this._subscriptions.add(this._items.changes.pipe(startWith(null)).subscribe(() => {
            this._itemsArr = this._items.toArray();
            // Whenever the items change, the foundation needs to be notified through the `layout`
            // method. It caches items for the typeahead and detects the list type based on the items.
            this._foundation.layout();
            // The list items changed, so we reset the tabindex for all items and
            // designate one list item that will be reachable through tab.
            this._resetTabindexToFirstSelectedOrFocusedItem();
        }));
    }
    /**
     * Clears the tabindex of all items so that no items are reachable through tab key.
     * MDC intends to always have only one tabbable item that will receive focus first.
     * This first item is selected by MDC automatically on blur or by manually invoking
     * the `setTabindexToFirstSelectedOrFocusedItem` method.
     */
    _clearTabindexForAllItems() {
        for (let items of this._itemsArr) {
            items._hostElement.setAttribute('tabindex', '-1');
        }
    }
    /**
     * Resets tabindex for all options and sets tabindex for the first selected option or
     * previously focused item so that an item can be reached when users tab into the list.
     */
    _resetTabindexToFirstSelectedOrFocusedItem() {
        this._clearTabindexForAllItems();
        // MDC does not expose the method for setting the tabindex to the first selected
        // or previously focused item. We can still access the method as private class
        // members are accessible in the transpiled JavaScript. Tracked upstream with:
        // TODO: https://github.com/material-components/material-components-web/issues/6375
        this._foundation.setTabindexToFirstSelectedOrFocusedItem();
    }
    _elementAtIndex(index) {
        var _a;
        return (_a = this._itemsArr[index]) === null || _a === void 0 ? void 0 : _a._hostElement;
    }
    _indexForElement(element) {
        return element ?
            this._itemsArr.findIndex(i => i._hostElement.contains(element)) : -1;
    }
}
MatInteractiveListBase.decorators = [
    { type: Directive }
];
MatInteractiveListBase.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
MatInteractiveListBase.propDecorators = {
    _handleKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    _handleClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    _handleFocusin: [{ type: HostListener, args: ['focusin', ['$event'],] }],
    _handleFocusout: [{ type: HostListener, args: ['focusout', ['$event'],] }]
};
// TODO: replace with class once material-components-web/pull/6256 is available.
/** Gets an instance of `MDcListAdapter` for the given interactive list. */
function getInteractiveListAdapter(list) {
    return {
        getListItemCount() {
            return list._items.length;
        },
        listItemAtIndexHasClass(index, className) {
            const element = list._elementAtIndex(index);
            return element ? element.classList.contains(className) : false;
        },
        addClassForElementIndex(index, className) {
            var _a;
            (_a = list._elementAtIndex(index)) === null || _a === void 0 ? void 0 : _a.classList.add(className);
        },
        removeClassForElementIndex(index, className) {
            var _a;
            (_a = list._elementAtIndex(index)) === null || _a === void 0 ? void 0 : _a.classList.remove(className);
        },
        getAttributeForElementIndex(index, attr) {
            const element = list._elementAtIndex(index);
            return element ? element.getAttribute(attr) : null;
        },
        setAttributeForElementIndex(index, attr, value) {
            var _a;
            (_a = list._elementAtIndex(index)) === null || _a === void 0 ? void 0 : _a.setAttribute(attr, value);
        },
        getFocusedElementIndex() {
            var _a;
            return list._indexForElement((_a = list._document) === null || _a === void 0 ? void 0 : _a.activeElement);
        },
        isFocusInsideList() {
            var _a;
            return list._element.nativeElement.contains((_a = list._document) === null || _a === void 0 ? void 0 : _a.activeElement);
        },
        isRootFocused() {
            var _a;
            return list._element.nativeElement === ((_a = list._document) === null || _a === void 0 ? void 0 : _a.activeElement);
        },
        focusItemAtIndex(index) {
            var _a;
            (_a = list._elementAtIndex(index)) === null || _a === void 0 ? void 0 : _a.focus();
        },
        // Gets the text for a list item for the typeahead
        getPrimaryTextAtIndex(index) {
            return list._itemsArr[index]._getItemLabel();
        },
        // MDC uses this method to disable focusable children of list items. However, we believe that
        // this is not an accessible pattern and should be avoided, therefore we intentionally do not
        // implement this method. In addition, implementing this would require violating Angular
        // Material's general principle of not having components modify DOM elements they do not own.
        // A user who feels they really need this feature can simply listen to the `(focus)` and
        // `(blur)` events on the list item and enable/disable focus on the children themselves as
        // appropriate.
        setTabIndexForListItemChildren() { },
        // The following methods have a dummy implementation in the base class because they are only
        // applicable to certain types of lists. They should be implemented for the concrete classes
        // where they are applicable.
        hasCheckboxAtIndex() { return false; },
        hasRadioAtIndex(index) { return false; },
        setCheckedCheckboxOrRadioAtIndex(index, checked) { },
        isCheckboxCheckedAtIndex(index) { return false; },
        notifyAction() { },
    };
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const MAT_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatSelectionList),
    multi: true
};
/** Change event that is being fired whenever the selected state of an option changes. */
class MatSelectionListChange {
    constructor(
    /** Reference to the selection list that emitted the event. */
    source, 
    /**
     * Reference to the option that has been changed.
     * @deprecated Use `options` instead, because some events may change more than one option.
     * @breaking-change 12.0.0
     */
    option, 
    /** Reference to the options that have been changed. */
    options) {
        this.source = source;
        this.option = option;
        this.options = options;
    }
}
class MatSelectionList extends MatInteractiveListBase {
    constructor(element, document) {
        super(element, document);
        this._multiple = true;
        this._initialized = false;
        /** Emits a change event whenever the selected state of an option changes. */
        this.selectionChange = new EventEmitter();
        /** Theme color of the selection list. This sets the checkbox color for all list options. */
        this.color = 'accent';
        /**
         * Function used for comparing an option against the selected value when determining which
         * options should appear as selected. The first argument is the value of an options. The second
         * one is a value from the selected value. A boolean must be returned.
         */
        this.compareWith = (a1, a2) => a1 === a2;
        /** The currently selected options. */
        this.selectedOptions = new SelectionModel(this._multiple);
        /** View to model callback that should be called whenever the selected options change. */
        this._onChange = (_) => { };
        /** Emits when the list has been destroyed. */
        this._destroyed = new Subject();
        /** View to model callback that should be called if the list or its options lost focus. */
        this._onTouched = () => { };
        super._initWithAdapter(getSelectionListAdapter(this));
    }
    /** Whether selection is limited to one or multiple items (default multiple). */
    get multiple() { return this._multiple; }
    set multiple(value) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._multiple) {
            if ((typeof ngDevMode === 'undefined' || ngDevMode) && this._initialized) {
                throw new Error('Cannot change `multiple` mode of mat-selection-list after initialization.');
            }
            this._multiple = newValue;
            this.selectedOptions = new SelectionModel(this._multiple, this.selectedOptions.selected);
        }
    }
    ngAfterViewInit() {
        // Mark the selection list as initialized so that the `multiple`
        // binding can no longer be changed.
        this._initialized = true;
        // Update the options if a control value has been set initially. Note that this should happen
        // before watching for selection changes as otherwise we would sync options with MDC multiple
        // times as part of view initialization (also the foundation would not be initialized yet).
        if (this._value) {
            this._setOptionsFromValues(this._value);
        }
        // Start monitoring the selected options so that the list foundation can be
        // updated accordingly.
        this._watchForSelectionChange();
        // Initialize the list foundation, including the initial `layout()` invocation.
        super.ngAfterViewInit();
        // List options can be pre-selected using the `selected` input. We need to sync the selected
        // options after view initialization with the foundation so that focus can be managed
        // accordingly. Note that this needs to happen after the initial `layout()` call because the
        // list wouldn't know about multi-selection and throw.
        if (this._items.length !== 0) {
            this._syncSelectedOptionsWithFoundation();
            this._resetTabindexForItemsIfBlurred();
        }
    }
    ngOnChanges(changes) {
        const disabledChanges = changes['disabled'];
        const disableRippleChanges = changes['disableRipple'];
        if ((disableRippleChanges && !disableRippleChanges.firstChange) ||
            (disabledChanges && !disabledChanges.firstChange)) {
            this._markOptionsForCheck();
        }
    }
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
        this._isDestroyed = true;
    }
    /** Focuses the selection list. */
    focus(options) {
        this._element.nativeElement.focus(options);
    }
    /** Selects all of the options. Returns the options that changed as a result. */
    selectAll() {
        return this._setAllOptionsSelected(true);
    }
    /** Deselects all of the options. Returns the options that changed as a result. */
    deselectAll() {
        return this._setAllOptionsSelected(false);
    }
    /** Reports a value change to the ControlValueAccessor */
    _reportValueChange() {
        // Stop reporting value changes after the list has been destroyed. This avoids
        // cases where the list might wrongly reset its value once it is removed, but
        // the form control is still live.
        if (this.options && !this._isDestroyed) {
            const value = this._getSelectedOptionValues();
            this._onChange(value);
            this._value = value;
        }
    }
    /** Emits a change event if the selected state of an option changed. */
    _emitChangeEvent(options) {
        this.selectionChange.emit(new MatSelectionListChange(this, options[0], options));
    }
    /** Implemented as part of ControlValueAccessor. */
    writeValue(values) {
        this._value = values;
        if (this.options) {
            this._setOptionsFromValues(values || []);
        }
    }
    /** Implemented as a part of ControlValueAccessor. */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * Resets tabindex for all options and sets tabindex for the first selected option so that
     * it will become active when users tab into the selection-list. This will be a noop if the
     * list is currently focused as otherwise multiple options might become reachable through tab.
     * e.g. A user currently already focused an option. We set tabindex to a new option but the
     * focus on the current option does persist. Pressing `TAB` then might go to the other option
     * that received a tabindex. We can skip the reset here as the MDC foundation resets the
     * tabindex to the first selected option automatically once the current item is blurred.
     */
    _resetTabindexForItemsIfBlurred() {
        // If focus is inside the list already, then we do not change the tab index of the list.
        // Changing it while an item is focused could cause multiple items to be reachable through
        // the tab key. The MDC list foundation will update the tabindex on blur to the appropriate
        // selected or focused item.
        if (!this._adapter.isFocusInsideList()) {
            this._resetTabindexToFirstSelectedOrFocusedItem();
        }
    }
    _watchForSelectionChange() {
        // Sync external changes to the model back to the options.
        this.selectedOptions.changed.pipe(takeUntil(this._destroyed)).subscribe(event => {
            if (event.added) {
                for (let item of event.added) {
                    item.selected = true;
                }
            }
            if (event.removed) {
                for (let item of event.removed) {
                    item.selected = false;
                }
            }
            // Sync the newly selected options with the foundation. Also reset tabindex for all
            // items if the list is currently not focused. We do this so that always the first
            // selected list item is focused when users tab into the selection list.
            this._syncSelectedOptionsWithFoundation();
            this._resetTabindexForItemsIfBlurred();
        });
    }
    _syncSelectedOptionsWithFoundation() {
        if (this._multiple) {
            this._foundation.setSelectedIndex(this.selectedOptions.selected
                .map(o => this._itemsArr.indexOf(o)));
        }
        else {
            const selected = this.selectedOptions.selected[0];
            const index = selected === undefined ?
                numbers$1.UNSET_INDEX : this._itemsArr.indexOf(selected);
            this._foundation.setSelectedIndex(index);
        }
    }
    /** Sets the selected options based on the specified values. */
    _setOptionsFromValues(values) {
        this.options.forEach(option => option._setSelected(false));
        values.forEach(value => {
            const correspondingOption = this.options.find(option => {
                // Skip options that are already in the model. This allows us to handle cases
                // where the same primitive value is selected multiple times.
                return option.selected ? false : this.compareWith(option.value, value);
            });
            if (correspondingOption) {
                correspondingOption._setSelected(true);
            }
        });
    }
    /** Returns the values of the selected options. */
    _getSelectedOptionValues() {
        return this.options.filter(option => option.selected).map(option => option.value);
    }
    /** Marks all the options to be checked in the next change detection run. */
    _markOptionsForCheck() {
        if (this.options) {
            this.options.forEach(option => option._markForCheck());
        }
    }
    /**
     * Sets the selected state on all of the options
     * and emits an event if anything changed.
     */
    _setAllOptionsSelected(isSelected, skipDisabled) {
        // Keep track of whether anything changed, because we only want to
        // emit the changed event when something actually changed.
        const changedOptions = [];
        this.options.forEach(option => {
            if ((!skipDisabled || !option.disabled) && option._setSelected(isSelected)) {
                changedOptions.push(option);
            }
        });
        if (changedOptions.length) {
            this._reportValueChange();
        }
        return changedOptions;
    }
    // Note: This getter exists for backwards compatibility. The `_items` query list
    // cannot be named `options` as it will be picked up by the interactive list base.
    /** The option components contained within this selection-list. */
    get options() {
        return this._items;
    }
}
MatSelectionList.decorators = [
    { type: Component, args: [{
                selector: 'mat-selection-list',
                exportAs: 'matSelectionList',
                host: {
                    'class': 'mat-mdc-selection-list mat-mdc-list-base mdc-list',
                    'role': 'listbox',
                    '[attr.aria-multiselectable]': 'multiple',
                },
                template: '<ng-content></ng-content>',
                encapsulation: ViewEncapsulation.None,
                providers: [
                    MAT_SELECTION_LIST_VALUE_ACCESSOR,
                    { provide: MatListBase, useExisting: MatSelectionList },
                    { provide: SELECTION_LIST, useExisting: MatSelectionList },
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text,.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:24px;height:24px}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image .mdc-list-item__start{width:56px;height:56px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{width:100px;height:56px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch .mdc-list-item__start{width:36px;height:20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:24px;height:24px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch .mdc-list-item__end{width:36px;height:20px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-list-divider{height:1px;padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mat-mdc-list-base{display:block}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0}.mat-mdc-list-non-interactive .mdc-list-item{cursor:default}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item.mdc-list-item--with-trailing-meta>.mdc-list-item__end:empty{display:none}\n"]
            },] }
];
MatSelectionList.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
MatSelectionList.propDecorators = {
    _items: [{ type: ContentChildren, args: [MatListOption, { descendants: true },] }],
    selectionChange: [{ type: Output }],
    color: [{ type: Input }],
    compareWith: [{ type: Input }],
    multiple: [{ type: Input }]
};
// TODO: replace with class using inheritance once material-components-web/pull/6256 is available.
/** Gets a `MDCListAdapter` instance for the given selection list. */
function getSelectionListAdapter(list) {
    const baseAdapter = getInteractiveListAdapter(list);
    return Object.assign(Object.assign({}, baseAdapter), { hasRadioAtIndex() {
            // If multi selection is not used, we treat the list as a radio list so that
            // the MDC foundation does not keep track of multiple selected list options.
            // Note that we cannot use MDC's non-radio single selection mode as that one
            // will keep track of the selection state internally and we cannot update a
            // control model, or notify/update list-options on selection change. The radio
            // mode is similar to what we want but with support for change notification
            // (i.e. `setCheckedCheckboxOrRadioAtIndex`) while maintaining single selection.
            return !list.multiple;
        },
        hasCheckboxAtIndex() {
            // If multi selection is used, we treat the list as a checkbox list so that
            // the MDC foundation can keep track of multiple selected list options.
            return list.multiple;
        },
        isCheckboxCheckedAtIndex(index) {
            return list._itemsArr[index].selected;
        },
        setCheckedCheckboxOrRadioAtIndex(index, checked) {
            list._itemsArr[index].selected = checked;
        },
        setAttributeForElementIndex(index, attribute, value) {
            // MDC list by default sets `aria-checked` for multi selection lists. We do not want to
            // use this as that signifies a bad accessibility experience. Instead, we change the
            // attribute update to `aria-selected` as that works best with list-options. See:
            // https://github.com/material-components/material-components-web/issues/6367.
            // TODO: Remove this once material-components-web#6367 is improved/fixed.
            if (attribute === 'aria-checked') {
                attribute = 'aria-selected';
            }
            baseAdapter.setAttributeForElementIndex(index, attribute, value);
        },
        notifyAction(index) {
            list._emitChangeEvent([list._itemsArr[index]]);
        } });
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatListModule {
}
MatListModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatCommonModule,
                    MatLineModule,
                    MatRippleModule,
                    MatPseudoCheckboxModule,
                ],
                exports: [
                    MatList,
                    MatActionList,
                    MatNavList,
                    MatSelectionList,
                    MatListItem,
                    MatListOption,
                    MatListAvatarCssMatStyler,
                    MatListIconCssMatStyler,
                    MatListSubheaderCssMatStyler,
                    MatListGraphicAlignmentStyler,
                    MatDividerModule,
                    MatLineModule,
                ],
                declarations: [
                    MatList,
                    MatActionList,
                    MatNavList,
                    MatSelectionList,
                    MatListItem,
                    MatListOption,
                    MatListAvatarCssMatStyler,
                    MatListIconCssMatStyler,
                    MatListSubheaderCssMatStyler,
                    MatListGraphicAlignmentStyler,
                ]
            },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatActionList, MatList, MatListAvatarCssMatStyler, MatListGraphicAlignmentStyler, MatListIconCssMatStyler, MatListItem, MatListModule, MatListOption, MatListSubheaderCssMatStyler, MatNavList, MatSelectionList, MatSelectionListChange, SELECTION_LIST, LIST_OPTION as ɵangular_material_src_material_experimental_mdc_list_mdc_list_b, MatListItemBase as ɵangular_material_src_material_experimental_mdc_list_mdc_list_c, MatListBase as ɵangular_material_src_material_experimental_mdc_list_mdc_list_d, MatInteractiveListBase as ɵangular_material_src_material_experimental_mdc_list_mdc_list_e };
//# sourceMappingURL=mdc-list.js.map
