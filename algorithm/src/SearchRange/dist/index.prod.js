"use strict";function _default(e,n){if(!e||!e.length)return[-1,-1];var t=findIndex(e,n,!0);return t===e.length||e[t]!==n?[-1,-1]:[t,findIndex(e,n,!1)-1]}function findIndex(e,n,t){for(var r=0,d=e.length;r<d;){var f=parseInt((r+d)/2);e[f]>n||t&&e[f]===n?d=f:r=f+1}return r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_default;