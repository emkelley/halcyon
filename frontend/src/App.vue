<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap");
@import "~bulma/sass/utilities/_all";
* {
  font-family: "Inter", sans-serif;
}

#app {
  background: $primary;
  min-height: 100vh;
  padding-bottom: 10rem;
}
// Import Bulma's core

// Set your colors
$primary-invert: findColorInvert($primary);
$primary-light: findLightColor($primary);
$primary-dark: findDarkColor($primary);
$secondary-light: findLightColor($secondary);
$secondary-dark: findDarkColor($secondary);
$secondary-invert: findColorInvert($secondary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$border: $secondary;
$label-color: ghostwhite;
$label-weight: 400;

$input-radius: 999px;
$input-color: ghostwhite;
$input-background-color: darken($primary, 5);
$input-border-color: hsl(339, 100%, 20%);
$input-hover-border-color: $secondary;
$input-focus-border-color: $secondary;

$table-color: ghostwhite;
$table-background-color: darken($primary, 5);
$table-row-hover-background-color: darken($primary, 10);
$table-row-active-color: $secondary;
$table-head-cell-color: $secondary;
// Lists and maps
$custom-colors: null !default;
$custom-shades: null !default;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: mergeColorMaps(
  (
    "white": (
      $white,
      $black,
    ),
    "black": (
      $black,
      $white,
    ),
    "light": (
      $light,
      $light-invert,
    ),
    "dark": (
      $dark,
      $dark-invert,
    ),
    "primary": (
      $primary,
      $primary-invert,
      $primary-light,
      $primary-dark,
    ),
    "secondary": (
      $secondary,
      $secondary-invert,
      $secondary-light,
      $secondary-dark,
    ),
    "link": (
      $link,
      $link-invert,
      $link-light,
      $link-dark,
    ),
    "info": (
      $info,
      $info-invert,
      $info-light,
      $info-dark,
    ),
    "success": (
      $success,
      $success-invert,
      $success-light,
      $success-dark,
    ),
    "warning": (
      $warning,
      $warning-invert,
      $warning-light,
      $warning-dark,
    ),
    "danger": (
      $danger,
      $danger-invert,
      $danger-light,
      $danger-dark,
    ),
  ),
  $custom-colors
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
.b-table .table th.is-current-sort {
  border-color: $secondary;
}
.fa-angle-right,
.fa-angle-down {
  color: red;
}
.title,
.subtitle,
.heading {
  color: ghostwhite;
}
</style>
