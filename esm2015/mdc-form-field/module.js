/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatError } from './directives/error';
import { MatFormFieldFloatingLabel } from './directives/floating-label';
import { MatHint } from './directives/hint';
import { MatLabel } from './directives/label';
import { MatFormFieldLineRipple } from './directives/line-ripple';
import { MatFormFieldNotchedOutline } from './directives/notched-outline';
import { MatPrefix } from './directives/prefix';
import { MatSuffix } from './directives/suffix';
import { MatFormField } from './form-field';
let MatFormFieldModule = /** @class */ (() => {
    let MatFormFieldModule = class MatFormFieldModule {
    };
    MatFormFieldModule = __decorate([
        NgModule({
            imports: [
                MatCommonModule,
                CommonModule,
                ObserversModule
            ],
            exports: [
                MatFormField,
                MatLabel,
                MatHint,
                MatError,
                MatPrefix,
                MatSuffix,
                MatCommonModule
            ],
            declarations: [
                MatFormField,
                MatLabel,
                MatError,
                MatHint,
                MatPrefix,
                MatSuffix,
                MatFormFieldFloatingLabel,
                MatFormFieldNotchedOutline,
                MatFormFieldLineRipple
            ],
        })
    ], MatFormFieldModule);
    return MatFormFieldModule;
})();
export { MatFormFieldModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBNkIxQztJQUFBLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0tBQzlCLENBQUE7SUFEWSxrQkFBa0I7UUEzQjlCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxlQUFlO2dCQUNmLFlBQVk7Z0JBQ1osZUFBZTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLFFBQVE7Z0JBQ1IsT0FBTztnQkFDUCxRQUFRO2dCQUNSLFNBQVM7Z0JBQ1QsU0FBUztnQkFDVCxlQUFlO2FBQ2hCO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLFlBQVk7Z0JBQ1osUUFBUTtnQkFDUixRQUFRO2dCQUNSLE9BQU87Z0JBQ1AsU0FBUztnQkFDVCxTQUFTO2dCQUNULHlCQUF5QjtnQkFDekIsMEJBQTBCO2dCQUMxQixzQkFBc0I7YUFDdkI7U0FDRixDQUFDO09BQ1csa0JBQWtCLENBQzlCO0lBQUQseUJBQUM7S0FBQTtTQURZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge09ic2VydmVyc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRFcnJvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL2Vycm9yJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkRmxvYXRpbmdMYWJlbH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Zsb2F0aW5nLWxhYmVsJztcbmltcG9ydCB7TWF0SGludH0gZnJvbSAnLi9kaXJlY3RpdmVzL2hpbnQnO1xuaW1wb3J0IHtNYXRMYWJlbH0gZnJvbSAnLi9kaXJlY3RpdmVzL2xhYmVsJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkTGluZVJpcHBsZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2xpbmUtcmlwcGxlJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmV9IGZyb20gJy4vZGlyZWN0aXZlcy9ub3RjaGVkLW91dGxpbmUnO1xuaW1wb3J0IHtNYXRQcmVmaXh9IGZyb20gJy4vZGlyZWN0aXZlcy9wcmVmaXgnO1xuaW1wb3J0IHtNYXRTdWZmaXh9IGZyb20gJy4vZGlyZWN0aXZlcy9zdWZmaXgnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGR9IGZyb20gJy4vZm9ybS1maWVsZCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE9ic2VydmVyc01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0Rm9ybUZpZWxkLFxuICAgIE1hdExhYmVsLFxuICAgIE1hdEhpbnQsXG4gICAgTWF0RXJyb3IsXG4gICAgTWF0UHJlZml4LFxuICAgIE1hdFN1ZmZpeCxcbiAgICBNYXRDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0Rm9ybUZpZWxkLFxuICAgIE1hdExhYmVsLFxuICAgIE1hdEVycm9yLFxuICAgIE1hdEhpbnQsXG4gICAgTWF0UHJlZml4LFxuICAgIE1hdFN1ZmZpeCxcbiAgICBNYXRGb3JtRmllbGRGbG9hdGluZ0xhYmVsLFxuICAgIE1hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lLFxuICAgIE1hdEZvcm1GaWVsZExpbmVSaXBwbGVcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9ybUZpZWxkTW9kdWxlIHtcbn1cbiJdfQ==