import { __awaiter } from 'tslib';
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatRadioGroupHarnessBase, _MatRadioButtonHarnessBase } from '@angular/material/radio/testing';

/** Harness for interacting with an MDC-based mat-radio-group in tests. */
class MatRadioGroupHarness extends _MatRadioGroupHarnessBase {
    constructor() {
        super(...arguments);
        this._buttonClass = MatRadioButtonHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a radio group with specific
     * attributes.
     * @param options Options for filtering which radio group instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options).addOption('name', options.name, MatRadioGroupHarness._checkRadioGroupName);
    }
}
/** The selector for the host element of a `MatRadioGroup` instance. */
MatRadioGroupHarness.hostSelector = '.mat-mdc-radio-group';
/** Harness for interacting with an MDC-based mat-radio-button in tests. */
class MatRadioButtonHarness extends _MatRadioButtonHarnessBase {
    constructor() {
        super(...arguments);
        this._textLabel = this.locatorFor('label');
        this._clickLabel = this._textLabel;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a radio button with specific
     * attributes.
     * @param options Options for filtering which radio button instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options)
            .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabelText(), label))
            .addOption('name', options.name, (harness, name) => __awaiter(this, void 0, void 0, function* () { return (yield harness.getName()) === name; }))
            .addOption('checked', options.checked, (harness, checked) => __awaiter(this, void 0, void 0, function* () { return (yield harness.isChecked()) == checked; }));
    }
}
/** The selector for the host element of a `MatRadioButton` instance. */
MatRadioButtonHarness.hostSelector = '.mat-mdc-radio-button';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export { MatRadioButtonHarness, MatRadioGroupHarness };
//# sourceMappingURL=testing.mjs.map
