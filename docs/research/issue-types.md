# Photographable issue types

Draft for #1. The agent drafted this from the sources below on 2026-10-13, and Timothy checks it. It isn't legal advice. Inspect never says a property breaches the standards. It flags a **possible issue, worth asking about**.

The list decides two things: the `issueType` values in the model's JSON schema, and the label vocabulary for the eval set (#4).

## Sources

- Consumer Affairs Victoria, [Rental minimum standards checklist (PDF)](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf): the 15 categories and their wording.
- Consumer Affairs Victoria, [Rental minimum standards](https://www.consumer.vic.gov.au/rentalstandards) (page updated 2026-10-13): commencement dates. Electrical safety and the energy-efficient heater rule started on 29 March 2023, and window covering anchors on 1 December 2025.
- Consumer Affairs Victoria, [New minimum energy efficiency standards](https://www.consumer.vic.gov.au/resources-and-tools/legislation/public-consultations-and-reviews/new-minimum-energy-efficiency-standards): standards that start from 1 March 2027 (Residential Tenancies Amendment (Minimum Energy Efficiency Standards) Regulations 2025).

## How to read the table

- **Photo can show it:** *Yes* means a typical phone photo carries the evidence. *Partly* means a photo shows whether the thing is present but not whether it works or how it's rated. Those types need a question rather than a verdict.
- **Proposed for v1:** the types I suggest the model and the eval set start with. These have strong visual signal, are often missed in a 15-minute walk-through, and are worth a question. Timothy decides.
- Suggested questions are written for the renter to ask the agent. They're draft copy for the questions list.

## Issue types a photo can show

| `issueType` | Standard | What it looks like in a photo | Photo can show it | Proposed for v1 | Suggested question |
| --- | --- | --- | --- | --- | --- |
| `mould` | Mould and damp | Black, green or grey spotting on ceilings, wall corners, window frames, grout, behind furniture | Yes | Yes | "Has there been mould in this room, and what was done about the cause?" |
| `damp` | Mould and damp | Water stains, tide marks, bubbling or peeling paint, warped skirting, condensation on windows | Yes | Yes | "Is there a damp problem here? Has the cause been fixed?" |
| `structural-damage` | Structural soundness | Cracks in walls or ceilings, sagging ceiling, gaps between walls and frames, rot | Yes | Yes | "Has anyone checked these cracks? Are they getting worse?" |
| `weatherproofing` | Structural soundness | Water staining under windows or at the ceiling line, damaged seals, broken glass | Yes | Yes | "Does water get in here when it rains?" |
| `window-coverings-missing` | Window coverings | Bedroom or living-room windows with no curtains or blinds, or broken or partial ones | Yes | Yes | "Will curtains or blinds be fitted in this room before I move in?" |
| `blind-cord-unanchored` | Window covering anchors (from 1 Dec 2025) | Looped or loose cords on blinds or curtains with no tension device or cleat fixed to the wall | Yes (close-up) | Yes | "Can the blind cords be anchored before move-in?" |
| `window-latch` | Windows | An openable window with a missing or broken latch, or one that can't stay open or shut | Partly (close-up; can't test) | Yes | "Do all the opening windows latch and stay open?" |
| `heater-missing` | Heating | No fixed heater visible in the main living area (portable heaters don't count) | Partly (presence only) | Yes | "What's the fixed heating in the living area, and is it energy efficient?" |
| `old-switchboard` | Electrical safety (from 29 Mar 2023) | A switchboard with ceramic rewireable fuses, no circuit breakers, or no safety switch (no RCD test buttons) | Partly (only if the board is visible) | Yes | "Has an electrician checked the switchboard and safety switches?" |
| `no-exhaust-ventilation` | Ventilation | A bathroom, toilet or laundry with no exhaust fan and no openable window | Partly (can't judge adequacy) | Yes | "How is the bathroom ventilated? Is there an exhaust fan?" |
| `entry-lock` | Locks | An external door with no keyed lock or deadlock, or a lock that's visibly damaged | Partly (can't test) | No (hard to judge from a photo) | "Do the external doors have working deadlocks?" |
| `draught-gap` | Draughtproofing (energy standard, new leases from 1 Jul 2027) | Daylight under or around external doors, gaps at window frames, open unused fireplace | Yes | No (not a standard until 2027) | "Is the house draught-proofed?" |
| `kitchen-stovetop` | Kitchen | A stovetop with fewer than two burners, or visibly broken or missing parts | Partly (can't test) | No (rarely an issue) | "Does the stove and oven work?" |
| `lighting-missing` | Lighting | Rooms or hallways with no light fitting, or exposed wiring where a light should be | Partly | No (rarely an issue) | "Do all the lights work?" |
| `bins-missing` | Vermin-proof bins | No rubbish or recycling bins, or bins without lids | Partly (bins are often out of view) | No | "Are bins supplied?" |

## Standards a photo can't really check

These still matter, but a photo can't carry the evidence. Inspect could offer them as standing questions instead of flags.

| Standard | Why a photo can't show it | Standing question |
| --- | --- | --- |
| Bathroom: hot and cold water, shower head 3-star rating | Water supply and the star rating aren't visible | "Is there reliable hot water, and is the shower head water-efficient?" |
| Kitchen and laundry: hot and cold water | Not visible | "Do the kitchen and laundry have hot and cold water?" |
| Toilets: working, connected to sewer or septic | Not visible | "Does the toilet work properly?" |
| Electrical safety: electrician's check | It's a paperwork check | "When was the electrical safety check done?" |
| Heating: energy-efficient rating, working order | The rating label is rarely in frame, and working order can't be seen | "Is the heater energy efficient, and does it work?" |
| Lighting: natural light during the day | Depends on time and weather, and a photo is a poor judge | Not proposed |
| Energy standards from 1 Mar 2027: ceiling insulation, hot water, shower heads, cooling | In the ceiling or not visible. Cooling becomes universal by 1 Jul 2030 | "Is there ceiling insulation? What's the hot water system?" |

## Questions for Timothy

1. Is the v1 set right (the ten "Yes" rows)? That's about four photos per type in a 40–50 photo set. Fewer types would give more photos per type.
2. Should `mould` and `damp` stay separate? Renters may not care about the difference, but the evidence and the question differ.
3. Should the 2027 energy standards (draughts, insulation) be included now as "worth asking", or held until they start?
4. Should the "Standing question" column become a fixed part of the questions list, asked at every inspection?
