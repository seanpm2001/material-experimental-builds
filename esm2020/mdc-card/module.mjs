/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material-experimental/mdc-core';
import { MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardLgImage, MatCardMdImage, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup, MatCardXlImage, } from './card';
import * as i0 from "@angular/core";
const CARD_DIRECTIVES = [
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardImage,
    MatCardLgImage,
    MatCardMdImage,
    MatCardSmImage,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatCardXlImage
];
export class MatCardModule {
}
MatCardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatCardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatCardModule, declarations: [MatCard,
        MatCardActions,
        MatCardAvatar,
        MatCardContent,
        MatCardFooter,
        MatCardHeader,
        MatCardImage,
        MatCardLgImage,
        MatCardMdImage,
        MatCardSmImage,
        MatCardSubtitle,
        MatCardTitle,
        MatCardTitleGroup,
        MatCardXlImage], imports: [MatCommonModule, CommonModule], exports: [MatCard,
        MatCardActions,
        MatCardAvatar,
        MatCardContent,
        MatCardFooter,
        MatCardHeader,
        MatCardImage,
        MatCardLgImage,
        MatCardMdImage,
        MatCardSmImage,
        MatCardSubtitle,
        MatCardTitle,
        MatCardTitleGroup,
        MatCardXlImage, MatCommonModule] });
MatCardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatCardModule, imports: [[MatCommonModule, CommonModule], MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule],
                    exports: [CARD_DIRECTIVES, MatCommonModule],
                    declarations: CARD_DIRECTIVES,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2FyZC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFDTCxPQUFPLEVBQ1AsY0FBYyxFQUNkLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLEVBQ1osY0FBYyxFQUNkLGNBQWMsRUFDZCxjQUFjLEVBQ2QsZUFBZSxFQUNmLFlBQVksRUFDWixpQkFBaUIsRUFDakIsY0FBYyxHQUNmLE1BQU0sUUFBUSxDQUFDOztBQUdoQixNQUFNLGVBQWUsR0FBRztJQUN0QixPQUFPO0lBQ1AsY0FBYztJQUNkLGFBQWE7SUFDYixjQUFjO0lBQ2QsYUFBYTtJQUNiLGFBQWE7SUFDYixZQUFZO0lBQ1osY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0lBQ2QsZUFBZTtJQUNmLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsY0FBYztDQUNmLENBQUM7QUFPRixNQUFNLE9BQU8sYUFBYTs7a0hBQWIsYUFBYTttSEFBYixhQUFhLGlCQXJCeEIsT0FBTztRQUNQLGNBQWM7UUFDZCxhQUFhO1FBQ2IsY0FBYztRQUNkLGFBQWE7UUFDYixhQUFhO1FBQ2IsWUFBWTtRQUNaLGNBQWM7UUFDZCxjQUFjO1FBQ2QsY0FBYztRQUNkLGVBQWU7UUFDZixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLGNBQWMsYUFJSixlQUFlLEVBQUUsWUFBWSxhQWpCdkMsT0FBTztRQUNQLGNBQWM7UUFDZCxhQUFhO1FBQ2IsY0FBYztRQUNkLGFBQWE7UUFDYixhQUFhO1FBQ2IsWUFBWTtRQUNaLGNBQWM7UUFDZCxjQUFjO1FBQ2QsY0FBYztRQUNkLGVBQWU7UUFDZixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLGNBQWMsRUFLYSxlQUFlO21IQUcvQixhQUFhLFlBSmYsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLEVBQ2IsZUFBZTttR0FHL0IsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDO29CQUN4QyxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO29CQUMzQyxZQUFZLEVBQUUsZUFBZTtpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtcbiAgTWF0Q2FyZCxcbiAgTWF0Q2FyZEFjdGlvbnMsXG4gIE1hdENhcmRBdmF0YXIsXG4gIE1hdENhcmRDb250ZW50LFxuICBNYXRDYXJkRm9vdGVyLFxuICBNYXRDYXJkSGVhZGVyLFxuICBNYXRDYXJkSW1hZ2UsXG4gIE1hdENhcmRMZ0ltYWdlLFxuICBNYXRDYXJkTWRJbWFnZSxcbiAgTWF0Q2FyZFNtSW1hZ2UsXG4gIE1hdENhcmRTdWJ0aXRsZSxcbiAgTWF0Q2FyZFRpdGxlLFxuICBNYXRDYXJkVGl0bGVHcm91cCxcbiAgTWF0Q2FyZFhsSW1hZ2UsXG59IGZyb20gJy4vY2FyZCc7XG5cblxuY29uc3QgQ0FSRF9ESVJFQ1RJVkVTID0gW1xuICBNYXRDYXJkLFxuICBNYXRDYXJkQWN0aW9ucyxcbiAgTWF0Q2FyZEF2YXRhcixcbiAgTWF0Q2FyZENvbnRlbnQsXG4gIE1hdENhcmRGb290ZXIsXG4gIE1hdENhcmRIZWFkZXIsXG4gIE1hdENhcmRJbWFnZSxcbiAgTWF0Q2FyZExnSW1hZ2UsXG4gIE1hdENhcmRNZEltYWdlLFxuICBNYXRDYXJkU21JbWFnZSxcbiAgTWF0Q2FyZFN1YnRpdGxlLFxuICBNYXRDYXJkVGl0bGUsXG4gIE1hdENhcmRUaXRsZUdyb3VwLFxuICBNYXRDYXJkWGxJbWFnZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW0NBUkRfRElSRUNUSVZFUywgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBDQVJEX0RJUkVDVElWRVMsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcmRNb2R1bGUge1xufVxuIl19