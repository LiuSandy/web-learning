"use strict";function _default(e,t){if(!e||!e.length)return null;var n=e[0],r=e[e.length-1];return t<=n?0:r<t?e.length:t==r?e.length-1:findInsert(e,t)}function findInsert(e,t){for(var n=0,r=e.length;n<r;){var l=parseInt((n+r)/2);t<=e[l]?r=l:n=l+1}return n}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_default;