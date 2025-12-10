/*
* Copyright (C) 2023-2025 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @file
 * @kit ArkUI
 */
/**
 * Declare enum IconType
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare enum IconType
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
/**
 * Declare enum IconType
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20
 */
export declare enum IconType {
    /**
     * Badge type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Badge type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Badge type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    BADGE = 1,
    /**
     * Normal icon type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Normal icon type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Normal icon type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    NORMAL_ICON = 2,
    /**
     * System icon type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * System icon type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * System icon type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    SYSTEM_ICON = 3,
    /**
     * HeadSculpture type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * HeadSculpture type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * HeadSculpture type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    HEAD_SCULPTURE = 4,
    /**
     * App icon type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * App icon type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * App icon type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    APP_ICON = 5,
    /**
     * Preview type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Preview type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Preview type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    PREVIEW = 6,
    /**
     * Longitudinal type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Longitudinal type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Longitudinal type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    LONGITUDINAL = 7,
    /**
     * Vertical type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Vertical type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Vertical type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    VERTICAL = 8
}
/**
 * Declare type OperateIcon
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare type OperateIcon
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
/**
 * Declare type OperateIcon
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20
 */
export declare class OperateIcon {
    /**
     * The content of text or the address of icon.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The content of text or the address of icon.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * The content of text or the address of icon.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    value: ResourceStr;
    /**
     * The content of text or the address of symbol.
     * @type { ?SymbolGlyphModifier }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    /**
     * The content of text or the address of symbol.
     * @type { ?SymbolGlyphModifier }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    symbolStyle?: SymbolGlyphModifier;
    /**
     * Callback function when operate the icon.
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Callback function when operate the icon.
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Callback function when operate the icon.
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    action?: () => void;
    /**
     * The accessibilityText of the icon.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    /**
     * The accessibilityText of the icon.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    accessibilityText?: ResourceStr;
    /**
     * The accessibilityDescription of the icon.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    /**
     * The accessibilityDescription of the icon.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    accessibilityDescription?: ResourceStr;
    /**
     * The accessibilityLevel of the icon.
     *
     * @type { ?string }
     * @default "auto"
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    /**
     * The accessibilityLevel of the icon.
     *
     * @type { ?string }
     * @default "auto"
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    accessibilityLevel?: string;
}
/**
 * Declare type OperateCheck
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare type OperateCheck
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
/**
 * Declare type OperateCheck
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20
 */
export declare class OperateCheck {
    /**
     * Whether is checked on default.
     * @type { ?boolean }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Whether is checked on default.
     * @type { ?boolean }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Whether is checked on default.
     * @type { ?boolean }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    isCheck?: boolean;
    /**
     * Callback function when operate the checkbox/switch/radio.
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Callback function when operate the checkbox/switch/radio.
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Callback function when operate the checkbox/switch/radio.
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    onChange?: (value: boolean) => void;
    /**
     * The accessibilityText of the checkbox/switch/radio.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    /**
     * The accessibilityText of the checkbox/switch/radio.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    accessibilityText?: ResourceStr;
    /**
     * The accessibilityDescription of the checkbox/switch/radio.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    /**
     * The accessibilityDescription of the checkbox/switch/radio.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    accessibilityDescription?: ResourceStr;
    /**
     * The accessibilityLevel of the checkbox/switch/radio.
     *
     * @type { ?string }
     * @default "auto"
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    /**
     * The accessibilityLevel of the checkbox/switch/radio.
     *
     * @type { ?string }
     * @default "auto"
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    accessibilityLevel?: string;
}
/**
 * Declare type OperateButton
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare type OperateButton
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
/**
 * Declare type OperateButton
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20
 */
export declare class OperateButton {
    /**
     * The text on the button.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The text on the button.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * The text on the button.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    text?: ResourceStr;
    /**
     * The accessibilityText of the button.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    /**
     * The accessibilityText of the button.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    accessibilityText?: ResourceStr;
    /**
     * The accessibilityDescription of the button.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    /**
     * The accessibilityDescription of the button.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    accessibilityDescription?: ResourceStr;
    /**
     * The accessibilityLevel of the button.
     *
     * @type { ?string }
     * @default "auto"
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    /**
     * The accessibilityLevel of the button.
     *
     * @type { ?string }
     * @default "auto"
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    accessibilityLevel?: string;
}
/**
 * Declare ContentItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare ContentItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
/**
 * Declare ContentItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20
 */
export declare class ContentItem {
    /**
     * The type of icon.
     * @type { ?IconType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The type of icon.
     * @type { ?IconType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * The type of icon.
     * @type { ?IconType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    iconStyle?: IconType;
    /**
     * Sets the icon.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the icon.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the icon.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    icon?: ResourceStr;
    /**
     * Sets the symbol.
     * @type { ?SymbolGlyphModifier }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    /**
     * Sets the symbol.
     * @type { ?SymbolGlyphModifier }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    symbolStyle?: SymbolGlyphModifier;
    /**
     * Sets the primaryText.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the primaryText.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the primaryText.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    primaryText?: ResourceStr;
    /**
     * Sets the secondaryText.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the secondaryText.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the secondaryText.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    secondaryText?: ResourceStr;
    /**
     * Sets the description.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the description.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the description.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    description?: ResourceStr;
}
/**
 * Declare OperateItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare OperateItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
/**
 * Declare OperateItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20
 */
export declare class OperateItem {
    /**
     * Sets the icon.
     * @type { ?OperateIcon }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the icon.
     * @type { ?OperateIcon }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the icon.
     * @type { ?OperateIcon }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    icon?: OperateIcon;
    /**
     * Sets the subIcon.
     * @type { ?OperateIcon }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the subIcon.
     * @type { ?OperateIcon }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the subIcon.
     * @type { ?OperateIcon }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    subIcon?: OperateIcon;
    /**
     * Sets the button.
     * @type { ?OperateButton }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the button.
     * @type { ?OperateButton }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the button.
     * @type { ?OperateButton }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    button?: OperateButton;
    /**
     * Sets the switch.
     * @type { ?OperateCheck }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the switch.
     * @type { ?OperateCheck }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the switch.
     * @type { ?OperateCheck }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    switch?: OperateCheck;
    /**
     * Sets the checkBox.
     * @type { ?OperateCheck }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the checkBox.
     * @type { ?OperateCheck }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the checkBox.
     * @type { ?OperateCheck }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    checkbox?: OperateCheck;
    /**
     * Sets the radio.
     * @type { ?OperateCheck }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the radio.
     * @type { ?OperateCheck }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the radio.
     * @type { ?OperateCheck }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    radio?: OperateCheck;
    /**
     * Sets the image.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the image.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the image.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    image?: ResourceStr;
    /**
     * Sets the symbolStyle.
     * @type { ?SymbolGlyphModifier }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18
     */
    /**
     * Sets the symbolStyle.
     * @type { ?SymbolGlyphModifier }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    symbolStyle?: SymbolGlyphModifier;
    /**
     * Sets the text.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the text.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the text.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    text?: ResourceStr;
    /**
     * Sets the arrow.
     * @type { ?OperateIcon }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the arrow.
     * @type { ?OperateIcon }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the arrow.
     * @type { ?OperateIcon }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    arrow?: OperateIcon;
}
/**
 * Declare ComposeListItem
 *
 * @struct { ComposeListItem }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare ComposeListItem
 *
 * @struct { ComposeListItem }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
/**
 * Declare ComposeListItem
 *
 * @struct { ComposeListItem }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20
 */
@Component
export declare struct ComposeListItem {
    /**
     * The ContentItem.
     * @type { ?ContentItem }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The ContentItem.
     * @type { ?ContentItem }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * The ContentItem.
     * @type { ?ContentItem }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    @Prop
    contentItem?: ContentItem;
    /**
     * The OperateItem.
     * @type { ?OperateItem }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The OperateItem.
     * @type { ?OperateItem }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * The OperateItem.
     * @type { ?OperateItem }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20
     */
    @Prop
    operateItem?: OperateItem;
}
