(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@material/switch'), require('@angular/forms'), require('@angular/cdk/coercion'), require('@angular/platform-browser/animations'), require('@material/ripple'), require('@angular/cdk/a11y'), require('@angular/common'), require('@angular/material-experimental/mdc-core'), require('@angular/material/slide-toggle')) :
    typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-slide-toggle', ['exports', '@angular/core', '@material/switch', '@angular/forms', '@angular/cdk/coercion', '@angular/platform-browser/animations', '@material/ripple', '@angular/cdk/a11y', '@angular/common', '@angular/material-experimental/mdc-core', '@angular/material/slide-toggle'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcSlideToggle = {}), global.ng.core, global.mdc.switch, global.ng.forms, global.ng.cdk.coercion, global.ng.platformBrowser.animations, global.mdc.ripple, global.ng.cdk.a11y, global.ng.common, global.ng.materialExperimental.mdcCore, global.ng.material.slideToggle));
}(this, (function (exports, core, _switch, forms, coercion, animations, ripple, a11y, common, mdcCore, slideToggle) { 'use strict';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** Injection token to be used to override the default options for `mat-slide-toggle`. */
    var MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = new core.InjectionToken('mat-slide-toggle-default-options', {
        providedIn: 'root',
        factory: function () { return ({ disableToggleValue: false }); }
    });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // Increasing integer for generating unique ids for slide-toggle components.
    var nextUniqueId = 0;
    /** Configuration for the ripple animation. */
    var RIPPLE_ANIMATION_CONFIG = {
        enterDuration: ripple.numbers.DEACTIVATION_TIMEOUT_MS,
        exitDuration: ripple.numbers.FG_DEACTIVATION_MS,
    };
    /** Configuration for ripples when animations are disabled. */
    var NOOP_RIPPLE_ANIMATION_CONFIG = {
        enterDuration: 0,
        exitDuration: 0
    };
    /** @docs-private */
    var MAT_SLIDE_TOGGLE_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MatSlideToggle; }),
        multi: true
    };
    /** Change event object emitted by a MatSlideToggle. */
    var MatSlideToggleChange = /** @class */ (function () {
        function MatSlideToggleChange(
        /** The source MatSlideToggle of the event. */
        source, 
        /** The new `checked` value of the MatSlideToggle. */
        checked) {
            this.source = source;
            this.checked = checked;
        }
        return MatSlideToggleChange;
    }());
    var MatSlideToggle = /** @class */ (function () {
        function MatSlideToggle(_elementRef, _focusMonitor, _changeDetectorRef, tabIndex, defaults, animationMode) {
            var _this = this;
            this._elementRef = _elementRef;
            this._focusMonitor = _focusMonitor;
            this._changeDetectorRef = _changeDetectorRef;
            this.defaults = defaults;
            this._onChange = function (_) { };
            this._onTouched = function () { };
            this._uniqueId = "mat-mdc-slide-toggle-" + ++nextUniqueId;
            this._required = false;
            this._checked = false;
            this._adapter = {
                addClass: function (className) { return _this._switchElement.nativeElement.classList.add(className); },
                removeClass: function (className) { return _this._switchElement.nativeElement.classList.remove(className); },
                setNativeControlChecked: function (checked) { return _this._checked = checked; },
                setNativeControlDisabled: function (disabled) { return _this._disabled = disabled; },
                setNativeControlAttr: function (name, value) {
                    _this._switchElement.nativeElement.setAttribute(name, value);
                }
            };
            /** Unique ID for the label element. */
            this._labelId = "mat-mdc-slide-toggle-label-" + ++nextUniqueId;
            /** Name value will be applied to the button element if present. */
            this.name = null;
            /** A unique id for the slide-toggle button. If none is supplied, it will be auto-generated. */
            this.id = this._uniqueId;
            /** Whether the label should appear after or before the slide-toggle. Defaults to 'after'. */
            this.labelPosition = 'after';
            /** Used to set the aria-label attribute on the underlying button element. */
            this.ariaLabel = null;
            /** Used to set the aria-labelledby attribute on the underlying button element. */
            this.ariaLabelledby = null;
            this._disableRipple = false;
            this._disabled = false;
            /** An event will be dispatched each time the slide-toggle changes its value. */
            this.change = new core.EventEmitter();
            /** Event will be dispatched each time the slide-toggle input is toggled. */
            this.toggleChange = new core.EventEmitter();
            this.tabIndex = parseInt(tabIndex) || 0;
            this.color = defaults.color || 'accent';
            this._noopAnimations = animationMode === 'NoopAnimations';
            this._rippleAnimation = this._noopAnimations ?
                NOOP_RIPPLE_ANIMATION_CONFIG : RIPPLE_ANIMATION_CONFIG;
        }
        Object.defineProperty(MatSlideToggle.prototype, "tabIndex", {
            /** Tabindex for the input element. */
            get: function () { return this._tabIndex; },
            set: function (value) {
                this._tabIndex = coercion.coerceNumberProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlideToggle.prototype, "required", {
            /** Whether the slide-toggle is required. */
            get: function () { return this._required; },
            set: function (value) { this._required = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlideToggle.prototype, "checked", {
            /** Whether the slide-toggle element is checked or not. */
            get: function () { return this._checked; },
            set: function (value) {
                this._checked = coercion.coerceBooleanProperty(value);
                if (this._foundation) {
                    this._foundation.setChecked(this._checked);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlideToggle.prototype, "disableRipple", {
            /** Whether to disable the ripple on this checkbox. */
            get: function () {
                return this._disableRipple;
            },
            set: function (disableRipple) {
                this._disableRipple = coercion.coerceBooleanProperty(disableRipple);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlideToggle.prototype, "disabled", {
            /** Whether the slide toggle is disabled. */
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                this._disabled = coercion.coerceBooleanProperty(disabled);
                if (this._foundation) {
                    this._foundation.setDisabled(this._disabled);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MatSlideToggle.prototype, "buttonId", {
            /** Returns the unique id for the visual hidden button. */
            get: function () { return (this.id || this._uniqueId) + "-button"; },
            enumerable: false,
            configurable: true
        });
        MatSlideToggle.prototype.ngAfterViewInit = function () {
            var _this = this;
            var foundation = this._foundation = new _switch.deprecated.MDCSwitchFoundation(this._adapter);
            foundation.setDisabled(this.disabled);
            foundation.setChecked(this.checked);
            this._focusMonitor
                .monitor(this._elementRef, true)
                .subscribe(function (focusOrigin) {
                // Only forward focus manually when it was received programmatically or through the
                // keyboard. We should not do this for mouse/touch focus for two reasons:
                // 1. It can prevent clicks from landing in Chrome (see #18269).
                // 2. They're already handled by the wrapping `label` element.
                if (focusOrigin === 'keyboard' || focusOrigin === 'program') {
                    _this._switchElement.nativeElement.focus();
                    _this._focused = true;
                }
                else if (!focusOrigin) {
                    // When a focused element becomes disabled, the browser *immediately* fires a blur event.
                    // Angular does not expect events to be raised during change detection, so any state
                    // change (such as a form control's ng-touched) will cause a changed-after-checked error.
                    // See https://github.com/angular/angular/issues/17793. To work around this, we defer
                    // telling the form control it has been touched until the next tick.
                    Promise.resolve().then(function () {
                        _this._focused = false;
                        _this._onTouched();
                        _this._changeDetectorRef.markForCheck();
                    });
                }
            });
        };
        MatSlideToggle.prototype.ngOnDestroy = function () {
            var _a;
            this._focusMonitor.stopMonitoring(this._elementRef);
            (_a = this._foundation) === null || _a === void 0 ? void 0 : _a.destroy();
        };
        /** Method being called whenever the underlying button is clicked. */
        MatSlideToggle.prototype._handleClick = function (event) {
            this.toggleChange.emit();
            this._foundation.handleChange(event);
            if (!this.defaults.disableToggleValue) {
                this.checked = !this.checked;
                this._onChange(this.checked);
                this.change.emit(new MatSlideToggleChange(this, this.checked));
            }
        };
        /** Implemented as part of ControlValueAccessor. */
        MatSlideToggle.prototype.writeValue = function (value) {
            this.checked = !!value;
            this._changeDetectorRef.markForCheck();
        };
        /** Implemented as part of ControlValueAccessor. */
        MatSlideToggle.prototype.registerOnChange = function (fn) {
            this._onChange = fn;
        };
        /** Implemented as part of ControlValueAccessor. */
        MatSlideToggle.prototype.registerOnTouched = function (fn) {
            this._onTouched = fn;
        };
        /** Implemented as a part of ControlValueAccessor. */
        MatSlideToggle.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
            this._changeDetectorRef.markForCheck();
        };
        /** Focuses the slide-toggle. */
        MatSlideToggle.prototype.focus = function () {
            this._switchElement.nativeElement.focus();
        };
        /** Toggles the checked state of the slide-toggle. */
        MatSlideToggle.prototype.toggle = function () {
            this.checked = !this.checked;
            this._onChange(this.checked);
        };
        MatSlideToggle.prototype._getAriaLabelledBy = function () {
            if (this.ariaLabelledby) {
                return this.ariaLabelledby;
            }
            // Even though we have a `label` element with a `for` pointing to the button, we need the
            // `aria-labelledby`, because the button gets flagged as not having a label by tools like axe.
            return this.ariaLabel ? null : this._labelId;
        };
        return MatSlideToggle;
    }());
    MatSlideToggle.decorators = [
        { type: core.Component, args: [{
                    selector: 'mat-slide-toggle',
                    template: "<div class=\"mdc-form-field\"\n     [class.mdc-form-field--align-end]=\"labelPosition == 'before'\">\n  <button\n    class=\"mdc-switch\"\n    role=\"switch\"\n    type=\"button\"\n    [class.mdc-switch--selected]=\"checked\"\n    [class.mdc-switch--unselected]=\"!checked\"\n    [tabIndex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    [attr.id]=\"buttonId\"\n    [attr.name]=\"name\"\n    [attr.aria-label]=\"ariaLabel\"\n    [attr.aria-labelledby]=\"_getAriaLabelledBy()\"\n    [attr.aria-describedby]=\"ariaDescribedby\"\n    [attr.aria-required]=\"required\"\n    (click)=\"_handleClick($event)\"\n    #switch>\n    <div class=\"mdc-switch__track\"></div>\n    <div class=\"mdc-switch__handle-track\">\n      <div class=\"mdc-switch__handle\">\n        <div class=\"mdc-switch__shadow\">\n          <div class=\"mdc-elevation-overlay\"></div>\n        </div>\n        <div class=\"mdc-switch__ripple\">\n          <div class=\"mat-mdc-slide-toggle-ripple mat-mdc-focus-indicator\" mat-ripple\n            [matRippleTrigger]=\"switch\"\n            [matRippleDisabled]=\"disableRipple || disabled\"\n            [matRippleCentered]=\"true\"\n            [matRippleAnimation]=\"_rippleAnimation\"></div>\n        </div>\n        <div class=\"mdc-switch__icons\">\n          <svg class=\"mdc-switch__icon mdc-switch__icon--on\" viewBox=\"0 0 24 24\">\n            <path d=\"M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z\" />\n          </svg>\n          <svg class=\"mdc-switch__icon mdc-switch__icon--off\" viewBox=\"0 0 24 24\">\n            <path d=\"M20 13H4v-2h16v2z\" />\n          </svg>\n        </div>\n      </div>\n    </div>\n  </button>\n\n  <!--\n    Clicking on the label will trigger another click event from the button.\n    Stop propagation here so other listeners further up in the DOM don't execute twice.\n  -->\n  <label [for]=\"buttonId\" [attr.id]=\"_labelId\" (click)=\"$event.stopPropagation()\">\n    <ng-content></ng-content>\n  </label>\n</div>\n",
                    host: {
                        'class': 'mat-mdc-slide-toggle',
                        '[id]': 'id',
                        // Needs to be `-1` so it can still receive programmatic focus.
                        '[attr.tabindex]': 'disabled ? null : -1',
                        '[attr.aria-label]': 'null',
                        '[attr.aria-labelledby]': 'null',
                        '[class.mat-primary]': 'color === "primary"',
                        '[class.mat-accent]': 'color !== "primary" && color !== "warn"',
                        '[class.mat-warn]': 'color === "warn"',
                        '[class.mat-mdc-slide-toggle-focused]': '_focused',
                        '[class.mat-mdc-slide-toggle-checked]': 'checked',
                        '[class._mat-animation-noopable]': '_noopAnimations',
                    },
                    exportAs: 'matSlideToggle',
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [MAT_SLIDE_TOGGLE_VALUE_ACCESSOR],
                    styles: [".mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-switch{align-items:center;background:none;border:none;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative}.mdc-switch__track{overflow:hidden;position:relative;width:100%}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid transparent;border-radius:inherit;box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;width:100%}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(-100%)}[dir=rtl] .mdc-switch__track::after,.mdc-switch__track[dir=rtl]::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track[dir=rtl]::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::after{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0)}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0)}[dir=rtl] .mdc-switch__handle-track,.mdc-switch__handle-track[dir=rtl]{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track,.mdc-switch--selected .mdc-switch__handle-track[dir=rtl]{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto}[dir=rtl] .mdc-switch__handle,.mdc-switch__handle[dir=rtl]{left:auto;right:0}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid transparent;border-radius:inherit;box-sizing:border-box;content:\"\";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-elevation-overlay{bottom:0;left:0;right:0;top:0}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1}.mdc-switch:disabled .mdc-switch__ripple{display:none}.mdc-switch__icons{height:100%;position:relative;width:100%;z-index:1}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{display:inline-block;outline:0}.mat-mdc-slide-toggle .mdc-switch{width:36px;width:var(--mdc-switch-track-width, 36px)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after{background:#6200ee;background:var(--mdc-switch-selected-handle-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:#310077;background:var(--mdc-switch-selected-hover-handle-color, #310077)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:#310077;background:var(--mdc-switch-selected-focus-handle-color, #310077)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:#310077;background:var(--mdc-switch-selected-pressed-handle-color, #310077)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after{background:#424242;background:var(--mdc-switch-disabled-selected-handle-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:#616161;background:var(--mdc-switch-unselected-handle-color, #616161)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:#212121;background:var(--mdc-switch-unselected-hover-handle-color, #212121)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:#212121;background:var(--mdc-switch-unselected-focus-handle-color, #212121)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:#212121;background:var(--mdc-switch-unselected-pressed-handle-color, #212121)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after{background:#424242;background:var(--mdc-switch-disabled-unselected-handle-color, #424242)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle::before{background:#fff;background:var(--mdc-switch-handle-surface-color, var(--mdc-theme-surface, #fff))}.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__shadow{box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-switch-handle-elevation, var(--mdc-elevation-box-shadow-for-gss));--mdc-elevation-box-shadow-for-gss:0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__shadow{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-switch-disabled-handle-elevation, var(--mdc-elevation-box-shadow-for-gss));--mdc-elevation-box-shadow-for-gss:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle{height:20px;height:var(--mdc-switch-handle-height, 20px)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__handle::after{opacity:0.38;opacity:var(--mdc-switch-disabled-handle-opacity, 0.38)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle{border-radius:10px;border-radius:var(--mdc-switch-handle-shape, 10px)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle{width:20px;width:var(--mdc-switch-handle-width, 20px)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__handle-track{width:calc(100% - 20px);width:calc(100% - var(--mdc-switch-handle-width, 20px))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:#fff;fill:var(--mdc-switch-selected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:#fff;fill:var(--mdc-switch-disabled-selected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:#fff;fill:var(--mdc-switch-unselected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:#fff;fill:var(--mdc-switch-disabled-unselected-icon-color, var(--mdc-theme-on-primary, #fff))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:0.38;opacity:var(--mdc-switch-disabled-selected-icon-opacity, 0.38)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:0.38;opacity:var(--mdc-switch-disabled-unselected-icon-opacity, 0.38)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected .mdc-switch__icon{width:18px;width:var(--mdc-switch-selected-icon-size, 18px);height:18px;height:var(--mdc-switch-selected-icon-size, 18px)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected .mdc-switch__icon{width:18px;width:var(--mdc-switch-unselected-icon-size, 18px);height:18px;height:var(--mdc-switch-unselected-icon-size, 18px)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:#6200ee;background-color:var(--mdc-switch-selected-hover-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background-color:#6200ee;background-color:var(--mdc-switch-selected-focus-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background-color:#6200ee;background-color:var(--mdc-switch-selected-pressed-state-layer-color, var(--mdc-theme-primary, #6200ee))}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background-color:#424242;background-color:var(--mdc-switch-unselected-hover-state-layer-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background-color:#424242;background-color:var(--mdc-switch-unselected-focus-state-layer-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background-color:#424242;background-color:var(--mdc-switch-unselected-pressed-state-layer-color, #424242)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:0.04;opacity:var(--mdc-switch-selected-hover-state-layer-opacity, 0.04)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-switch-selected-focus-state-layer-opacity, 0.12)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:0.1;opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--selected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before{opacity:0.04;opacity:var(--mdc-switch-unselected-hover-state-layer-opacity, 0.04)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-switch-unselected-focus-state-layer-opacity, 0.12)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:0.1;opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch.mdc-switch--unselected:enabled:active.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, 0.1)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__ripple{height:48px;height:var(--mdc-switch-state-layer-size, 48px);width:48px;width:var(--mdc-switch-state-layer-size, 48px)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__track{height:14px;height:var(--mdc-switch-track-height, 14px)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__track{opacity:0.12;opacity:var(--mdc-switch-disabled-track-opacity, 0.12)}.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__track::after{background:#d7bbff;background:var(--mdc-switch-selected-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:#d7bbff;background:var(--mdc-switch-selected-hover-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:#d7bbff;background:var(--mdc-switch-selected-focus-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:enabled:active .mdc-switch__track::after{background:#d7bbff;background:var(--mdc-switch-selected-pressed-track-color, #d7bbff)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__track::after{background:#424242;background:var(--mdc-switch-disabled-selected-track-color, #424242)}.mat-mdc-slide-toggle .mdc-switch:enabled .mdc-switch__track::before{background:#e0e0e0;background:var(--mdc-switch-unselected-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:#e0e0e0;background:var(--mdc-switch-unselected-hover-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:#e0e0e0;background:var(--mdc-switch-unselected-focus-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:enabled:active .mdc-switch__track::before{background:#e0e0e0;background:var(--mdc-switch-unselected-pressed-track-color, #e0e0e0)}.mat-mdc-slide-toggle .mdc-switch:disabled .mdc-switch__track::before{background:#424242;background:var(--mdc-switch-disabled-unselected-track-color, #424242)}.mat-mdc-slide-toggle .mdc-switch .mdc-switch__track{border-radius:7px;border-radius:var(--mdc-switch-track-shape, 7px)}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle .mdc-switch__ripple::after{content:\"\";opacity:0}.mat-mdc-slide-toggle .mdc-switch:hover .mdc-switch__ripple::after{opacity:.04;transition:mdc-switch-transition-enter(opacity, 0, 75ms)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__ripple::after{opacity:.12}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.cdk-high-contrast-active .mat-mdc-slide-toggle-focused .mdc-switch__track{outline:solid 2px;outline-offset:7px}\n"]
                },] }
    ];
    MatSlideToggle.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: a11y.FocusMonitor },
        { type: core.ChangeDetectorRef },
        { type: String, decorators: [{ type: core.Attribute, args: ['tabindex',] }] },
        { type: undefined, decorators: [{ type: core.Inject, args: [MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,] }] },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatSlideToggle.propDecorators = {
        color: [{ type: core.Input }],
        name: [{ type: core.Input }],
        id: [{ type: core.Input }],
        tabIndex: [{ type: core.Input }],
        labelPosition: [{ type: core.Input }],
        ariaLabel: [{ type: core.Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: core.Input, args: ['aria-labelledby',] }],
        ariaDescribedby: [{ type: core.Input, args: ['aria-describedby',] }],
        required: [{ type: core.Input }],
        checked: [{ type: core.Input }],
        disableRipple: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        change: [{ type: core.Output }],
        toggleChange: [{ type: core.Output }],
        _switchElement: [{ type: core.ViewChild, args: ['switch',] }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MatSlideToggleModule = /** @class */ (function () {
        function MatSlideToggleModule() {
        }
        return MatSlideToggleModule;
    }());
    MatSlideToggleModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        slideToggle._MatSlideToggleRequiredValidatorModule,
                        mdcCore.MatCommonModule,
                        mdcCore.MatRippleModule,
                        common.CommonModule
                    ],
                    exports: [
                        slideToggle._MatSlideToggleRequiredValidatorModule,
                        MatSlideToggle,
                        mdcCore.MatCommonModule
                    ],
                    declarations: [MatSlideToggle],
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

    Object.defineProperty(exports, 'MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR', {
        enumerable: true,
        get: function () {
            return slideToggle.MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR;
        }
    });
    Object.defineProperty(exports, 'MatSlideToggleRequiredValidator', {
        enumerable: true,
        get: function () {
            return slideToggle.MatSlideToggleRequiredValidator;
        }
    });
    exports.MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS;
    exports.MAT_SLIDE_TOGGLE_VALUE_ACCESSOR = MAT_SLIDE_TOGGLE_VALUE_ACCESSOR;
    exports.MatSlideToggle = MatSlideToggle;
    exports.MatSlideToggleChange = MatSlideToggleChange;
    exports.MatSlideToggleModule = MatSlideToggleModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-slide-toggle.umd.js.map
