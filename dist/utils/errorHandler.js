"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(message, statusCode, path, keyValue, code) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.path = path;
        this.keyValue = keyValue;
        this.code = code;
        this.statusCode = statusCode;
    }
}
exports.default = ErrorHandler;
