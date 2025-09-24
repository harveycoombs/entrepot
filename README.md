<p align="center"><img src="https://share.surf/uploads/f30d6f84-3f3c-4bbf-8cf9-3bbdc7dc1d1e" width="300" /></p>
<h1 align="center">Entrepot &ndash; easy, self-contained KV storage.</h1>

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

### Deleting a value
```js
import { remove } from "entrepot-kv";

await remove("animal");
```

### Checking a key exists
```js
import { exists } from "entrepot-kv";

const valueExists = await exists("animal");
console.log(valueExists); // true
```

### Listing all keys
```js
import { keys } from "entrepot-kv";

const keyList = await keys();
console.log(keyList); // ["animal"]
```