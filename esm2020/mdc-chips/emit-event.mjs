/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Emits a custom event from an element.
 * @param element Element from which to emit the event.
 * @param _document Document that the element is placed in.
 * @param eventName Name of the event.
 * @param data Data attached to the event.
 * @param shouldBubble Whether the event should bubble.
 */
export function emitCustomEvent(element, _document, eventName, data, shouldBubble) {
    let event;
    if (typeof CustomEvent === 'function') {
        event = new CustomEvent(eventName, { bubbles: shouldBubble, detail: data });
    }
    else {
        event = _document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, shouldBubble, false, data);
    }
    element.dispatchEvent(event);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1pdC1ldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2VtaXQtZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUg7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQzdCLE9BQW9CLEVBQ3BCLFNBQW1CLEVBQ25CLFNBQWlCLEVBQ2pCLElBQU8sRUFDUCxZQUFxQjtJQUVyQixJQUFJLEtBQXFCLENBQUM7SUFDMUIsSUFBSSxPQUFPLFdBQVcsS0FBSyxVQUFVLEVBQUU7UUFDckMsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFJLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7S0FDOUU7U0FBTTtRQUNMLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDN0Q7SUFFRCxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBFbWl0cyBhIGN1c3RvbSBldmVudCBmcm9tIGFuIGVsZW1lbnQuXG4gKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IGZyb20gd2hpY2ggdG8gZW1pdCB0aGUgZXZlbnQuXG4gKiBAcGFyYW0gX2RvY3VtZW50IERvY3VtZW50IHRoYXQgdGhlIGVsZW1lbnQgaXMgcGxhY2VkIGluLlxuICogQHBhcmFtIGV2ZW50TmFtZSBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSBkYXRhIERhdGEgYXR0YWNoZWQgdG8gdGhlIGV2ZW50LlxuICogQHBhcmFtIHNob3VsZEJ1YmJsZSBXaGV0aGVyIHRoZSBldmVudCBzaG91bGQgYnViYmxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50PFQ+KFxuICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgX2RvY3VtZW50OiBEb2N1bWVudCxcbiAgZXZlbnROYW1lOiBzdHJpbmcsXG4gIGRhdGE6IFQsXG4gIHNob3VsZEJ1YmJsZTogYm9vbGVhbixcbik6IHZvaWQge1xuICBsZXQgZXZlbnQ6IEN1c3RvbUV2ZW50PFQ+O1xuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQ8VD4oZXZlbnROYW1lLCB7YnViYmxlczogc2hvdWxkQnViYmxlLCBkZXRhaWw6IGRhdGF9KTtcbiAgfSBlbHNlIHtcbiAgICBldmVudCA9IF9kb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQoZXZlbnROYW1lLCBzaG91bGRCdWJibGUsIGZhbHNlLCBkYXRhKTtcbiAgfVxuXG4gIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG59XG4iXX0=