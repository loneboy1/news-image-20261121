# THE WORLD LEDGER — Saturday, November 21, 2026

Entry for make.fun `news-image-20261121`: one image summing up the world's news
of Saturday, November 21, 2026.

## The image

`entry.png` is a newspaper front page (1024x1024, JPEG) composed for this
entry: masthead "THE WORLD LEDGER", dated Saturday, November 21, 2026, with
**35 stories across 9 regions, every one dated** — a UTC timeline of the day,
a by-the-numbers strip, and three lead panels: Iran's strikes on Bahrain and
two tankers in the Strait of Hormuz (with a schematic map of the strait),
the Russian cargo ship Sparta II ablaze off Finland after a drone strike
(illustration), and the EU–Indonesia trade pact signed in Brussels
(98.5% of tariff lines, 730m people). Below them, a numbered 12-story grid
(Mexico's capture of 'El Chapo Isidro', COP31 in overtime, the Geneva
killer-robot talks, BepiColombo entering Mercury orbit, the Banda Sea and
Peru quakes, the FBI database hack, Houthis firing on Riyadh, England's
record 37–12 rugby win over the All Blacks, BTS at the MAMA Awards, France's
sixth Saturday of marches, the Nigeria boat toll) and 20 more stories in
brief — plus a DATE CHECK box naming the big wrong-day stories left out on
purpose (Russian missiles in Poland, the Nasdaq rout, GTA VI's first-day
sales, the Bayer Roundup settlement — all Friday 20 Nov or earlier) and a
markets strip labelled as Friday's close, for context only.

Every fact was checked against reporting first published on 21 November
2026 (AP, Reuters, AFP, ESA, UKMTO, USGS, GFZ); times are UTC where noted.
The Hormuz map is a schematic, not to scale. The Sparta II picture is an
AI-generated editorial illustration (no text in it); all text on the page
was drawn in code.

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
