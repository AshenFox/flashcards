"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterRegex = void 0;
const filterRegex = (value) => `${value}(?!br>|r>|>|\/div>|div>|iv>|v>|nbsp;|bsp;|sp;|p;|;|\/span>|span>|pan>|an>|n>)`;
exports.filterRegex = filterRegex;
