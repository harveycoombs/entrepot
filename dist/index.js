"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  exists: () => exists,
  get: () => get,
  keys: () => keys,
  remove: () => remove,
  set: () => set
});
module.exports = __toCommonJS(index_exports);
var fs = __toESM(require("fs/promises"));
var cbor = __toESM(require("cbor"));
var import_path = __toESM(require("path"));
async function get(key) {
  await createDirectoryIfAbsent();
  try {
    const raw = await fs.readFile(import_path.default.join(process.cwd(), `/.kv/${key}.cbor`));
    const decoded = await cbor.decodeFirst(raw);
    return decoded?.value?.toString();
  } catch {
    return null;
  }
}
async function set(key, value) {
  await createDirectoryIfAbsent();
  const encoded = await cbor.encodeAsync({ key, value });
  await fs.writeFile(import_path.default.join(process.cwd(), `/.kv/${key}.cbor`), encoded);
}
async function exists(key) {
  try {
    await fs.access(import_path.default.join(process.cwd(), `/.kv/${key}.cbor`));
    return true;
  } catch {
    return false;
  }
}
async function remove(key) {
  await fs.unlink(import_path.default.join(process.cwd(), `/.kv/${key}.cbor`));
}
async function keys() {
  try {
    const files = await fs.readdir(import_path.default.join(process.cwd(), "/.kv"));
    return files.map((file) => file.replace(".cbor", ""));
  } catch {
    return [];
  }
}
async function createDirectoryIfAbsent() {
  const directory = import_path.default.join(process.cwd(), "/.kv");
  try {
    await fs.access(directory);
  } catch {
    await fs.mkdir(directory);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  exists,
  get,
  keys,
  remove,
  set
});
