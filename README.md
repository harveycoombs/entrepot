# Entrepot
Entrepot is a library for easy, self-contained KV storage.

## Usage
### 1. Setting a value
```js
import { set } from "entrepot-kv";

await set("animal", "cat");
```
### Getting a value
```js
import { get } from "entrepot-kv";

const value = await get("animal");
console.log(value); // "cat"
```

### Checking a key exists
```js
import { exists } from "entrepot-kv";

const valueExists = await exists("animal");
console.log(valueExists); // true
```

