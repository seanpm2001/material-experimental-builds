/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export * from './tooltip';
export * from './tooltip-animations';
export * from './module';
export { getMatTooltipInvalidPositionError, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY, MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY, SCROLL_THROTTLE_MS, TOOLTIP_PANEL_CLASS, MAT_TOOLTIP_SCROLL_STRATEGY, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRvb2x0aXAvcHVibGljLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxjQUFjLFdBQVcsQ0FBQztBQUMxQixjQUFjLHNCQUFzQixDQUFDO0FBQ3JDLGNBQWMsVUFBVSxDQUFDO0FBRXpCLE9BQU8sRUFDTCxpQ0FBaUMsRUFDakMsbUNBQW1DLEVBQ25DLG1DQUFtQyxFQUluQyxrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLDJCQUEyQixFQUMzQiw0Q0FBNEMsRUFFNUMsMkJBQTJCLEVBQzVCLE1BQU0sMkJBQTJCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi90b29sdGlwJztcbmV4cG9ydCAqIGZyb20gJy4vdG9vbHRpcC1hbmltYXRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kdWxlJztcblxuZXhwb3J0IHtcbiAgZ2V0TWF0VG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yLFxuICBNQVRfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWSxcbiAgTUFUX1RPT0xUSVBfREVGQVVMVF9PUFRJT05TX0ZBQ1RPUlksXG4gIFRvb2x0aXBQb3NpdGlvbixcbiAgVG9vbHRpcFRvdWNoR2VzdHVyZXMsXG4gIFRvb2x0aXBWaXNpYmlsaXR5LFxuICBTQ1JPTExfVEhST1RUTEVfTVMsXG4gIFRPT0xUSVBfUEFORUxfQ0xBU1MsXG4gIE1BVF9UT09MVElQX1NDUk9MTF9TVFJBVEVHWSxcbiAgTUFUX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIsXG4gIE1hdFRvb2x0aXBEZWZhdWx0T3B0aW9ucyxcbiAgTUFUX1RPT0xUSVBfREVGQVVMVF9PUFRJT05TXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuIl19