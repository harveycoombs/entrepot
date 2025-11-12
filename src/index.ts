// Entrepot KV - Authored by Harvey Coombs
import * as fs from "fs/promises";
import * as cbor from "cbor";
import path from "path";

export async function get(key: string): Promise<string|null> {
    await createDirectoryIfAbsent();

    const root = process.env.ENTREPOT_ROOT || process.cwd();

    try {
        const raw = await fs.readFile(path.join(root, `/.kv/${key}.cbor`));
        const decoded = await cbor.decodeFirst(raw);
    
        return decoded?.value?.toString();
    } catch {
        return null;
    }
}

export async function set(key: string, value: string): Promise<void> {
    await createDirectoryIfAbsent();

    const root = process.env.ENTREPOT_ROOT || process.cwd();

    const encoded = await cbor.encodeAsync({ key, value });
    await fs.writeFile(path.join(root, `/.kv/${key}.cbor`), encoded);
}

export async function exists(key: string): Promise<boolean> {
    const root = process.env.ENTREPOT_ROOT || process.cwd();

    try {
        await fs.access(path.join(root, `/.kv/${key}.cbor`));
        return true;
    } catch {
        return false;
    }
}

export async function remove(key: string): Promise<void> {
    const root = process.env.ENTREPOT_ROOT || process.cwd();
    await fs.unlink(path.join(root, `/.kv/${key}.cbor`));
}

export async function keys(): Promise<string[]> {
    const root = process.env.ENTREPOT_ROOT || process.cwd();

    try {
        const files = await fs.readdir(path.join(root, "/.kv"));
        return files.map(file => file.replace(".cbor", ""));
    } catch {
        return [];
    }
}

async function createDirectoryIfAbsent(): Promise<void> {
    const root = process.env.ENTREPOT_ROOT || process.cwd();
    const directory = path.join(root, "/.kv");

    try {
        await fs.access(directory);
    } catch {
        await fs.mkdir(directory);
    }
}