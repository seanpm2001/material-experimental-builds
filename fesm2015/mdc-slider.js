import { __decorate, __metadata, __param } from 'tslib';
import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { normalizePassiveListenerOptions, Platform } from '@angular/cdk/platform';
import { forwardRef, EventEmitter, Output, Input, ViewChild, ElementRef, Component, ViewEncapsulation, ChangeDetectionStrategy, Optional, Attribute, Inject, ChangeDetectorRef, NgZone, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCSliderFoundation } from '@material/slider';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Visually, a 30px separation between tick marks looks best. This is very subjective but it is
 * the default separation we chose.
 */
const MIN_AUTO_TICK_SEPARATION = 30;
/**
 * Size of a tick marker for a slider. The size of a tick is based on the Material
 * Design guidelines and the MDC slider implementation.
 * TODO(devversion): ideally MDC would expose the tick marker size as constant
 */
const TICK_MARKER_SIZE = 2;
/** Event options used to bind passive listeners. */
const passiveListenerOptions = normalizePassiveListenerOptions({ passive: true });
/** Event options used to bind active listeners. */
const activeListenerOptions = normalizePassiveListenerOptions({ passive: false });
/**
 * Provider Expression that allows mat-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 * @docs-private
 */
const MAT_SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatSlider),
    multi: true
};
/** A simple change event emitted by the MatSlider component. */
class MatSliderChange {
}
let MatSlider = /** @class */ (() => {
    let MatSlider = class MatSlider {
        constructor(_elementRef, _changeDetectorRef, _ngZone, _platform, _dir, tabIndex, _animationMode) {
            this._elementRef = _elementRef;
            this._changeDetectorRef = _changeDetectorRef;
            this._ngZone = _ngZone;
            this._platform = _platform;
            this._dir = _dir;
            this._animationMode = _animationMode;
            /** Event emitted when the slider value has changed. */
            this.change = new EventEmitter();
            /** Event emitted when the slider thumb moves. */
            this.input = new EventEmitter();
            /**
             * Emits when the raw value of the slider changes. This is here primarily
             * to facilitate the two-way binding for the `value` input.
             * @docs-private
             */
            this.valueChange = new EventEmitter();
            /** Tabindex for the slider. */
            this.tabIndex = 0;
            /** The color palette for this slider. */
            this.color = 'accent';
            this._min = 0;
            this._max = 100;
            this._value = null;
            this._step = 1;
            this._tickInterval = 0;
            this._thumbLabel = false;
            this._disabled = false;
            /** Adapter for the MDC slider foundation. */
            this._sliderAdapter = {
                hasClass: (className) => this._elementRef.nativeElement.classList.contains(className),
                addClass: (className) => this._elementRef.nativeElement.classList.add(className),
                removeClass: (className) => this._elementRef.nativeElement.classList.remove(className),
                getAttribute: (name) => this._elementRef.nativeElement.getAttribute(name),
                setAttribute: (name, value) => this._elementRef.nativeElement.setAttribute(name, value),
                removeAttribute: (name) => this._elementRef.nativeElement.removeAttribute(name),
                computeBoundingRect: () => this._elementRef.nativeElement.getBoundingClientRect(),
                getTabIndex: () => this._elementRef.nativeElement.tabIndex,
                registerInteractionHandler: (evtType, handler) => 
                // Interaction event handlers (which handle keyboard interaction) cannot be passive
                // as they will prevent the default behavior. Additionally we can't run these event
                // handlers outside of the Angular zone because we rely on the events to cause the
                // component tree to be re-checked.
                // TODO: take in the event listener options from the adapter once MDC supports it.
                this._elementRef.nativeElement.addEventListener(evtType, handler, activeListenerOptions),
                deregisterInteractionHandler: (evtType, handler) => this._elementRef.nativeElement.removeEventListener(evtType, handler),
                registerThumbContainerInteractionHandler: (evtType, handler) => {
                    // The thumb container interaction handlers are currently just used for transition
                    // events which don't need to run in the Angular zone.
                    this._ngZone.runOutsideAngular(() => {
                        this._thumbContainer.nativeElement
                            .addEventListener(evtType, handler, passiveListenerOptions);
                    });
                },
                deregisterThumbContainerInteractionHandler: (evtType, handler) => {
                    this._thumbContainer.nativeElement
                        .removeEventListener(evtType, handler, passiveListenerOptions);
                },
                registerBodyInteractionHandler: (evtType, handler) => 
                // Body event handlers (which handle thumb sliding) cannot be passive as they will
                // prevent the default behavior. Additionally we can't run these event handlers
                // outside of the Angular zone because we rely on the events to cause the component
                // tree to be re-checked.
                document.body.addEventListener(evtType, handler),
                deregisterBodyInteractionHandler: (evtType, handler) => document.body.removeEventListener(evtType, handler),
                registerResizeHandler: (handler) => {
                    // The resize handler is currently responsible for detecting slider dimension
                    // changes and therefore doesn't cause a value change that needs to be propagated.
                    this._ngZone.runOutsideAngular(() => window.addEventListener('resize', handler));
                },
                deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
                notifyInput: () => {
                    const newValue = this._foundation.getValue();
                    // MDC currently fires the input event multiple times.
                    // TODO(devversion): remove this check once the input notifications are fixed.
                    if (newValue !== this.value) {
                        this.value = newValue;
                        this.input.emit(this._createChangeEvent(newValue));
                    }
                },
                notifyChange: () => {
                    // TODO(devversion): bug in MDC where only the "change" event is emitted if a keypress
                    // updated the value. Material and native range sliders also emit an input event.
                    // Usually we sync the "value" in the "input" event, but as a workaround we now sync
                    // the value in the "change" event.
                    this.value = this._foundation.getValue();
                    this._emitChangeEvent(this.value);
                },
                setThumbContainerStyleProperty: (propertyName, value) => {
                    this._thumbContainer.nativeElement.style.setProperty(propertyName, value);
                },
                setTrackStyleProperty: (propertyName, value) => {
                    this._track.nativeElement.style.setProperty(propertyName, value);
                },
                setMarkerValue: () => {
                    // Mark the component for check as the thumb label needs to be re-rendered.
                    this._changeDetectorRef.markForCheck();
                },
                setTrackMarkers: (step, max, min) => {
                    this._trackMarker.nativeElement.style.setProperty('background', this._getTrackMarkersBackground(min, max, step));
                },
                isRTL: () => this._isRtl(),
            };
            /** Instance of the MDC slider foundation for this slider. */
            this._foundation = new MDCSliderFoundation(this._sliderAdapter);
            /** Whether the MDC foundation has been initialized. */
            this._isInitialized = false;
            /** Function that notifies the control value accessor about a value change. */
            this._controlValueAccessorChangeFn = () => { };
            /** Subscription to the Directionality change EventEmitter. */
            this._dirChangeSubscription = Subscription.EMPTY;
            /** Function that marks the slider as touched. Registered via "registerOnTouch". */
            this._markAsTouched = () => { };
            this.tabIndex = parseInt(tabIndex) || 0;
            if (this._dir) {
                this._dirChangeSubscription = this._dir.change.subscribe(() => {
                    // In case the directionality changes, we need to refresh the rendered MDC slider.
                    // Note that we need to wait until the page actually updated as otherwise the
                    // client rectangle wouldn't reflect the new directionality.
                    // TODO(devversion): ideally the MDC slider would just compute dimensions similarly
                    // to the standard Material slider on "mouseenter".
                    this._ngZone.runOutsideAngular(() => setTimeout(() => this._foundation.layout()));
                });
            }
        }
        /** The minimum value that the slider can have. */
        get min() {
            return this._min;
        }
        set min(value) {
            this._min = coerceNumberProperty(value);
        }
        /** The maximum value that the slider can have. */
        get max() {
            return this._max;
        }
        set max(value) {
            this._max = coerceNumberProperty(value);
        }
        /** Value of the slider. */
        get value() {
            // If the value needs to be read and it is still uninitialized, initialize
            // it to the current minimum value.
            if (this._value === null) {
                this.value = this.min;
            }
            return this._value;
        }
        set value(value) {
            this._value = coerceNumberProperty(value);
        }
        /** The values at which the thumb will snap. */
        get step() {
            return this._step;
        }
        set step(v) {
            this._step = coerceNumberProperty(v, this._step);
        }
        /**
         * How often to show ticks. Relative to the step so that a tick always appears on a step.
         * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
         */
        get tickInterval() {
            return this._tickInterval;
        }
        set tickInterval(value) {
            if (value === 'auto') {
                this._tickInterval = 'auto';
            }
            else if (typeof value === 'number' || typeof value === 'string') {
                this._tickInterval = coerceNumberProperty(value, this._tickInterval);
            }
            else {
                this._tickInterval = 0;
            }
        }
        /** Whether or not to show the thumb label. */
        get thumbLabel() {
            return this._thumbLabel;
        }
        set thumbLabel(value) {
            this._thumbLabel = coerceBooleanProperty(value);
        }
        /** Whether the slider is disabled. */
        get disabled() {
            return this._disabled;
        }
        set disabled(disabled) {
            this._disabled = coerceBooleanProperty(disabled);
        }
        ngAfterViewInit() {
            this._isInitialized = true;
            if (this._platform.isBrowser) {
                // The MDC slider foundation accesses DOM globals, so we cannot initialize the
                // foundation on the server. The foundation would be needed to move the thumb
                // to the proper position and to render the ticks.
                this._foundation.init();
                // The standard Angular Material slider is always using discrete values. We always
                // want to enable discrete values and support ticks, but want to still provide
                // non-discrete slider visual looks if thumb label is disabled.
                // TODO(devversion): check if we can get a public API for this.
                // Tracked with: https://github.com/material-components/material-components-web/issues/5020
                this._foundation.isDiscrete_ = true;
                // These bindings cannot be synced in the foundation, as the foundation is not
                // initialized and they cause DOM globals to be accessed (to move the thumb)
                this._syncStep();
                this._syncMax();
                this._syncMin();
                // Note that "value" needs to be synced after "max" and "min" because otherwise
                // the value will be clamped by the MDC foundation implementation.
                this._syncValue();
            }
            this._syncDisabled();
        }
        ngOnChanges(changes) {
            if (!this._isInitialized) {
                return;
            }
            if (changes['step']) {
                this._syncStep();
            }
            if (changes['max']) {
                this._syncMax();
            }
            if (changes['min']) {
                this._syncMin();
            }
            if (changes['disabled']) {
                this._syncDisabled();
            }
            if (changes['value']) {
                this._syncValue();
            }
            if (changes['tickInterval']) {
                this._refreshTrackMarkers();
            }
        }
        ngOnDestroy() {
            this._dirChangeSubscription.unsubscribe();
            // The foundation cannot be destroyed on the server, as the foundation
            // has not be initialized on the server.
            if (this._platform.isBrowser) {
                this._foundation.destroy();
            }
        }
        /** Focuses the slider. */
        focus(options) {
            this._elementRef.nativeElement.focus(options);
        }
        /** Blurs the slider. */
        blur() {
            this._elementRef.nativeElement.blur();
        }
        /** Gets the display text of the current value. */
        get displayValue() {
            if (this.displayWith) {
                return this.displayWith(this.value).toString();
            }
            return this.value.toString() || '0';
        }
        /** Creates a slider change object from the specified value. */
        _createChangeEvent(newValue) {
            const event = new MatSliderChange();
            event.source = this;
            event.value = newValue;
            return event;
        }
        /** Emits a change event and notifies the control value accessor. */
        _emitChangeEvent(newValue) {
            this._controlValueAccessorChangeFn(newValue);
            this.valueChange.emit(newValue);
            this.change.emit(this._createChangeEvent(newValue));
        }
        /** Computes the CSS background value for the track markers (aka ticks). */
        _getTrackMarkersBackground(min, max, step) {
            if (!this.tickInterval) {
                return '';
            }
            const markerWidth = `${TICK_MARKER_SIZE}px`;
            const markerBackground = `linear-gradient(to right, currentColor ${markerWidth}, transparent 0)`;
            if (this.tickInterval === 'auto') {
                const trackSize = this._elementRef.nativeElement.getBoundingClientRect().width;
                const pixelsPerStep = trackSize * step / (max - min);
                const stepsPerTick = Math.ceil(MIN_AUTO_TICK_SEPARATION / pixelsPerStep);
                const pixelsPerTick = stepsPerTick * step;
                return `${markerBackground} 0 center / ${pixelsPerTick}px 100% repeat-x`;
            }
            // keep calculation in css for better rounding/subpixel behavior
            const markerAmount = `(((${max} - ${min}) / ${step}) / ${this.tickInterval})`;
            const markerBkgdLayout = `0 center / calc((100% - ${markerWidth}) / ${markerAmount}) 100% repeat-x`;
            return `${markerBackground} ${markerBkgdLayout}`;
        }
        /** Method that ensures that track markers are refreshed. */
        _refreshTrackMarkers() {
            // MDC only checks whether the slider has markers once on init by looking for the
            // `mdc-slider--display-markers` class in the DOM, whereas we support changing and hiding
            // the markers dynamically. This is a workaround until we can get a public API for it. See:
            // https://github.com/material-components/material-components-web/issues/5020
            this._foundation.hasTrackMarker_ = this.tickInterval !== 0;
            this._foundation.setupTrackMarker();
        }
        /** Syncs the "step" input value with the MDC foundation. */
        _syncStep() {
            this._foundation.setStep(this.step);
        }
        /** Syncs the "max" input value with the MDC foundation. */
        _syncMax() {
            this._foundation.setMax(this.max);
        }
        /** Syncs the "min" input value with the MDC foundation. */
        _syncMin() {
            this._foundation.setMin(this.min);
        }
        /** Syncs the "value" input binding with the MDC foundation. */
        _syncValue() {
            this._foundation.setValue(this.value);
        }
        /** Syncs the "disabled" input value with the MDC foundation. */
        _syncDisabled() {
            this._foundation.setDisabled(this.disabled);
        }
        /** Whether the slider is displayed in RTL-mode. */
        _isRtl() {
            return this._dir && this._dir.value === 'rtl';
        }
        /**
         * Registers a callback to be triggered when the value has changed.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
        registerOnChange(fn) {
            this._controlValueAccessorChangeFn = fn;
        }
        /**
         * Registers a callback to be triggered when the component is touched.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
        registerOnTouched(fn) {
            this._markAsTouched = fn;
        }
        /**
         * Sets whether the component should be disabled.
         * Implemented as part of ControlValueAccessor.
         * @param isDisabled
         */
        setDisabledState(isDisabled) {
            this.disabled = isDisabled;
            this._syncDisabled();
        }
        /**
         * Sets the model value.
         * Implemented as part of ControlValueAccessor.
         * @param value
         */
        writeValue(value) {
            this.value = value;
            this._syncValue();
        }
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MatSlider.prototype, "change", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MatSlider.prototype, "input", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MatSlider.prototype, "valueChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MatSlider.prototype, "tabIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MatSlider.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], MatSlider.prototype, "displayWith", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], MatSlider.prototype, "min", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], MatSlider.prototype, "max", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MatSlider.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], MatSlider.prototype, "step", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MatSlider.prototype, "tickInterval", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MatSlider.prototype, "thumbLabel", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Object])
    ], MatSlider.prototype, "disabled", null);
    __decorate([
        ViewChild('thumbContainer'),
        __metadata("design:type", ElementRef)
    ], MatSlider.prototype, "_thumbContainer", void 0);
    __decorate([
        ViewChild('track'),
        __metadata("design:type", ElementRef)
    ], MatSlider.prototype, "_track", void 0);
    __decorate([
        ViewChild('pinValueMarker'),
        __metadata("design:type", ElementRef)
    ], MatSlider.prototype, "_pinValueMarker", void 0);
    __decorate([
        ViewChild('trackMarker'),
        __metadata("design:type", ElementRef)
    ], MatSlider.prototype, "_trackMarker", void 0);
    MatSlider = __decorate([
        Component({
            selector: 'mat-slider',
            template: "<div class=\"mdc-slider__track-container\">\n  <div class=\"mdc-slider__track\" #track></div>\n  <div class=\"mdc-slider__track-marker-container\" #trackMarker></div>\n</div>\n<div class=\"mdc-slider__thumb-container\" #thumbContainer>\n  <div *ngIf=\"thumbLabel\" class=\"mdc-slider__pin\">\n    <span class=\"mdc-slider__pin-value-marker\">{{displayValue}}</span>\n  </div>\n  <svg class=\"mdc-slider__thumb\" focusable=\"false\" width=\"21\" height=\"21\">\n    <circle cx=\"10.5\" cy=\"10.5\" r=\"7.875\"></circle>\n  </svg>\n  <div class=\"mdc-slider__focus-ring\"></div>\n</div>\n",
            host: {
                'class': 'mat-mdc-slider mdc-slider mat-mdc-focus-indicator',
                'role': 'slider',
                'aria-orientation': 'horizontal',
                // The tabindex if the slider turns disabled is managed by the MDC foundation which
                // dynamically updates and restores the "tabindex" attribute.
                '[attr.tabindex]': 'tabIndex || 0',
                '[class.mdc-slider--discrete]': 'thumbLabel',
                '[class.mat-slider-has-ticks]': 'tickInterval !== 0',
                '[class.mdc-slider--display-markers]': 'tickInterval !== 0',
                '[class.mat-slider-thumb-label-showing]': 'thumbLabel',
                // Class binding which is only used by the test harness as there is no other
                // way for the harness to detect if mouse coordinates need to be inverted.
                '[class.mat-slider-invert-mouse-coords]': '_isRtl()',
                '[class.mat-slider-disabled]': 'disabled',
                '[class.mat-primary]': 'color == "primary"',
                '[class.mat-accent]': 'color == "accent"',
                '[class.mat-warn]': 'color == "warn"',
                '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                '(blur)': '_markAsTouched()',
            },
            exportAs: 'matSlider',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [MAT_SLIDER_VALUE_ACCESSOR],
            styles: [".mdc-slider{position:relative;width:100%;height:48px;cursor:pointer;touch-action:pan-x;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-slider--disable-touch-action{touch-action:none}.mdc-slider--disabled{cursor:auto}.mdc-slider:focus{outline:none}.mdc-slider__track-container{position:absolute;top:50%;width:100%;height:2px;overflow:hidden}.mdc-slider__track-container::after{position:absolute;top:0;left:0;display:block;width:100%;height:100%;content:\"\"}.mdc-slider__track{position:absolute;width:100%;height:100%;transform-origin:left top}.mdc-slider[dir=rtl] .mdc-slider__track,[dir=rtl] .mdc-slider .mdc-slider__track{transform-origin:right top}.mdc-slider__track-marker-container{display:flex;margin-right:0;margin-left:-1px;visibility:hidden}.mdc-slider[dir=rtl] .mdc-slider__track-marker-container,[dir=rtl] .mdc-slider .mdc-slider__track-marker-container{margin-right:-1px;margin-left:0}.mdc-slider__track-marker-container::after{display:block;width:2px;height:2px;content:\"\"}.mdc-slider__track-marker{flex:1}.mdc-slider__track-marker::after{display:block;width:2px;height:2px;content:\"\"}.mdc-slider__track-marker:first-child::after{width:3px}.mdc-slider__thumb-container{position:absolute;top:15px;left:0;width:21px;height:100%;user-select:none}.mdc-slider__thumb{position:absolute;top:0;left:0;transform:scale(0.571);stroke-width:3.5}.mdc-slider__focus-ring{width:21px;height:21px;border-radius:50%;opacity:0}.mdc-slider__pin{display:flex;position:absolute;top:0;left:0;align-items:center;justify-content:center;width:26px;height:26px;margin-top:-2px;margin-left:-2px;transform:rotate(-45deg) scale(0) translate(0, 0);border-radius:50% 50% 50% 0%;z-index:1}.mdc-slider__pin-value-marker{transform:rotate(45deg)}.mdc-slider--active .mdc-slider__thumb{transform:scale3d(1, 1, 1)}.mdc-slider--focus .mdc-slider__focus-ring{transform:scale3d(1.55, 1.55, 1.55);opacity:.25}.mdc-slider--discrete.mdc-slider--active .mdc-slider__thumb{transform:scale(calc(12 / 21))}.mdc-slider--discrete.mdc-slider--active .mdc-slider__pin{transform:rotate(-45deg) scale(1) translate(19px, -20px)}.mdc-slider--discrete.mdc-slider--display-markers .mdc-slider__track-marker-container{visibility:visible}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px}.cdk-high-contrast-active .mat-mdc-slider .mdc-slider__track-container{height:0;outline:solid 2px;margin-top:1px}.cdk-high-contrast-active .mat-mdc-slider .mdc-slider__pin-value-marker{outline:solid 1px}@keyframes mdc-slider-emphasize{0%{animation-timing-function:ease-out}50%{animation-timing-function:ease-in;transform:scale(0.85)}100%{transform:scale(0.571)}}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider__track{will-change:transform}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider__thumb-container{will-change:transform}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider__thumb{transition:transform 100ms ease-out,fill 100ms ease-out,stroke 100ms ease-out}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider__focus-ring{transition:transform 266.67ms ease-out,opacity 266.67ms ease-out,background-color 266.67ms ease-out}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider__pin{transition:transform 100ms ease-out}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider--focus .mdc-slider__thumb{animation:mdc-slider-emphasize 266.67ms linear}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider--in-transit .mdc-slider__thumb{transition-delay:140ms}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider--in-transit .mdc-slider__thumb-container,.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider--in-transit .mdc-slider__track,.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider:focus:not(.mdc-slider--active) .mdc-slider__thumb-container,.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider:focus:not(.mdc-slider--active) .mdc-slider__track{transition:transform 80ms ease}.mat-mdc-slider:not(._mat-animation-noopable) .mdc-slider--discrete.mdc-slider--focus .mdc-slider__thumb{animation:none}.mat-slider-has-ticks:not(.mat-slider-disabled) .mdc-slider__track-marker-container{visibility:visible}\n"]
        }),
        __param(4, Optional()),
        __param(5, Attribute('tabindex')),
        __param(6, Optional()), __param(6, Inject(ANIMATION_MODULE_TYPE)),
        __metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef,
            NgZone,
            Platform,
            Directionality, String, String])
    ], MatSlider);
    return MatSlider;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MatSliderModule = /** @class */ (() => {
    let MatSliderModule = class MatSliderModule {
    };
    MatSliderModule = __decorate([
        NgModule({
            imports: [MatCommonModule, CommonModule],
            exports: [MatSlider, MatCommonModule],
            declarations: [MatSlider],
        })
    ], MatSliderModule);
    return MatSliderModule;
})();

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

export { MAT_SLIDER_VALUE_ACCESSOR, MatSlider, MatSliderChange, MatSliderModule };
//# sourceMappingURL=mdc-slider.js.map
