/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CanDisableRipple, RippleGlobalOptions } from '@angular/material/core';
import { Thumb, TickMark } from '@material/slider';
import { GlobalChangeAndInputListener } from './global-change-and-input-listener';
/** Represents a drag event emitted by the MatSlider component. */
export interface MatSliderDragEvent {
    /** The MatSliderThumb that was interacted with. */
    source: MatSliderThumb;
    /** The MatSlider that was interacted with. */
    parent: MatSlider;
    /** The current value of the slider. */
    value: number;
}
/**
 * The visual slider thumb.
 *
 * Handles the slider thumb ripple states (hover, focus, and active),
 * and displaying the value tooltip on discrete sliders.
 * @docs-private
 */
export declare class MatSliderVisualThumb implements AfterViewInit, OnDestroy {
    private readonly _ngZone;
    private readonly _slider;
    private readonly _elementRef;
    /** Whether the slider displays a numeric value label upon pressing the thumb. */
    discrete: boolean;
    /** Indicates which slider thumb this input corresponds to. */
    thumbPosition: Thumb;
    /** The display value of the slider thumb. */
    valueIndicatorText: string;
    /** Whether ripples on the slider thumb should be disabled. */
    disableRipple: boolean;
    /** The MatRipple for this slider thumb. */
    private readonly _ripple;
    /** The slider thumb knob */
    _knob: ElementRef<HTMLElement>;
    /** The slider input corresponding to this slider thumb. */
    private _sliderInput;
    /** The RippleRef for the slider thumbs hover state. */
    private _hoverRippleRef;
    /** The RippleRef for the slider thumbs focus state. */
    private _focusRippleRef;
    /** The RippleRef for the slider thumbs active state. */
    private _activeRippleRef;
    /** Whether the slider thumb is currently being pressed. */
    private _isActive;
    /** Whether the slider thumb is currently being hovered. */
    private _isHovered;
    constructor(_ngZone: NgZone, _slider: MatSlider, _elementRef: ElementRef<HTMLElement>);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private _onMouseEnter;
    private _onMouseLeave;
    private _onFocus;
    private _onBlur;
    private _onDragStart;
    private _onDragEnd;
    /** Handles displaying the hover ripple. */
    private _showHoverRipple;
    /** Handles displaying the focus ripple. */
    private _showFocusRipple;
    /** Handles displaying the active ripple. */
    private _showActiveRipple;
    /** Whether the given rippleRef is currently fading in or visible. */
    private _isShowingRipple;
    /** Manually launches the slider thumb ripple using the specified ripple animation config. */
    private _showRipple;
    /** Gets the hosts native HTML element. */
    _getHostElement(): HTMLElement;
    /** Gets the native HTML element of the slider thumb knob. */
    _getKnob(): HTMLElement;
}
/**
 * Directive that adds slider-specific behaviors to an input element inside `<mat-slider>`.
 * Up to two may be placed inside of a `<mat-slider>`.
 *
 * If one is used, the selector `matSliderThumb` must be used, and the outcome will be a normal
 * slider. If two are used, the selectors `matSliderStartThumb` and `matSliderEndThumb` must be
 * used, and the outcome will be a range slider with two slider thumbs.
 */
export declare class MatSliderThumb implements AfterViewInit, ControlValueAccessor, OnInit, OnDestroy {
    private readonly _slider;
    private readonly _elementRef;
    /** The current value of this slider input. */
    get value(): number;
    set value(v: number);
    /**
     * Emits when the raw value of the slider changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * @docs-private
     */
    readonly valueChange: EventEmitter<number>;
    /** Event emitted when the slider thumb starts being dragged. */
    readonly dragStart: EventEmitter<MatSliderDragEvent>;
    /** Event emitted when the slider thumb stops being dragged. */
    readonly dragEnd: EventEmitter<MatSliderDragEvent>;
    /** Event emitted every time the MatSliderThumb is blurred. */
    readonly _blur: EventEmitter<void>;
    /** Event emitted every time the MatSliderThumb is focused. */
    readonly _focus: EventEmitter<void>;
    /**
     * Used to determine the disabled state of the MatSlider (ControlValueAccessor).
     * For ranged sliders, the disabled state of the MatSlider depends on the combined state of the
     * start and end inputs. See MatSlider._updateDisabled.
     */
    _disabled: boolean;
    /**
     * A callback function that is called when the
     * control's value changes in the UI (ControlValueAccessor).
     */
    _onChange: (value: any) => void;
    /**
     * A callback function that is called by the forms API on
     * initialization to update the form model on blur (ControlValueAccessor).
     */
    private _onTouched;
    /** Indicates which slider thumb this input corresponds to. */
    _thumbPosition: Thumb;
    /** The injected document if available or fallback to the global document reference. */
    private _document;
    /** The host native HTML input element. */
    _hostElement: HTMLInputElement;
    constructor(document: any, _slider: MatSlider, _elementRef: ElementRef<HTMLInputElement>);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    _onBlur(): void;
    _emitFakeEvent(type: 'change' | 'input'): void;
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value
     */
    writeValue(value: any): void;
    /**
     * Registers a callback to be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnChange(fn: any): void;
    /**
     * Registers a callback to be triggered when the component is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    registerOnTouched(fn: any): void;
    /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean): void;
    focus(): void;
    blur(): void;
    /** Returns true if this slider input currently has focus. */
    _isFocused(): boolean;
    /**
     * Sets the min, max, and step properties on the slider thumb input.
     *
     * Must be called AFTER the sibling slider thumb input is guaranteed to have had its value
     * attribute value set. For a range slider, the min and max of the slider thumb input depends on
     * the value of its sibling slider thumb inputs value.
     *
     * Must be called BEFORE the value property is set. In the case where the min and max have not
     * yet been set and we are setting the input value property to a value outside of the native
     * inputs default min or max. The value property would not be set to our desired value, but
     * instead be capped at either the default min or max.
     *
     */
    _initializeInputState(): void;
    /**
     * Sets the value property on the slider thumb input.
     *
     * Must be called AFTER the min and max have been set. In the case where the min and max have not
     * yet been set and we are setting the input value property to a value outside of the native
     * inputs default min or max. The value property would not be set to our desired value, but
     * instead be capped at either the default min or max.
     */
    private _initializeInputValueProperty;
    /**
     * Ensures the value attribute is initialized.
     *
     * Must be called BEFORE the min and max are set. For a range slider, the min and max of the
     * slider thumb input depends on the value of its sibling slider thumb inputs value.
     */
    private _initializeInputValueAttribute;
    /**
     * Initializes the aria-valuetext attribute.
     *
     * Must be called AFTER the value attribute is set. This is because the slider's parent
     * `displayWith` function is used to set the `aria-valuetext` attribute.
     */
    private _initializeAriaValueText;
    static ngAcceptInputType_value: NumberInput;
}
declare const _MatSliderMixinBase: import("@angular/material/core/common-behaviors/constructor").Constructor<import("@angular/material/core").CanColor> & import("@angular/material/core/common-behaviors/constructor").AbstractConstructor<import("@angular/material/core").CanColor> & import("@angular/material/core/common-behaviors/constructor").Constructor<CanDisableRipple> & import("@angular/material/core/common-behaviors/constructor").AbstractConstructor<CanDisableRipple> & {
    new (_elementRef: ElementRef<HTMLElement>): {
        _elementRef: ElementRef<HTMLElement>;
    };
};
/**
 * Allows users to select from a range of values by moving the slider thumb. It is similar in
 * behavior to the native `<input type="range">` element.
 */
export declare class MatSlider extends _MatSliderMixinBase implements AfterViewInit, CanDisableRipple, OnDestroy {
    readonly _ngZone: NgZone;
    readonly _cdr: ChangeDetectorRef;
    private readonly _platform;
    readonly _globalChangeAndInputListener: GlobalChangeAndInputListener<'input' | 'change'>;
    private _dir;
    readonly _globalRippleOptions?: RippleGlobalOptions | undefined;
    /** The slider thumb(s). */
    _thumbs: QueryList<MatSliderVisualThumb>;
    /** The active section of the slider track. */
    _trackActive: ElementRef<HTMLElement>;
    /** The sliders hidden range input(s). */
    _inputs: QueryList<MatSliderThumb>;
    /** Whether the slider is disabled. */
    get disabled(): boolean;
    set disabled(v: boolean);
    private _disabled;
    /** Whether the slider displays a numeric value label upon pressing the thumb. */
    get discrete(): boolean;
    set discrete(v: boolean);
    private _discrete;
    /** Whether the slider displays tick marks along the slider track. */
    get showTickMarks(): boolean;
    set showTickMarks(v: boolean);
    private _showTickMarks;
    /** The minimum value that the slider can have. */
    get min(): number;
    set min(v: number);
    private _min;
    /** The maximum value that the slider can have. */
    get max(): number;
    set max(v: number);
    private _max;
    /** The values at which the thumb will snap. */
    get step(): number;
    set step(v: number);
    private _step;
    /**
     * Function that will be used to format the value before it is displayed
     * in the thumb label. Can be used to format very large number in order
     * for them to fit into the slider thumb.
     */
    displayWith: ((value: number) => string);
    /** Instance of the MDC slider foundation for this slider. */
    private _foundation;
    /** Whether the foundation has been initialized. */
    _initialized: boolean;
    /** The injected document if available or fallback to the global document reference. */
    _document: Document;
    /**
     * The defaultView of the injected document if
     * available or fallback to global window reference.
     */
    _window: Window;
    /** Used to keep track of & render the active & inactive tick marks on the slider track. */
    _tickMarks: TickMark[];
    /** The display value of the start thumb. */
    _startValueIndicatorText: string;
    /** The display value of the end thumb. */
    _endValueIndicatorText: string;
    /** Whether animations have been disabled. */
    _noopAnimations: boolean;
    /**
     * Whether the browser supports pointer events.
     *
     * We exclude iOS to mirror the MDC Foundation. The MDC Foundation cannot use pointer events on
     * iOS because of this open bug - https://bugs.webkit.org/show_bug.cgi?id=220196.
     */
    private _SUPPORTS_POINTER_EVENTS;
    /** Subscription to changes to the directionality (LTR / RTL) context for the application. */
    private _dirChangeSubscription;
    constructor(_ngZone: NgZone, _cdr: ChangeDetectorRef, elementRef: ElementRef<HTMLElement>, _platform: Platform, _globalChangeAndInputListener: GlobalChangeAndInputListener<'input' | 'change'>, document: any, _dir: Directionality, _globalRippleOptions?: RippleGlobalOptions | undefined, animationMode?: string);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Returns true if the language direction for this slider element is right to left. */
    _isRTL(): boolean;
    /**
     * Attaches an event listener that keeps sync the slider UI and the foundation in sync.
     *
     * Because the MDC Foundation stores the value of the bounding client rect when layout is called,
     * we need to keep calling layout to avoid the position of the slider getting out of sync with
     * what the foundation has stored. If we don't do this, the foundation will not be able to
     * correctly calculate the slider value on click/slide.
     */
    _attachUISyncEventListener(): void;
    /** Removes the event listener that keeps sync the slider UI and the foundation in sync. */
    _removeUISyncEventListener(): void;
    /** Wrapper function for calling layout (needed for adding & removing an event listener). */
    private _layout;
    /**
     * Reinitializes the slider foundation and input state(s).
     *
     * The MDC Foundation does not support changing some slider attributes after it has been
     * initialized (e.g. min, max, and step). To continue supporting this feature, we need to
     * destroy the foundation and re-initialize everything whenever we make these changes.
     */
    private _reinitialize;
    /** Handles updating the slider foundation after a dir change. */
    private _onDirChange;
    /** Sets the value of a slider thumb. */
    _setValue(value: number, thumbPosition: Thumb): void;
    /** Sets the disabled state of the MatSlider. */
    private _setDisabled;
    /** Sets the disabled state of the individual slider thumb(s) (ControlValueAccessor). */
    private _updateInputsDisabledState;
    /** Whether this is a ranged slider. */
    _isRange(): boolean;
    /** Sets the disabled state based on the disabled state of the inputs (ControlValueAccessor). */
    _updateDisabled(): void;
    /** Gets the slider thumb input of the given thumb position. */
    _getInput(thumbPosition: Thumb): MatSliderThumb;
    /** Gets the slider thumb HTML input element of the given thumb position. */
    _getInputElement(thumbPosition: Thumb): HTMLInputElement;
    _getThumb(thumbPosition: Thumb): MatSliderVisualThumb;
    /** Gets the slider thumb HTML element of the given thumb position. */
    _getThumbElement(thumbPosition: Thumb): HTMLElement;
    /** Gets the slider knob HTML element of the given thumb position. */
    _getKnobElement(thumbPosition: Thumb): HTMLElement;
    /**
     * Sets the value indicator text of the given thumb position using the given value.
     *
     * Uses the `displayWith` function if one has been provided. Otherwise, it just uses the
     * numeric value as a string.
     */
    _setValueIndicatorText(value: number, thumbPosition: Thumb): void;
    /** Gets the value indicator text for the given thumb position. */
    _getValueIndicatorText(thumbPosition: Thumb): string;
    /** Determines the class name for a HTML element. */
    _getTickMarkClass(tickMark: TickMark): string;
    /** Whether the slider thumb ripples should be disabled. */
    _isRippleDisabled(): boolean;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_discrete: BooleanInput;
    static ngAcceptInputType_showTickMarks: BooleanInput;
    static ngAcceptInputType_min: NumberInput;
    static ngAcceptInputType_max: NumberInput;
    static ngAcceptInputType_step: NumberInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
}
export {};
