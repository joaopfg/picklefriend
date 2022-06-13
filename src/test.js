"use strict";
exports.__esModule = true;
var pickle_ts_1 = require("pickle.ts");
var test = "blabla";
var pickle = pickle_ts_1.Pickle();
var dumped = pickle.dumps(test);
console.log(dumped);
