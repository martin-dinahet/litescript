// deno-lint-ignore-file no-explicit-any

export const io = {
  write: (...args: any): void => {
    console.log(...args);
  },
  read: (msg?: string): string | null => {
    return prompt(msg);
  },
};

export enum res {
  ok,
  err,
}
