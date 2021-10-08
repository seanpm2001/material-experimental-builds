/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { ElementRef, NgZone, QueryList } from '@angular/core';
import { RippleGlobalOptions } from '@angular/material-experimental/mdc-core';
import { MatListBase, MatListItemBase } from './list-base';
import * as i0 from "@angular/core";
export declare class MatList extends MatListBase {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatList, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatList, "mat-list", ["matList"], {}, {}, never, ["*"]>;
}
export declare class MatListItem extends MatListItemBase {
    lines: QueryList<ElementRef<Element>>;
    _itemText: ElementRef<HTMLElement>;
    constructor(element: ElementRef, ngZone: NgZone, listBase: MatListBase, platform: Platform, globalRippleOptions?: RippleGlobalOptions, animationMode?: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListItem, [null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatListItem, "mat-list-item, a[mat-list-item], button[mat-list-item]", ["matListItem"], {}, {}, ["lines"], ["[mat-list-avatar],[matListAvatar],[mat-list-icon],[matListIcon]", "[mat-line],[matLine]", "*", "mat-divider"]>;
}
