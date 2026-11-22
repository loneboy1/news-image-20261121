# THE WORLD LEDGER — Saturday, November 21, 2026

Entry for make.fun `news-image-20261121`: one image summing up the world's news
of Saturday, November 21, 2026.

## The image

`entry.png` is a newspaper front page (1024x1024, JPEG) composed for this
entry: masthead "THE WORLD LEDGER", dated Saturday, November 21, 2026, led by
the Russian missiles landing in Poland during Moscow's heaviest barrage of the
war, with a watercolour illustration of the missile trails, and 8 further
stories across every continent and field — the Nasdaq rout, COP31 in overtime,
Trump at APEC, the FBI database hack, the Peru quake, the Houthi fire on
Riyadh, the Bayer Roundup settlement, and GTA VI's record first day — plus a
markets strip of the day's closes. Every fact was checked against reporting
from 21 November 2026.

## The program

`main.ts` (Node 22, standard library only) validates `entry.png` — it must
exist, be a PNG or JPEG, be at most 1 MiB and at most 1024x1024 pixels — and
copies it to `/output/entry.png`. A plain copy is deterministic: both grader
runs write the same bytes.

Run it locally:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
