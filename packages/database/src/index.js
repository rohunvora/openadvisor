"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vestingStatusEnum = exports.dealStatusEnum = exports.offerStatusEnum = exports.userTypeEnum = exports.waitlist = exports.disclosureLogs = exports.vestingSchedules = exports.deals = exports.offers = exports.users = void 0;
__exportStar(require("./schema"), exports);
__exportStar(require("./client"), exports);
__exportStar(require("./types"), exports);
// Re-export specific schema items for easier imports
var schema_1 = require("./schema");
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return schema_1.users; } });
Object.defineProperty(exports, "offers", { enumerable: true, get: function () { return schema_1.offers; } });
Object.defineProperty(exports, "deals", { enumerable: true, get: function () { return schema_1.deals; } });
Object.defineProperty(exports, "vestingSchedules", { enumerable: true, get: function () { return schema_1.vestingSchedules; } });
Object.defineProperty(exports, "disclosureLogs", { enumerable: true, get: function () { return schema_1.disclosureLogs; } });
Object.defineProperty(exports, "waitlist", { enumerable: true, get: function () { return schema_1.waitlist; } });
Object.defineProperty(exports, "userTypeEnum", { enumerable: true, get: function () { return schema_1.userTypeEnum; } });
Object.defineProperty(exports, "offerStatusEnum", { enumerable: true, get: function () { return schema_1.offerStatusEnum; } });
Object.defineProperty(exports, "dealStatusEnum", { enumerable: true, get: function () { return schema_1.dealStatusEnum; } });
Object.defineProperty(exports, "vestingStatusEnum", { enumerable: true, get: function () { return schema_1.vestingStatusEnum; } });
