declare function get(key: string): Promise<any>;
declare function set(key: string, value: string): Promise<void>;
declare function exists(key: string): Promise<boolean>;
declare function remove(key: string): Promise<void>;

export { exists, get, remove, set };
