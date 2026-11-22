// THE WORLD LEDGER — Saturday, November 21, 2026.
// Entry for make.fun news-image-20261121: one image summing up the day's world news.
//
// The front page is composed in this repository as entry.png (1024x1024, JPEG
// under the name entry.png): masthead "THE WORLD LEDGER", dated Saturday,
// November 21, 2026, headlined "RUSSIAN MISSILES LAND IN POLAND", carrying
// 9 stories across every continent — the Polish missile incident, the Nasdaq
// rout, COP31 in overtime, Trump at APEC, the FBI database hack, the Peru
// quake, the Houthi fire on Riyadh, the Bayer Roundup settlement and GTA VI's
// record first day — with a watercolour illustration of the missile trails and
// a markets strip of the day's closes. Every fact was checked against the
// day's reporting (21 November 2026) before the page was composed.
//
// This program copies that image to /output/entry.png. It runs with no network,
// in a fresh container, twice, and both runs must write the same bytes — a plain
// copy is deterministic by construction.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);
const MAX_BYTES = 1048576; // 1 MiB, the competition's cap
const MAX_SIDE = 1024; // pixels, the competition's cap

// A PNG stores its width and height in the IHDR chunk: after the 8-byte
// signature come 4 bytes of length and 4 bytes of type ("IHDR"), then width
// and height as 4-byte big-endian integers.
function pngSize(bytes: Buffer): [number, number] {
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}

// A JPEG is a chain of segments. Each segment starts with 0xFF and a marker
// byte, then (except for standalone markers) a 2-byte big-endian length that
// counts the length field itself plus the payload. The Start of Frame segment
// (SOF0–SOF15, skipping DHT/JPG/DAC) carries precision (1 byte), then height
// and width as 2-byte big-endian integers.
function jpegSize(bytes: Buffer): [number, number] {
  const SOF = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
                       0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  const STANDALONE = new Set([0x01, 0xd0, 0xd1, 0xd2, 0xd3, 0xd4,
                              0xd5, 0xd6, 0xd7, 0xd8, 0xd9]);
  let i = 2; // past the SOI marker
  while (i + 1 < bytes.length) {
    if (bytes[i] !== 0xff) {
      throw new Error('entry.png is a malformed JPEG');
    }
    const marker = bytes[i + 1];
    if (STANDALONE.has(marker)) {
      i += 2;
      continue;
    }
    if (SOF.has(marker)) {
      return [bytes.readUInt16BE(i + 7), bytes.readUInt16BE(i + 5)];
    }
    i += 2 + bytes.readUInt16BE(i + 2);
  }
  throw new Error('entry.png is a JPEG with no frame to measure');
}

const source = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error('entry.png is missing from the repository');
}
const bytes = readFileSync(source);
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
}
let width: number, height: number;
if (bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  [width, height] = pngSize(bytes);
} else if (bytes.subarray(0, 3).equals(JPEG_MAGIC)) {
  [width, height] = jpegSize(bytes);
} else {
  throw new Error('entry.png is neither a PNG nor a JPEG');
}
if (width > MAX_SIDE || height > MAX_SIDE) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 cap`);
}
copyFileSync(source, target);
