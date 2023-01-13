# Boiled Page

Boiled Page is a lightweight, responsive and extensible frontend framework for any type of websites or web applications. The core package contains only the essentials, and it is easily extensible with third-party or your own packages.

## Install

First you need to install Python and Dart Sass. Boiled Page uses a Python script for compiling CSS and combining JavaScripts:

- Navigate to the root directory of Boiled Page.
- Run `pip install -r requirements.txt` to install all dependencies.
- Run `python build.py` to compile CSS and combine JavaScripts given in `build.py`.
- Compiled CSS file is located in `/assets/css` directory.
- Combined JavaScript file is located in `/assets/js` directory.

## Asset structure

### Styles

`/assets/css` directory contains all styles written in SCSS. Styles are separated by the following subdirectories:

- `/base` directory contains all prerequisites for styles (browser inconsistency reduction, font loading, etc...)
- `/components` directory contains modular and repeatable styles which are applied by a CSS class name. Each component has a prototype class that describes the default look. The prototype can be extended with modifier classes. The prefix of a modifier is formed as component class name plus two dashes (`component--modifier`).
- `/singletons` directory contains styles which are used once in a page. The rules are also applied by a class name. A singleton can be extended the same way as a component.
- `/typography` directory contains styles which describes the default look of HTML elements. Styles are applied by tag name, but they can be extended with classes.
- `/utilities` directory contains SCSS variables, mixins and functions.

### JavaScripts

`/assets/js` directory contains all JavaScripts. To minimize HTTP requests, you can combine multiple scripts together by giving their path in `build.js`. The script will create a combined and minimized script from given files. By default, `app.js` is intended to manage the main process.

### Fonts

`/assets/fonts` directory contains all fonts which are hosted by your own server instead of a CDN. Self-hosted fonts should be imported in `/assets/css/base/_fonts.scss` file.

### Images

`/assets/images` directory contains all images related to the design. Mixing design and content related images are not recommended.

## Breakpoints

Breakpoints are defined as an SCSS variable in `assets/css/utilities/_variables.scss` file. In case you need to detect breakpoint changes in JavaScript, they are also defined in `assets/js/app.js` file as an object.

Breakpoint name | Media query
--------------- | -----------
large | (max-width: 82em)
medium | (max-width: 62em)
small | (max-width: 47em)
xsmall | (max-width: 32em)

If you need to write breakpoint specific CSS rules, use the `breakpoint` mixin with breakpoint name as a parameter.

```scss
@include breakpoint('medium') {
  // Medium specific rules
}
```

## Core components

### Grid

A flexbox based responsive grid system with 6 columns by default (you can change the number of columns with `$grid-columns` SCSS variable). You can also set breakpoint specific column width for a more responsive layout.

#### Classes

Class name | Description | Example
---------- | ----------- | -------
`grid` | Applies a grid system. | `<div class="grid"></div>`
`grid--uniform` | Sets the same vertical and horizontal gutter between grid columns and rows. Width is depended by the gutter you set. | `<div class="grid grid--uniform"></div>`
`grid--gutter` | Sets gutter between grid columns. | `<div class="grid grid--gutter"></div>`
`grid--gutter--half` | Sets half-width gutter between grid columns. | `<div class="grid grid--gutter grid--gutter--half"></div>`
`grid--gutter--quarter` | Sets quarter-width gutter between grid columns. | `<div class="grid grid--gutter grid--gutter--quarter"></div>`
`grid--gutter--double` | Sets double-width gutter between grid columns. | `<div class="grid grid--gutter grid--gutter--double"></div>`
`grid--top` | Aligns grid columns vertically to the top of grid wrapper. | `<div class="grid grid--top"></div>`
`grid--middle` | Aligns grid columns vertically to the middle of grid wrapper. | `<div class="grid grid--middle"></div>`
`grid--bottom` | Aligns grid columns vertically to the bottom of grid wrapper. | `<div class="grid grid--bottom"></div>`
`grid--left` | Aligns grid columns horizontally to the left of grid wrapper (useful when columns do not fill all available space). | `<div class="grid grid--left"></div>`
`grid--center` | Aligns grid columns horizontally to the center of grid wrapper (useful when columns do not fill all available space). | `<div class="grid grid--center"></div>`
`grid--right` | Aligns grid columns horizontally to the right of grid wrapper (useful when columns do not fill all available space). | `<div class="grid grid--right"></div>`
`grid--between` | Grid columns are evenly distributed within grid wrapper. First column is on the start line, last one on the end line (useful when columns do not fill all available space). | `<div class="grid grid--between"></div>`
`grid--around` | Grid columns are evenly distributed within grid wrapper. Columns have a half-size space on either end (useful when columns do not fill all available space). | `<div class="grid grid--around"></div>`
`grid-col` | Applies a grid column inside grid. By default, grid column takes only the space required by inner HTML. | `<div class="grid-col"></div>`
`grid-col--full` | Modifies grid column to have full width. | `<div class="grid-col grid-col--full"></div>`
`grid-col--fit` | Modifies grid column to fill the rest available space. | `<div class="grid-col grid-col--fit"></div>`
`grid-col--1of2` | Modifies grid column to have 1/2 width. | `<div class="grid-col grid-col--1of2"></div>`
`grid-col--1of3` | Modifies grid column to have 1/3 width. | `<div class="grid-col grid-col--1of3"></div>`
`grid-col--1of4` | Modifies grid column to have 1/4 width. | `<div class="grid-col grid-col--1of4"></div>`
`grid-col--1of5` | Modifies grid column to have 1/5 width. | `<div class="grid-col grid-col--1of5"></div>`
`grid-col--1of6` | Modifies grid column to have 1/6 width. | `<div class="grid-col grid-col--1of6"></div>`
`grid-col--important` | Important grid columns appears first in the visual order | `<div class="grid-col grid-col--important"></div>`

Grid column modifiers can be applied to a specific breakpoint by adding breakpoint name as a modifier after class name (`grid-col--small--1of2`).

#### Examples

##### Example 1

The following example shows a two-column grid by default, but on small screens columns become full width.

```html
<div class="grid">
  <div class="grid-col grid-col--1of2 grid-col--small--full">Column 1</div>
  <div class="grid-col grid-col--1of2 grid-col--small--full">Column 2</div>
</div>
```

##### Example 2

The following example shows a grid with gutter. The grid contains a 1/3 width and a fitted (2/3 width) column which becomes full on small screens.

```html
<div class="grid grid--gutter">
  <div class="grid-col grid-col--1of3 grid-col--small--full">Column 1</div>
  <div class="grid-col grid-col--fit grid-col--small--full">Column 2</div>
</div>
```

### Section

Section represents a generic section of a document or application. It is intended separate different group of contents from each other. A section should include a heading (h1-h6 element) for document outlining.

#### Classes

Class name | Description | Example
---------- | ----------- | -------
`section` | Applies a section. | `<div class="section"></div>`

#### Examples

##### Example 1

The following example shows a simple section.

```html
<div class="section">
</div>
```

#### Extension ideas

##### Large section

```scss
/* Section component extensions */
section.section {

  // Large section
  &.section--large {
    padding: ($section-padding * 1.5) 0 ($section-padding * 1.5 - $element-margin) 0;
  }
}
```

##### Small section

```scss
/* Section component extensions */
section.section {

  // Small section
  &.section--small {
    padding: ($section-padding * 0.625) 0 (($section-padding * 0.625) - $element-margin) 0;
  }
}
```

##### Section with half of viewport's height

```scss
/* Section component extensions */
section.section {

  // Section with half of viewport's height
  &.section--half-vh {
    min-height: 50vh;
  }
}
```

##### Section with viewport's height

```scss
/* Section component extensions */
section.section {

  // Section with viewport's height
  &.section--full-vh {
    min-height: 100vh;
  }
}
```

##### Scheme colored section

Add `generate-section` to each scheme in SCSS variables with the value of true or false. Then you can use sections with the background colors of enabled schemes.

```scss
/* Section component extensions */
section.section {

  // Scheme colored sections
  @each $scheme in map-keys($schemes) {
    @if (map-val($schemes, $scheme, generate-section)) {
      &.section--#{$scheme} {
        background-color: map-val($schemes, $scheme, bg-color);

        &.section--#{$scheme}--dark {
          background-color: darken(map-val($schemes, $scheme, bg-color), 5);
        }

        &.section--#{$scheme}--light {
          background-color: lighten(map-val($schemes, $scheme, bg-color), 5);
        }
      }
    }
  }
}
```

### Container

Container is a responsive wrapper with maximum width. It is intended to keep layout readable and structured.

#### Classes

Class name | Description | Example
---------- | ----------- | -------
`container` | Applies a container. | `<div class="container"></div>`
`container--narrow` | Makes container narrower. | `<div class="container container--narrow"></div>`
`container--half` | Makes container half-size. | `<div class="container container--half"></div>`

#### Examples

##### Example 1

The following example shows a container with sample content in a section.

```html
<div class="section">
  <div class="container">
   <p>Lorem ipsum dolor amet...</p>
  </div>
</div>
```

### Box

Box is a bordered wrapper. It is intended to separate inner content.

#### Classes

Class name | Description | Example
---------- | ----------- | -------
`box` | Applies a box. | `<div class="box"></div>`

#### Examples

##### Example 1

The following example shows 3 grid columns in a section. Each column contains a box with a heading and a paragraph.  

```html
<div class="section">
  <div class="container">
    <div class="grid grid--gutter">
      <div class="grid-col grid-col--1of3 grid-col--small--full">
        <div class="box">
        <h4>Lorem ipsum dolor</h4>
        <p>Maiores quaerat exercitationem provident et tempora.</p>
        </div>
      </div>
      <div class="grid-col grid-col--1of3 grid-col--small--full">
        <div class="box">
        <h4>Lorem ipsum dolor</h4>
        <p>Maiores quaerat exercitationem provident et tempora.</p>
        </div>
      </div>
      <div class="grid-col grid-col--1of3 grid-col--small--full">
        <div class="box">
        <h4>Lorem ipsum dolor</h4>
        <p>Maiores quaerat exercitationem provident et tempora.</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### Extension ideas

##### Borderless box

```scss
/* Box component extensions */
div.box {

  // Borderless box
  &.box--special {
    padding: 0;
    border: 0;
    border-radius: 0;
    background-color: transparent;
  }
}
```

##### Scheme colored box

Add `generate-box` to each scheme in SCSS variables with the value of true or false. Then you can use boxes with the background colors of enabled schemes.

```scss
/* Box component extensions */
div.box {

  // Scheme specific boxes
  @each $scheme in map-keys($schemes) {
    @if (map-val($schemes, $scheme, generate-box)) {
      &.box--#{$scheme} {
        border: 0;
        background-color: map-val($schemes, $scheme, bg-color);

        &.box--#{$scheme}--dark {
          background-color: darken(map-val($schemes, $scheme, bg-color), 5);
        }

        &.box--#{$scheme}--light {
          background-color: lighten(map-val($schemes, $scheme, bg-color), 5);
        }
      }
    }
  }
}
```

### Header

Header is a wrapper of a subheading (p element) followed by a heading (h1-h6 element). Font size of the former one depends on the heading level of the latter one.

#### Classes

Class name | Description | Example
---------- | ----------- | -------
`header` | Applies a header. | `<div class="header"></div>`

#### Examples

##### Example 1

The following example shows a simple header with second-level heading.

```html
<header class="header">
  <h2>Lorem ipsum dolor</h2>
  <p>Nunc lacinia ante nunc ac lobortis</p>
</header>
```

##### Example 2

The following example shows a header with second-level heading that looks like a fourth-level one.

```html
<header class="header">
  <h2 class="h4">Lorem ipsum dolor</h2>
  <p>Nunc lacinia ante nunc ac lobortis</p>
</header>
```

#### Extension ideas

##### Section header

```scss
/* Header component extensions */
header.header {

  // Header for sections
  &.header--section {
    margin-bottom: $element-margin;
    text-align: center;
  }
}
```

## Scheme colors

You can define different color schemes in `$schemes` SCSS variable. A scheme can be used to generate components in different colors (as you could seen in some previous extensions). When you create for example a section with a scheme's background color, all inside element's foreground color should also follow the scheme. You can easily do it by adding `scheme--[scheme-name]` class to any element. Every components and HTML elements, which are prepared for this function, will get the sufficient foreground colors defined in the scheme.

## Helpers classes

Class name | Description | Example
---------- | ----------- | -------
`float-left` | Float element left. | `<div class="float-left"></div>`
`float-right` | Float element right. | `<div class="float-right"></div>`
`is-visually-hidden` | Visually hide element (screen readers will still read inner content). | `<div class="is-visually-hidden"></div>`
`is-hidden` | Hide element (screen readers will also skip inner content). | `<div class="is-hidden"></div>`
`truncate` | Truncate inner text. | `<div class="truncate"></div>`
`top-element-margin` | Add top margin with the value of `$element-margin` SCSS variable. | `<div class="top-element-margin"></div>`
`bottom-element-margin` | Add bottom margin with the value of `$element-margin` SCSS variable. | `<div class="bottom-element-margin"></div>`
`top-block-margin` | Add top margin with the value of `$block-margin` SCSS variable. | `<div class="top-block-margin"></div>`
`bottom-block-margin` | Add bottom margin with the value of `$block-margin` SCSS variable. | `<div class="bottom-block-margin"></div>`
`top-gutter-margin` | Add top margin with the value of `$grid-gutter` SCSS variable. | `<div class="top-gutter-margin"></div>`
`bottom-gutter-margin` | Add bottom margin with the value of `$grid-gutter` SCSS variable. | `<div class="bottom-gutter-margin"></div>`
`text-left` | Align text left. | `<div class="text-left"></div>`
`text-center` | Align text center. | `<div class="text-center"></div>`
`text-right` | Align text right. | `<div class="text-right"></div>`

## Browser support
Boiled Page supports all modern browsers. Internet Explorer is supported from version 11.

## License
Code released under the MIT Open Source license.
