/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatListBase } from './list-base';
export class MatActionList extends MatListBase {
    constructor() {
        super(...arguments);
        // An navigation list is considered interactive, but does not extend the interactive list
        // base class. We do this because as per MDC, items of interactive lists are only reachable
        // through keyboard shortcuts. We want all items for the navigation list to be reachable
        // through tab key as we do not intend to provide any special accessibility treatment. The
        // accessibility treatment depends on how the end-user will interact with it.
        this._isNonInteractive = false;
    }
}
MatActionList.decorators = [
    { type: Component, args: [{
                selector: 'mat-action-list',
                exportAs: 'matActionList',
                template: '<ng-content></ng-content>',
                host: {
                    'class': 'mat-mdc-action-list mat-mdc-list-base mdc--list',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    { provide: MatListBase, useExisting: MatActionList },
                ],
                styles: ["@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-list-divider::after{content:\"\";display:block;border-bottom-width:1px;border-bottom-style:solid}}.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-list-item.mdc-list-item--selected:focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text,.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:24px;height:24px}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image .mdc-list-item__start{width:56px;height:56px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{width:100px;height:56px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch .mdc-list-item__start{width:36px;height:20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:24px;height:24px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch .mdc-list-item__end{width:36px;height:20px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-list-divider{height:1px;padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}.mat-mdc-list-base{display:block}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";opacity:0}.mat-mdc-list-non-interactive .mdc-list-item{cursor:default}.mat-mdc-list-item>.mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item.mdc-list-item--with-trailing-meta>.mdc-list-item__end:empty{display:none}\n"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1saXN0L2FjdGlvbi1saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQWdCeEMsTUFBTSxPQUFPLGFBQWMsU0FBUSxXQUFXO0lBZDlDOztRQWVFLHlGQUF5RjtRQUN6RiwyRkFBMkY7UUFDM0Ysd0ZBQXdGO1FBQ3hGLDBGQUEwRjtRQUMxRiw2RUFBNkU7UUFDcEUsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLENBQUM7OztZQXJCQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsaURBQWlEO2lCQUMzRDtnQkFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRTtvQkFDVCxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBQztpQkFDbkQ7O2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdExpc3RCYXNlfSBmcm9tICcuL2xpc3QtYmFzZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1hY3Rpb24tbGlzdCcsXG4gIGV4cG9ydEFzOiAnbWF0QWN0aW9uTGlzdCcsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1hY3Rpb24tbGlzdCBtYXQtbWRjLWxpc3QtYmFzZSBtZGMtLWxpc3QnLFxuICB9LFxuICBzdHlsZVVybHM6IFsnbGlzdC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBNYXRMaXN0QmFzZSwgdXNlRXhpc3Rpbmc6IE1hdEFjdGlvbkxpc3R9LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdEFjdGlvbkxpc3QgZXh0ZW5kcyBNYXRMaXN0QmFzZSB7XG4gIC8vIEFuIG5hdmlnYXRpb24gbGlzdCBpcyBjb25zaWRlcmVkIGludGVyYWN0aXZlLCBidXQgZG9lcyBub3QgZXh0ZW5kIHRoZSBpbnRlcmFjdGl2ZSBsaXN0XG4gIC8vIGJhc2UgY2xhc3MuIFdlIGRvIHRoaXMgYmVjYXVzZSBhcyBwZXIgTURDLCBpdGVtcyBvZiBpbnRlcmFjdGl2ZSBsaXN0cyBhcmUgb25seSByZWFjaGFibGVcbiAgLy8gdGhyb3VnaCBrZXlib2FyZCBzaG9ydGN1dHMuIFdlIHdhbnQgYWxsIGl0ZW1zIGZvciB0aGUgbmF2aWdhdGlvbiBsaXN0IHRvIGJlIHJlYWNoYWJsZVxuICAvLyB0aHJvdWdoIHRhYiBrZXkgYXMgd2UgZG8gbm90IGludGVuZCB0byBwcm92aWRlIGFueSBzcGVjaWFsIGFjY2Vzc2liaWxpdHkgdHJlYXRtZW50LiBUaGVcbiAgLy8gYWNjZXNzaWJpbGl0eSB0cmVhdG1lbnQgZGVwZW5kcyBvbiBob3cgdGhlIGVuZC11c2VyIHdpbGwgaW50ZXJhY3Qgd2l0aCBpdC5cbiAgb3ZlcnJpZGUgX2lzTm9uSW50ZXJhY3RpdmUgPSBmYWxzZTtcbn1cbiJdfQ==