declare function get(key: string): Promise<string | null>;
declare function set(key: string, value: string): Promise<void>;
declare function exists(key: string): Promise<boolean>;
declare function remove(key: string): Promise<void>;
declare function keys(): Promise<string[]>;

export { exists, get, keys, remove, set };
