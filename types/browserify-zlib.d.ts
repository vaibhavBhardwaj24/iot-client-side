declare module 'browserify-zlib' {
    export function ungzip(data: Uint8Array, callback: (err: Error | null, decompressedData: Uint8Array) => void): void;
  }
  