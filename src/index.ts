// Entrepot KV - Authored by Harvey Coombs
import * as fs from "fs/promises";
import * as cbor from "cbor";
import path from "path";

export async function get(key: string): Promise<string|null> {
    await createDirectoryIfAbsent();

    try {
        const raw = await fs.readFile(path.join(process.cwd(), `/.kv/${key}.cbor`));
        const decoded = await cbor.decodeFirst(raw);
    
        return decoded?.value?.toString();
    } catch {
        return null;
    }
}

export async function set(key: string, value: string): Promise<void> {
    await createDirectoryIfAbsent();

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

export async function remove(key: string): Promise<void> {
    await fs.unlink(path.join(process.cwd(), `/.kv/${key}.cbor`));
}

export async function keys(): Promise<string[]> {
    try {
        const files = await fs.readdir(path.join(process.cwd(), "/.kv"));
        return files.map(file => file.replace(".cbor", ""));
    } catch {
        return [];
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