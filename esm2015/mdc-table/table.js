/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation } from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable, _CoalescedStyleScheduler, _COALESCED_STYLE_SCHEDULER, CDK_TABLE, STICKY_POSITIONING_LISTENER, } from '@angular/cdk/table';
import { _DisposeViewRepeaterStrategy, _RecycleViewRepeaterStrategy, _VIEW_REPEATER_STRATEGY } from '@angular/cdk/collections';
/**
 * Enables the recycle view repeater strategy, which reduces rendering latency. Not compatible with
 * tables that animate rows.
 */
export class MatRecycleRows {
}
MatRecycleRows.decorators = [
    { type: Directive, args: [{
                selector: 'mat-table[recycleRows], table[mat-table][recycleRows]',
                providers: [
                    { provide: _VIEW_REPEATER_STRATEGY, useClass: _RecycleViewRepeaterStrategy },
                ],
            },] }
];
export class MatTable extends CdkTable {
    constructor() {
        super(...arguments);
        /** Overrides the sticky CSS class set by the `CdkTable`. */
        this.stickyCssClass = 'mat-mdc-table-sticky';
        /** Overrides the need to add position: sticky on every sticky cell element in `CdkTable`. */
        this.needsPositionStickyOnElement = false;
    }
    ngOnInit() {
        super.ngOnInit();
        // After ngOnInit, the `CdkTable` has created and inserted the table sections (thead, tbody,
        // tfoot). MDC requires the `mdc-data-table__content` class to be added to the body. Note that
        // this only applies to native tables, because we don't wrap the content of flexbox-based ones.
        if (this._isNativeHtmlTable) {
            const tbody = this._elementRef.nativeElement.querySelector('tbody');
            tbody.classList.add('mdc-data-table__content');
        }
    }
}
MatTable.decorators = [
    { type: Component, args: [{
                selector: 'mat-table, table[mat-table]',
                exportAs: 'matTable',
                template: CDK_TABLE_TEMPLATE,
                host: {
                    'class': 'mat-mdc-table mdc-data-table__table',
                    '[class.mdc-table-fixed-layout]': 'fixedLayout',
                },
                providers: [
                    { provide: CdkTable, useExisting: MatTable },
                    { provide: CDK_TABLE, useExisting: MatTable },
                    { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
                    // TODO(michaeljamesparsons) Abstract the view repeater strategy to a directive API so this code
                    //  is only included in the build if used.
                    { provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
                    // Prevent nested tables from seeing this table's StickyPositioningListener.
                    { provide: STICKY_POSITIONING_LISTENER, useValue: null },
                ],
                encapsulation: ViewEncapsulation.None,
                // See note on CdkTable for explanation on why this uses the default change detection strategy.
                // tslint:disable-next-line:validate-decorators
                changeDetection: ChangeDetectionStrategy.Default,
                styles: [".mat-mdc-table:not(table){display:block}.mat-mdc-table:not(table) .mat-mdc-cell,.mat-mdc-table:not(table) .mat-mdc-header-cell,.mat-mdc-table:not(table) .mat-mdc-footer-cell{display:flex}.mat-mdc-table:not(table) .mat-mdc-row,.mat-mdc-table:not(table) .mat-mdc-header-row,.mat-mdc-table:not(table) .mat-mdc-footer-row{display:flex}.mat-mdc-table:not(table) .mat-mdc-row::after,.mat-mdc-table:not(table) .mat-mdc-header-row::after,.mat-mdc-table:not(table) .mat-mdc-footer-row::after{display:inline-block;min-height:inherit;content:\"\"}.mat-mdc-header-row{min-height:56px}.mat-mdc-row,.mat-mdc-footer-row{min-height:48px}.mat-mdc-row,.mat-mdc-header-row,.mat-mdc-footer-row{border-bottom-width:1px;border-bottom-style:solid;align-items:center;box-sizing:border-box}.mat-mdc-cell,.mat-mdc-header-cell,.mat-mdc-footer-cell{flex:1;overflow:hidden;word-wrap:break-word;min-height:inherit;align-items:center}.mat-mdc-cell:first-of-type,.mat-mdc-header-cell:first-of-type,.mat-mdc-footer-cell:first-of-type{padding-left:24px}[dir=rtl] .mat-mdc-cell:first-of-type:not(:only-of-type),[dir=rtl] .mat-mdc-header-cell:first-of-type:not(:only-of-type),[dir=rtl] .mat-mdc-footer-cell:first-of-type:not(:only-of-type){padding-left:0;padding-right:24px}.mat-mdc-cell:last-of-type,.mat-mdc-header-cell:last-of-type,.mat-mdc-footer-cell:last-of-type{padding-right:24px}[dir=rtl] .mat-mdc-cell:last-of-type:not(:only-of-type),[dir=rtl] .mat-mdc-header-cell:last-of-type:not(:only-of-type),[dir=rtl] .mat-mdc-footer-cell:last-of-type:not(:only-of-type){padding-right:0;padding-left:24px}.mdc-data-table{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);border-width:1px;border-style:solid;-webkit-overflow-scrolling:touch;display:inline-flex;flex-direction:column;box-sizing:border-box;position:relative}.mdc-data-table .mdc-data-table__header-cell:first-child{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-medium, 4px)}[dir=rtl] .mdc-data-table .mdc-data-table__header-cell:first-child,.mdc-data-table .mdc-data-table__header-cell:first-child[dir=rtl]{border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-medium, 4px);border-top-left-radius:0}.mdc-data-table .mdc-data-table__header-cell:last-child{border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-medium, 4px)}[dir=rtl] .mdc-data-table .mdc-data-table__header-cell:last-child,.mdc-data-table .mdc-data-table__header-cell:last-child[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-medium, 4px);border-top-right-radius:0}.mdc-data-table__header-cell:after{border-bottom-width:1px;border-bottom-style:solid}.mdc-data-table__cell,.mdc-data-table__pagination{border-top-width:1px;border-top-style:solid}.mdc-data-table__cell{height:52px}.mdc-data-table__pagination{min-height:52px}.mdc-data-table__header-cell{height:56px}.mdc-data-table__cell,.mdc-data-table__header-cell{padding-right:16px;padding-left:16px}.mdc-data-table__header-cell--checkbox,.mdc-data-table__cell--checkbox{padding-left:4px;padding-right:0}[dir=rtl] .mdc-data-table__header-cell--checkbox,[dir=rtl] .mdc-data-table__cell--checkbox,.mdc-data-table__header-cell--checkbox[dir=rtl],.mdc-data-table__cell--checkbox[dir=rtl]{padding-left:0;padding-right:4px}.mdc-data-table__table-container{-webkit-overflow-scrolling:touch;overflow-x:auto;width:100%}.mdc-data-table__table{min-width:100%;border:0;white-space:nowrap;border-spacing:0;table-layout:fixed}.mdc-data-table__cell{box-sizing:border-box;overflow:hidden;text-align:left;text-overflow:ellipsis}[dir=rtl] .mdc-data-table__cell,.mdc-data-table__cell[dir=rtl]{text-align:right}.mdc-data-table__cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__cell--numeric,.mdc-data-table__cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__cell--checkbox{width:1px}.mdc-data-table__header-cell{box-sizing:border-box;text-overflow:ellipsis;overflow:hidden;outline:none;text-align:left}[dir=rtl] .mdc-data-table__header-cell,.mdc-data-table__header-cell[dir=rtl]{text-align:right}.mdc-data-table__header-cell--checkbox{width:1px}.mdc-data-table__header-cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__header-cell--numeric,.mdc-data-table__header-cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__sort-icon-button{width:28px;height:28px;padding:2px;transform:rotate(0.0001deg);margin-left:4px;margin-right:0;opacity:0}.mdc-data-table__sort-icon-button.mdc-icon-button--touch{margin-top:0;margin-bottom:0}.mdc-data-table__sort-icon-button.mdc-icon-button--touch .mdc-icon-button__touch{display:none}[dir=rtl] .mdc-data-table__sort-icon-button,.mdc-data-table__sort-icon-button[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__header-cell--sorted-descending .mdc-data-table__sort-icon-button{transform:rotate(-180deg)}.mdc-data-table__sort-icon-button:focus,.mdc-data-table__header-cell:hover .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button{opacity:1}.mdc-data-table__header-cell-wrapper{align-items:center;display:inline-flex;vertical-align:middle}.mdc-data-table__header-cell--with-sort{cursor:pointer}.mdc-data-table__sort-status-label{clip:rect(1px, 1px, 1px, 1px);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}.mdc-data-table__progress-indicator{display:none;position:absolute;width:100%}.mdc-data-table--in-progress .mdc-data-table__progress-indicator{display:block}.mdc-data-table__scrim{background-color:#fff;background-color:var(--mdc-theme-surface, #fff);height:100%;opacity:.32;position:absolute;top:0;width:100%}.mdc-data-table--sticky-header .mdc-data-table__header-cell{position:sticky;top:0;z-index:1}.mdc-data-table--sticky-header .mdc-data-table__header-cell:after{bottom:0;content:\"\";left:0;position:absolute;width:100%}.mdc-data-table--sticky-header .mdc-data-table__row:first-child .mdc-data-table__cell{border-top:0}.mdc-data-table__pagination{box-sizing:border-box;display:flex;justify-content:flex-end}.mdc-data-table__pagination-trailing{margin-left:4px;margin-right:0;align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-end}[dir=rtl] .mdc-data-table__pagination-trailing,.mdc-data-table__pagination-trailing[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__pagination-navigation{align-items:center;display:flex}.mdc-data-table__pagination-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__pagination-button .mdc-button__icon,.mdc-data-table__pagination-button .mdc-button__icon[dir=rtl]{transform:rotate(180deg)}[dir=rtl] .mdc-data-table__pagination-button,.mdc-data-table__pagination-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__pagination-total{margin-left:14px;margin-right:36px;white-space:nowrap}[dir=rtl] .mdc-data-table__pagination-total,.mdc-data-table__pagination-total[dir=rtl]{margin-left:36px;margin-right:14px}.mdc-data-table__pagination-rows-per-page{margin-left:0;margin-right:22px;align-items:center;display:inline-flex}[dir=rtl] .mdc-data-table__pagination-rows-per-page,.mdc-data-table__pagination-rows-per-page[dir=rtl]{margin-left:22px;margin-right:0}.mdc-data-table__pagination-rows-per-page-label{margin-left:0;margin-right:12px;white-space:nowrap}[dir=rtl] .mdc-data-table__pagination-rows-per-page-label,.mdc-data-table__pagination-rows-per-page-label[dir=rtl]{margin-left:12px;margin-right:0}.mdc-data-table__pagination-rows-per-page-select{min-width:80px;min-width:var(--mdc-menu-min-width, 80px);margin:8px 0}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor{width:100%;min-width:80px}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor{height:36px}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-floating-label--float-above{font-size:.75rem}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-data-table__pagination-rows-per-page-select .mdc-select__dropdown-icon{width:20px;height:20px}.mdc-data-table__pagination-rows-per-page-select.mdc-select--outlined .mdc-select__anchor :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 56px)}.mdc-data-table__pagination-rows-per-page-select .mdc-deprecated-list-item{height:36px}.mat-mdc-table-sticky{position:-webkit-sticky !important;position:sticky !important}.mat-mdc-table{table-layout:auto}.mat-mdc-row,.mat-mdc-header-row,.mdc-mdc-footer-row{border-bottom:none}.mat-mdc-table tbody,.mat-mdc-table tfoot,.mat-mdc-table thead,.mat-mdc-cell,.mat-mdc-footer-cell,.mat-mdc-table .mat-mdc-header-cell{background:inherit}.mat-mdc-table .mat-mdc-row:hover,.mat-mdc-table .mat-mdc-footer-row:hover{background-color:inherit}\n"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJsZS90YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxTQUFTLEVBRVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsUUFBUSxFQUNSLHdCQUF3QixFQUN4QiwwQkFBMEIsRUFDMUIsU0FBUyxFQUNULDJCQUEyQixHQUM1QixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFDTCw0QkFBNEIsRUFDNUIsNEJBQTRCLEVBQzVCLHVCQUF1QixFQUN4QixNQUFNLDBCQUEwQixDQUFDO0FBRWxDOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxjQUFjOzs7WUFOMUIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1REFBdUQ7Z0JBQ2pFLFNBQVMsRUFBRTtvQkFDVCxFQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsNEJBQTRCLEVBQUM7aUJBQzNFO2FBQ0Y7O0FBMkJELE1BQU0sT0FBTyxRQUFZLFNBQVEsUUFBVztJQXhCNUM7O1FBeUJFLDREQUE0RDtRQUN6QyxtQkFBYyxHQUFHLHNCQUFzQixDQUFDO1FBRTNELDZGQUE2RjtRQUMxRSxpQ0FBNEIsR0FBRyxLQUFLLENBQUM7SUFhMUQsQ0FBQztJQVhVLFFBQVE7UUFDZixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsNEZBQTRGO1FBQzVGLDhGQUE4RjtRQUM5RiwrRkFBK0Y7UUFDL0YsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BFLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDOzs7WUF6Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsa0JBQWtCO2dCQUU1QixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLHFDQUFxQztvQkFDOUMsZ0NBQWdDLEVBQUUsYUFBYTtpQkFDaEQ7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFDO29CQUMxQyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBQztvQkFDM0MsRUFBQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFDO29CQUN6RSxnR0FBZ0c7b0JBQ2hHLDBDQUEwQztvQkFDMUMsRUFBQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixFQUFDO29CQUMxRSw0RUFBNEU7b0JBQzVFLEVBQUMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7aUJBQ3ZEO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQywrRkFBK0Y7Z0JBQy9GLCtDQUErQztnQkFDL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87O2FBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENES19UQUJMRV9URU1QTEFURSxcbiAgQ2RrVGFibGUsXG4gIF9Db2FsZXNjZWRTdHlsZVNjaGVkdWxlcixcbiAgX0NPQUxFU0NFRF9TVFlMRV9TQ0hFRFVMRVIsXG4gIENES19UQUJMRSxcbiAgU1RJQ0tZX1BPU0lUSU9OSU5HX0xJU1RFTkVSLFxufSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHtcbiAgX0Rpc3Bvc2VWaWV3UmVwZWF0ZXJTdHJhdGVneSxcbiAgX1JlY3ljbGVWaWV3UmVwZWF0ZXJTdHJhdGVneSxcbiAgX1ZJRVdfUkVQRUFURVJfU1RSQVRFR1lcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcblxuLyoqXG4gKiBFbmFibGVzIHRoZSByZWN5Y2xlIHZpZXcgcmVwZWF0ZXIgc3RyYXRlZ3ksIHdoaWNoIHJlZHVjZXMgcmVuZGVyaW5nIGxhdGVuY3kuIE5vdCBjb21wYXRpYmxlIHdpdGhcbiAqIHRhYmxlcyB0aGF0IGFuaW1hdGUgcm93cy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LXRhYmxlW3JlY3ljbGVSb3dzXSwgdGFibGVbbWF0LXRhYmxlXVtyZWN5Y2xlUm93c10nLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogX1ZJRVdfUkVQRUFURVJfU1RSQVRFR1ksIHVzZUNsYXNzOiBfUmVjeWNsZVZpZXdSZXBlYXRlclN0cmF0ZWd5fSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UmVjeWNsZVJvd3Mge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXRhYmxlLCB0YWJsZVttYXQtdGFibGVdJyxcbiAgZXhwb3J0QXM6ICdtYXRUYWJsZScsXG4gIHRlbXBsYXRlOiBDREtfVEFCTEVfVEVNUExBVEUsXG4gIHN0eWxlVXJsczogWyd0YWJsZS5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXRhYmxlIG1kYy1kYXRhLXRhYmxlX190YWJsZScsXG4gICAgJ1tjbGFzcy5tZGMtdGFibGUtZml4ZWQtbGF5b3V0XSc6ICdmaXhlZExheW91dCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBDZGtUYWJsZSwgdXNlRXhpc3Rpbmc6IE1hdFRhYmxlfSxcbiAgICB7cHJvdmlkZTogQ0RLX1RBQkxFLCB1c2VFeGlzdGluZzogTWF0VGFibGV9LFxuICAgIHtwcm92aWRlOiBfQ09BTEVTQ0VEX1NUWUxFX1NDSEVEVUxFUiwgdXNlQ2xhc3M6IF9Db2FsZXNjZWRTdHlsZVNjaGVkdWxlcn0sXG4gICAgLy8gVE9ETyhtaWNoYWVsamFtZXNwYXJzb25zKSBBYnN0cmFjdCB0aGUgdmlldyByZXBlYXRlciBzdHJhdGVneSB0byBhIGRpcmVjdGl2ZSBBUEkgc28gdGhpcyBjb2RlXG4gICAgLy8gIGlzIG9ubHkgaW5jbHVkZWQgaW4gdGhlIGJ1aWxkIGlmIHVzZWQuXG4gICAge3Byb3ZpZGU6IF9WSUVXX1JFUEVBVEVSX1NUUkFURUdZLCB1c2VDbGFzczogX0Rpc3Bvc2VWaWV3UmVwZWF0ZXJTdHJhdGVneX0sXG4gICAgLy8gUHJldmVudCBuZXN0ZWQgdGFibGVzIGZyb20gc2VlaW5nIHRoaXMgdGFibGUncyBTdGlja3lQb3NpdGlvbmluZ0xpc3RlbmVyLlxuICAgIHtwcm92aWRlOiBTVElDS1lfUE9TSVRJT05JTkdfTElTVEVORVIsIHVzZVZhbHVlOiBudWxsfSxcbiAgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgLy8gU2VlIG5vdGUgb24gQ2RrVGFibGUgZm9yIGV4cGxhbmF0aW9uIG9uIHdoeSB0aGlzIHVzZXMgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWJsZTxUPiBleHRlbmRzIENka1RhYmxlPFQ+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqIE92ZXJyaWRlcyB0aGUgc3RpY2t5IENTUyBjbGFzcyBzZXQgYnkgdGhlIGBDZGtUYWJsZWAuICovXG4gIHByb3RlY3RlZCBvdmVycmlkZSBzdGlja3lDc3NDbGFzcyA9ICdtYXQtbWRjLXRhYmxlLXN0aWNreSc7XG5cbiAgLyoqIE92ZXJyaWRlcyB0aGUgbmVlZCB0byBhZGQgcG9zaXRpb246IHN0aWNreSBvbiBldmVyeSBzdGlja3kgY2VsbCBlbGVtZW50IGluIGBDZGtUYWJsZWAuICovXG4gIHByb3RlY3RlZCBvdmVycmlkZSBuZWVkc1Bvc2l0aW9uU3RpY2t5T25FbGVtZW50ID0gZmFsc2U7XG5cbiAgb3ZlcnJpZGUgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIC8vIEFmdGVyIG5nT25Jbml0LCB0aGUgYENka1RhYmxlYCBoYXMgY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgdGhlIHRhYmxlIHNlY3Rpb25zICh0aGVhZCwgdGJvZHksXG4gICAgLy8gdGZvb3QpLiBNREMgcmVxdWlyZXMgdGhlIGBtZGMtZGF0YS10YWJsZV9fY29udGVudGAgY2xhc3MgdG8gYmUgYWRkZWQgdG8gdGhlIGJvZHkuIE5vdGUgdGhhdFxuICAgIC8vIHRoaXMgb25seSBhcHBsaWVzIHRvIG5hdGl2ZSB0YWJsZXMsIGJlY2F1c2Ugd2UgZG9uJ3Qgd3JhcCB0aGUgY29udGVudCBvZiBmbGV4Ym94LWJhc2VkIG9uZXMuXG4gICAgaWYgKHRoaXMuX2lzTmF0aXZlSHRtbFRhYmxlKSB7XG4gICAgICBjb25zdCB0Ym9keSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuICAgICAgdGJvZHkuY2xhc3NMaXN0LmFkZCgnbWRjLWRhdGEtdGFibGVfX2NvbnRlbnQnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==