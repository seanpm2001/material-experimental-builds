import { ButtonHarnessFilters } from '@angular/material/button/testing';
import { ComponentHarnessConstructor } from '@angular/cdk/testing';
import { ContentContainerComponentHarness } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';

export { ButtonHarnessFilters }

/** Harness for interacting with a MDC-based mat-button in tests. */
export declare class MatButtonHarness extends ContentContainerComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a button with specific attributes.
     * @param options Options for narrowing the search:
     *   - `selector` finds a button whose host element matches the given selector.
     *   - `text` finds a button with specific text content.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with<T extends MatButtonHarness>(this: ComponentHarnessConstructor<T>, options?: ButtonHarnessFilters): HarnessPredicate<T>;
    /**
     * Clicks the button at the given position relative to its top-left.
     * @param relativeX The relative x position of the click.
     * @param relativeY The relative y position of the click.
     */
    click(relativeX: number, relativeY: number): Promise<void>;
    /** Clicks the button at its center. */
    click(location: 'center'): Promise<void>;
    /** Clicks the button. */
    click(): Promise<void>;
    /** Gets a boolean promise indicating if the button is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets a promise for the button's label text. */
    getText(): Promise<string>;
    /** Focuses the button and returns a void promise that indicates when the action is complete. */
    focus(): Promise<void>;
    /** Blurs the button and returns a void promise that indicates when the action is complete. */
    blur(): Promise<void>;
    /** Whether the button is focused. */
    isFocused(): Promise<boolean>;
}

export { }
