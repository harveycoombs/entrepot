// Entrepot KV - Authored by Harvey Coombs
import * as fs from "fs/promises";
import * as cbor from "cbor";
import path from "path";

export async function get(key: string): Promise<any> {
    createDirectoryIfAbsent();

    const raw = await fs.readFile(path.join(process.cwd(), `/.kv/${key}.cbor`));
    const decoded = await cbor.decodeFirst(raw);

    return decoded;
}

export async function set(key: string, value: string): Promise<void> {
    createDirectoryIfAbsent();

    const encoded = await cbor.encodeAsync({ key, value });
    await fs.writeFile(path.join(process.cwd(), `/.kv/${key}.cbor`), encoded);
}

export async function exists(key: string): Promise<boolean> {
    try {
        await fs.access(path.join(process.cwd(), `/.kv/${key}.cbor`));
        return true;
    } catch {
        return false;
    }
}

async function createDirectoryIfAbsent(): Promise<void> {
    const directory = path.join(process.cwd(), "/.kv");

    try {
        await fs.access(directory);
    } catch {
        await fs.mkdir(directory);
    }
}