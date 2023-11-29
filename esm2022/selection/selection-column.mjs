/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatTable, } from '@angular/material/table';
import { Component, Input, Optional, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, Inject, } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatSelection } from './selection';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSelectionToggle } from './selection-toggle';
import { MatSelectAll } from './select-all';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/table";
import * as i2 from "./selection";
/**
 * Column that adds row selecting checkboxes and a select-all checkbox if `matSelectionMultiple` is
 * `true`.
 *
 * Must be used within a parent `MatSelection` directive.
 */
export class MatSelectionColumn {
    /** Column name that should be used to reference this column. */
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
        this._syncColumnDefName();
    }
    constructor(_table, selection) {
        this._table = _table;
        this.selection = selection;
    }
    ngOnInit() {
        if (!this.selection && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('MatSelectionColumn: missing MatSelection in the parent');
        }
        this._syncColumnDefName();
        if (this._table) {
            this._columnDef.cell = this._cell;
            this._columnDef.headerCell = this._headerCell;
            this._table.addColumnDef(this._columnDef);
        }
        else if (typeof ngDevMode === 'undefined' || ngDevMode) {
            throw Error('MatSelectionColumn: missing parent table');
        }
    }
    ngOnDestroy() {
        if (this._table) {
            this._table.removeColumnDef(this._columnDef);
        }
    }
    _syncColumnDefName() {
        if (this._columnDef) {
            this._columnDef.name = this._name;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.4", ngImport: i0, type: MatSelectionColumn, deps: [{ token: MatTable, optional: true }, { token: MatSelection, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.0.4", type: MatSelectionColumn, isStandalone: true, selector: "mat-selection-column", inputs: { name: "name" }, viewQueries: [{ propertyName: "_columnDef", first: true, predicate: MatColumnDef, descendants: true, static: true }, { propertyName: "_cell", first: true, predicate: MatCellDef, descendants: true, static: true }, { propertyName: "_headerCell", first: true, predicate: MatHeaderCellDef, descendants: true, static: true }], ngImport: i0, template: `
    <ng-container matColumnDef>
      <th mat-header-cell *matHeaderCellDef class="mat-selection-column-header">
        @if (selection.multiple) {
          <mat-checkbox
              matSelectAll
              #allToggler="matSelectAll"
              [indeterminate]="allToggler.indeterminate | async"></mat-checkbox>
        }
      </th>
      <td mat-cell *matCellDef="let row; let i = $index" class="mat-selection-column-cell">
        <mat-checkbox
            matSelectionToggle
            [matSelectionToggleValue]="row"
            [matSelectionToggleIndex]="i"></mat-checkbox>
      </td>
    </ng-container>
  `, isInline: true, styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}"], dependencies: [{ kind: "directive", type: MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { kind: "directive", type: MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "component", type: MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { kind: "directive", type: MatSelectAll, selector: "[matSelectAll]", exportAs: ["matSelectAll"] }, { kind: "directive", type: MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "directive", type: MatSelectionToggle, selector: "[matSelectionToggle]", inputs: ["matSelectionToggleIndex", "matSelectionToggleValue"], exportAs: ["matSelectionToggle"] }, { kind: "pipe", type: AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.4", ngImport: i0, type: MatSelectionColumn, decorators: [{
            type: Component,
            args: [{ selector: 'mat-selection-column', template: `
    <ng-container matColumnDef>
      <th mat-header-cell *matHeaderCellDef class="mat-selection-column-header">
        @if (selection.multiple) {
          <mat-checkbox
              matSelectAll
              #allToggler="matSelectAll"
              [indeterminate]="allToggler.indeterminate | async"></mat-checkbox>
        }
      </th>
      <td mat-cell *matCellDef="let row; let i = $index" class="mat-selection-column-cell">
        <mat-checkbox
            matSelectionToggle
            [matSelectionToggleValue]="row"
            [matSelectionToggleIndex]="i"></mat-checkbox>
      </td>
    </ng-container>
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, standalone: true, imports: [
                        MatColumnDef,
                        MatHeaderCellDef,
                        MatHeaderCell,
                        MatCheckbox,
                        MatSelectAll,
                        MatCellDef,
                        MatCell,
                        MatSelectionToggle,
                        AsyncPipe,
                    ], styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}"] }]
        }], ctorParameters: () => [{ type: i1.MatTable, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MatTable]
                }] }, { type: i2.MatSelection, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MatSelection]
                }] }], propDecorators: { name: [{
                type: Input
            }], _columnDef: [{
                type: ViewChild,
                args: [MatColumnDef, { static: true }]
            }], _cell: [{
                type: ViewChild,
                args: [MatCellDef, { static: true }]
            }], _headerCell: [{
                type: ViewChild,
                args: [MatHeaderCellDef, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWNvbHVtbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLE9BQU8sRUFDUCxVQUFVLEVBQ1YsWUFBWSxFQUNaLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsUUFBUSxHQUNULE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsUUFBUSxFQUNSLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQzs7OztBQUUxQzs7Ozs7R0FLRztBQXFDSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLGdFQUFnRTtJQUNoRSxJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksSUFBSSxDQUFDLElBQVk7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQVFELFlBQ3dDLE1BQW1CLEVBQ2QsU0FBMEI7UUFEL0IsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUNkLGNBQVMsR0FBVCxTQUFTLENBQWlCO0lBQ3BFLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLEVBQUU7WUFDdEUsTUFBTSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztTQUN2RTtRQUVELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTFCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDM0M7YUFBTSxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUU7WUFDeEQsTUFBTSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNuQztJQUNILENBQUM7OEdBakRVLGtCQUFrQixrQkFtQlAsUUFBUSw2QkFDUixZQUFZO2tHQXBCdkIsa0JBQWtCLHNKQWFsQixZQUFZLHNGQUNaLFVBQVUsNEZBQ1YsZ0JBQWdCLDhEQWpEakI7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJULG1LQU1DLFlBQVksK0ZBQ1osZ0JBQWdCLCtEQUNoQixhQUFhLGlGQUNiLFdBQVcsaVVBQ1gsWUFBWSx1RkFDWixVQUFVLHlEQUNWLE9BQU8sbUVBQ1Asa0JBQWtCLDhKQUNsQixTQUFTOzsyRkFHQSxrQkFBa0I7a0JBcEM5QixTQUFTOytCQUNFLHNCQUFzQixZQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBRWhDLGlCQUFpQixDQUFDLElBQUksY0FDekIsSUFBSSxXQUNQO3dCQUNQLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixVQUFVO3dCQUNWLE9BQU87d0JBQ1Asa0JBQWtCO3dCQUNsQixTQUFTO3FCQUNWOzswQkFxQkUsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxRQUFROzswQkFDM0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxZQUFZO3lDQWpCOUIsSUFBSTtzQkFEUCxLQUFLO2dCQVdvRCxVQUFVO3NCQUFuRSxTQUFTO3VCQUFDLFlBQVksRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7Z0JBQ2lCLEtBQUs7c0JBQTVELFNBQVM7dUJBQUMsVUFBVSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQztnQkFFcEIsV0FBVztzQkFEM0IsU0FBUzt1QkFBQyxnQkFBZ0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgTWF0Q2VsbCxcbiAgTWF0Q2VsbERlZixcbiAgTWF0Q29sdW1uRGVmLFxuICBNYXRIZWFkZXJDZWxsLFxuICBNYXRIZWFkZXJDZWxsRGVmLFxuICBNYXRUYWJsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q2hpbGQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgSW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QXN5bmNQaXBlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge01hdFNlbGVjdGlvbn0gZnJvbSAnLi9zZWxlY3Rpb24nO1xuaW1wb3J0IHtNYXRDaGVja2JveH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtNYXRTZWxlY3Rpb25Ub2dnbGV9IGZyb20gJy4vc2VsZWN0aW9uLXRvZ2dsZSc7XG5pbXBvcnQge01hdFNlbGVjdEFsbH0gZnJvbSAnLi9zZWxlY3QtYWxsJztcblxuLyoqXG4gKiBDb2x1bW4gdGhhdCBhZGRzIHJvdyBzZWxlY3RpbmcgY2hlY2tib3hlcyBhbmQgYSBzZWxlY3QtYWxsIGNoZWNrYm94IGlmIGBtYXRTZWxlY3Rpb25NdWx0aXBsZWAgaXNcbiAqIGB0cnVlYC5cbiAqXG4gKiBNdXN0IGJlIHVzZWQgd2l0aGluIGEgcGFyZW50IGBNYXRTZWxlY3Rpb25gIGRpcmVjdGl2ZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNlbGVjdGlvbi1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPlxuICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiBjbGFzcz1cIm1hdC1zZWxlY3Rpb24tY29sdW1uLWhlYWRlclwiPlxuICAgICAgICBAaWYgKHNlbGVjdGlvbi5tdWx0aXBsZSkge1xuICAgICAgICAgIDxtYXQtY2hlY2tib3hcbiAgICAgICAgICAgICAgbWF0U2VsZWN0QWxsXG4gICAgICAgICAgICAgICNhbGxUb2dnbGVyPVwibWF0U2VsZWN0QWxsXCJcbiAgICAgICAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwiYWxsVG9nZ2xlci5pbmRldGVybWluYXRlIHwgYXN5bmNcIj48L21hdC1jaGVja2JveD5cbiAgICAgICAgfVxuICAgICAgPC90aD5cbiAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3c7IGxldCBpID0gJGluZGV4XCIgY2xhc3M9XCJtYXQtc2VsZWN0aW9uLWNvbHVtbi1jZWxsXCI+XG4gICAgICAgIDxtYXQtY2hlY2tib3hcbiAgICAgICAgICAgIG1hdFNlbGVjdGlvblRvZ2dsZVxuICAgICAgICAgICAgW21hdFNlbGVjdGlvblRvZ2dsZVZhbHVlXT1cInJvd1wiXG4gICAgICAgICAgICBbbWF0U2VsZWN0aW9uVG9nZ2xlSW5kZXhdPVwiaVwiPjwvbWF0LWNoZWNrYm94PlxuICAgICAgPC90ZD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlVXJsczogWydzZWxlY3Rpb24tY29sdW1uLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgTWF0Q29sdW1uRGVmLFxuICAgIE1hdEhlYWRlckNlbGxEZWYsXG4gICAgTWF0SGVhZGVyQ2VsbCxcbiAgICBNYXRDaGVja2JveCxcbiAgICBNYXRTZWxlY3RBbGwsXG4gICAgTWF0Q2VsbERlZixcbiAgICBNYXRDZWxsLFxuICAgIE1hdFNlbGVjdGlvblRvZ2dsZSxcbiAgICBBc3luY1BpcGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdGlvbkNvbHVtbjxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIENvbHVtbiBuYW1lIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gcmVmZXJlbmNlIHRoaXMgY29sdW1uLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIHNldCBuYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuXG4gICAgdGhpcy5fc3luY0NvbHVtbkRlZk5hbWUoKTtcbiAgfVxuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG5cbiAgQFZpZXdDaGlsZChNYXRDb2x1bW5EZWYsIHtzdGF0aWM6IHRydWV9KSBwcml2YXRlIHJlYWRvbmx5IF9jb2x1bW5EZWY6IE1hdENvbHVtbkRlZjtcbiAgQFZpZXdDaGlsZChNYXRDZWxsRGVmLCB7c3RhdGljOiB0cnVlfSkgcHJpdmF0ZSByZWFkb25seSBfY2VsbDogTWF0Q2VsbERlZjtcbiAgQFZpZXdDaGlsZChNYXRIZWFkZXJDZWxsRGVmLCB7c3RhdGljOiB0cnVlfSlcbiAgcHJpdmF0ZSByZWFkb25seSBfaGVhZGVyQ2VsbDogTWF0SGVhZGVyQ2VsbERlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1hdFRhYmxlKSBwcml2YXRlIF90YWJsZTogTWF0VGFibGU8VD4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNYXRTZWxlY3Rpb24pIHJlYWRvbmx5IHNlbGVjdGlvbjogTWF0U2VsZWN0aW9uPFQ+LFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGlvbiAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ01hdFNlbGVjdGlvbkNvbHVtbjogbWlzc2luZyBNYXRTZWxlY3Rpb24gaW4gdGhlIHBhcmVudCcpO1xuICAgIH1cblxuICAgIHRoaXMuX3N5bmNDb2x1bW5EZWZOYW1lKCk7XG5cbiAgICBpZiAodGhpcy5fdGFibGUpIHtcbiAgICAgIHRoaXMuX2NvbHVtbkRlZi5jZWxsID0gdGhpcy5fY2VsbDtcbiAgICAgIHRoaXMuX2NvbHVtbkRlZi5oZWFkZXJDZWxsID0gdGhpcy5faGVhZGVyQ2VsbDtcbiAgICAgIHRoaXMuX3RhYmxlLmFkZENvbHVtbkRlZih0aGlzLl9jb2x1bW5EZWYpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICB0aHJvdyBFcnJvcignTWF0U2VsZWN0aW9uQ29sdW1uOiBtaXNzaW5nIHBhcmVudCB0YWJsZScpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl90YWJsZSkge1xuICAgICAgdGhpcy5fdGFibGUucmVtb3ZlQ29sdW1uRGVmKHRoaXMuX2NvbHVtbkRlZik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc3luY0NvbHVtbkRlZk5hbWUoKSB7XG4gICAgaWYgKHRoaXMuX2NvbHVtbkRlZikge1xuICAgICAgdGhpcy5fY29sdW1uRGVmLm5hbWUgPSB0aGlzLl9uYW1lO1xuICAgIH1cbiAgfVxufVxuIl19