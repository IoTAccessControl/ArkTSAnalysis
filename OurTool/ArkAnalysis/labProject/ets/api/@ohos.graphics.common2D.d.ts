/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit ArkGraphics2D
 */
/**
 * The date structure that provides the basis for graphics.
 *
 * @namespace common2D
 * @syscap SystemCapability.Graphics.Drawing
 * @since 11
 */
/**
 * The date structure that provides the basis for graphics.
 *
 * @namespace common2D
 * @syscap SystemCapability.Graphics.Drawing
 * @crossplatform
 * @since 20
 */
declare namespace common2D {
    /**
     * Describes a color in ARGB format.
     * @typedef Color
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    /**
     * Describes a color in ARGB format.
     * @typedef Color
     * @syscap SystemCapability.Graphics.Drawing
     * @crossplatform
     * @since 20
     */
    interface Color {
        /**
         * Alpha component of the color. The value is an integer ranging from 0 to 255.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        /**
         * Alpha component of the color. The value is an integer ranging from 0 to 255.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        alpha: number;
        /**
         * Red component of the color. The value is an integer ranging from 0 to 255.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        /**
         * Red component of the color. The value is an integer ranging from 0 to 255.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        red: number;
        /**
         * Green component of the color. The value is an integer ranging from 0 to 255.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        /**
         * Green component of the color. The value is an integer ranging from 0 to 255.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        green: number;
        /**
         * Blue component of the color. The value is an integer ranging from 0 to 255.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        /**
         * Blue component of the color. The value is an integer ranging from 0 to 255.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        blue: number;
    }
    /**
     * Describes a rectangle, which can be defined by two coordinate points: upper left corner point and lower right corner point.
     * @typedef Rect
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    /**
     * Describes a rectangle, which can be defined by two coordinate points: upper left corner point and lower right corner point.
     * @typedef Rect
     * @syscap SystemCapability.Graphics.Drawing
     * @crossplatform
     * @since 20
     */
    interface Rect {
        /**
         * X coordinate of the upper left corner of the rectangle. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        /**
         * X coordinate of the upper left corner of the rectangle. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        left: number;
        /**
         * Y coordinate of the upper left corner of the rectangle. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        /**
         * Y coordinate of the upper left corner of the rectangle. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        top: number;
        /**
         * X coordinate of the lower right corner of the rectangle. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        /**
         * X coordinate of the lower right corner of the rectangle. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        right: number;
        /**
         * Y coordinate of the lower right corner of the rectangle. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        /**
         * Y coordinate of the lower right corner of the rectangle. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        bottom: number;
    }
    /**
     * Describes a coordinate point.
     * @typedef Point
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    /**
     * Describes a coordinate point.
     * @typedef Point
     * @syscap SystemCapability.Graphics.Drawing
     * @crossplatform
     * @since 20
     */
    interface Point {
        /**
         * Horizontal coordinate. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        /**
         * Horizontal coordinate. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        x: number;
        /**
         * Vertical coordinate. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        /**
         * Vertical coordinate. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        y: number;
    }
    /**
     * Describes a 3D coordinate point.
     *
     * @typedef Point3d
     * @extends Point
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    /**
     * Describes a 3D coordinate point.
     *
     * @typedef Point3d
     * @extends Point
     * @syscap SystemCapability.Graphics.Drawing
     * @crossplatform
     * @since 20
     */
    interface Point3d extends Point {
        /**
         * Z-axis coordinate. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        /**
         * Z-axis coordinate. The value is a floating point number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        z: number;
    }
    /**
     * Provide a color with an ARGB structure described by floating point numbers.
     * @typedef Color4f
     * @syscap SystemCapability.Graphics.Drawing
     * @crossplatform
     * @since 20
     */
    interface Color4f {
        /**
         * Alpha component of color, represented as a floating point number between 0 and 1.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        alpha: number;
        /**
         * Red component of color, represented as a floating point number between 0 and 1.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        red: number;
        /**
         * Green component of color, represented as a floating point number between 0 and 1.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        green: number;
        /**
         * Blue component of color, represented as a floating point number between 0 and 1.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @crossplatform
         * @since 20
         */
        blue: number;
    }
}
export default common2D;
