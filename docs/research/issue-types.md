# Photographable issue types

Status: **draft, pending Timothy's approval on #1.** Drafted from Consumer Affairs Victoria (CAV) sources on 2026-10-13. It isn't legal advice.

**What a photo can do.** A photo can show a *visible sign* of a possible issue, such as staining, a crack or an unanchored cord loop. It can never show that a property fails a minimum standard. Inspect therefore only ever says "possible issue, worth asking about". The `issueType` IDs below are internal. Users only see the "Shown to the renter as" label.

**Presence, not absence.** One photo can't show that something is missing, because it may just be out of frame. Every flag below needs positive evidence *in* the photo, like damage, staining, a loose loop or bare wires. Existence and counts (is there a heater, curtains, a fan, bins, two burners?) are standing questions, never flags.

## Sources

- **[C1]** CAV, [Rental minimum standards checklist (PDF)](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf): the 15 categories. Page 1 covers bathroom, electrical safety and heating; page 2 covers the rest.
- **[C2]** CAV, [Rental minimum standards](https://www.consumer.vic.gov.au/rentalstandards) (page last updated 2026-10-13): commencement dates. Electrical safety and the energy-efficient heater rule started on 29 March 2023, and window covering anchors on 1 December 2025.
- **[C3]** CAV, [New minimum energy efficiency standards](https://www.consumer.vic.gov.au/resources-and-tools/legislation/public-consultations-and-reviews/new-minimum-energy-efficiency-standards): standards starting from 1 March 2027 (Residential Tenancies Amendment (Minimum Energy Efficiency Standards) Regulations 2025). Not yet in force.

Quotes below come from [[C1]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf) unless marked otherwise. Dates come from [[C2]](https://www.consumer.vic.gov.au/rentalstandards) and [[C3]](https://www.consumer.vic.gov.au/resources-and-tools/legislation/public-consultations-and-reviews/new-minimum-energy-efficiency-standards). Re-check all three before Ship: the standards change.

## Coverage of the 15 current standards

Every requirement in every category, split into a visible sign Inspect may flag and the part a photo can't show, which becomes a standing question.

| Standard [source] | Requirement (CAV wording) | Visible sign Inspect may flag | Can't be shown, so it's a standing question |
| --- | --- | --- | --- |
| Bathroom [[C1 p1]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=1) | "a sink, a shower or bath, and hot and cold water"; shower head "3-star water efficiency rating" (1- or 2-star acceptable where 3-star can't be installed) | none | Fixtures may be out of frame; water supply and star rating aren't visible |
| Electrical safety [[C1 p1]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=1), [[C2]](https://www.consumer.vic.gov.au/rentalstandards) | "modern switchboards with circuit breakers and electrical safety switches. Rental providers must hire an electrician to check this." (from 29 Mar 2023) | `switchboard-fuses` | Whether safety switches exist and work; the electrician's check |
| Heating [[C1 p1]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=1), [[C2]](https://www.consumer.vic.gov.au/rentalstandards) | "a fixed heater in the main living area that's in good working order"; energy efficient for agreements from 29 Mar 2023 | none | Whether there's a fixed heater, its efficiency and whether it works |
| Kitchen [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | "a cooking and food preparation area"; "a sink in good working order connected to hot and cold water"; "a stovetop in good working order that has two or more burners"; any oven "in good working order" | `stovetop-damage` | Whether anything works; hot and cold water |
| Laundry [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | If there's a laundry, "a reasonable supply of hot and cold water" | none | Water supply |
| Lighting [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | "working lights"; "natural light during the day"; "access to artificial light" at night | `exposed-wiring` | Whether the lights work; natural light depends on time and weather |
| Locks [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | "External entry doors (other than screen doors) must have functional deadlocks or locks that people can unlock with a key from the outside. These must be able to open without a key from the inside." | `entry-lock-damage` | Whether the lock works from both sides |
| Mould and damp [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | "free from mould and damp caused by or related to the building structure" | `mould-signs`, `damp-signs` | The cause: structure, condensation or occupant use |
| Structural soundness [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | "structurally sound and weatherproof" | `crack-signs`, `water-entry-signs` | Whether the structure is sound; whether the stain is current |
| Toilets [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | "in good working order and connected to a sewerage or septic system"; "in a separate room" (alone or in a bathroom or bathroom–laundry) | none | Whether it works and how it's connected |
| Ventilation [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | "adequate ventilation, including the bathroom, shower, toilet and laundry" | none | Whether ventilation is adequate; the fan or window may be out of frame |
| Vermin-proof bins [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | Rubbish and recycling bins, "vermin-proof and meet council collection standards" | none | Bins are rarely in frame |
| Windows [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | "All external windows that people can open must have latches. The latches must secure the windows against outside entry. Windows that can open must also be able to be left in the open or closed position." | `window-latch-damage` | Whether the latch secures it; whether it stays open or shut |
| Window coverings [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | "curtains or blinds in rooms used for living or sleeping" that "open and close, block light and maintain privacy" | `window-covering-damage` | Whether a room has coverings at all; whether they block light |
| Window covering anchors [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2), [[C2]](https://www.consumer.vic.gov.au/rentalstandards) | "All corded internal window coverings … must have an anchor installed" so cords "can't form a loose loop" (from 1 Dec 2025) | `blind-cord-loop` | Whether a cord off-frame is anchored |

## Issue types a photo can show a sign of

"Strength of sign" describes how directly a photo carries the cue: **Strong** means the cue itself is usually clear in frame, and **Weak** means it's ambiguous and easily confused with something harmless. No row proves non-compliance.

| `issueType` (internal) | Shown to the renter as | Standard [source] | What it looks like | Easily confused with | Strength of sign | Suggested question |
| --- | --- | --- | --- | --- | --- | --- |
| `mould-signs` | Possible signs of mould | Mould and damp [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | Black, green or grey spotting on ceilings, corners, window frames, grout | Dirt, shadows, soot, old paint | Strong | "Has there been mould in this room? What was done about the cause?" |
| `damp-signs` | Possible signs of damp | Mould and damp [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | Tide marks, bubbling or peeling paint, warped skirting | Old repaired stains, condensation from a shower | Weak | "Is there a damp problem here, and has the cause been fixed?" |
| `crack-signs` | Possible cracking worth asking about | Structural soundness [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | Cracks in walls or ceilings, gaps at frames, sagging ceiling | Cosmetic hairline cracks, settling | Weak | "Has anyone looked at these cracks? Are they getting worse?" |
| `water-entry-signs` | Possible signs water gets in | Structural soundness [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | Staining under windows or at the ceiling line, damaged seals, broken glass | Old fixed leaks | Weak | "Does water get in here when it rains?" |
| `blind-cord-loop` | Possible loose blind cord | Window covering anchors [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2), [[C2]](https://www.consumer.vic.gov.au/rentalstandards) | A looped or loose cord with no tension device or cleat in view | An anchor just out of frame | Strong (close-up) | "Can the blind cords be anchored before move-in?" |
| `window-covering-damage` | Possibly damaged curtain or blind | Window coverings [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | A broken, torn or partial blind or curtain | Drawn-back curtains | Strong | "Will this blind or curtain be fixed or replaced?" |
| `window-latch-damage` | Possibly broken window latch | Windows [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | A latch visibly snapped, hanging loose or with its catch broken off | A different latch style | Weak (close-up) | "Do all the opening windows latch securely?" |
| `switchboard-fuses` | Possibly an older switchboard | Electrical safety [[C1 p1]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=1), [[C2]](https://www.consumer.vic.gov.au/rentalstandards) | Ceramic rewireable fuses visible in the board | Modern devices that look unfamiliar | Weak (board must be open and in frame) | "Has an electrician checked the switchboard and safety switches?" |
| `entry-lock-damage` | Possibly damaged entry lock | Locks [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | A lock body visibly broken or forced | Unfamiliar lock types | Weak | "Do the front and back doors lock with a key from outside?" |
| `stovetop-damage` | Possibly damaged stovetop | Kitchen [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | Visibly broken burners, grates or knobs | Burner covers | Weak | "Do the stove and oven work?" |
| `exposed-wiring` | Possible exposed wiring worth asking about | Lighting [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) | Bare wires or an open junction where a light fitting should be | A fitting mid-replacement | Weak | "Do all the lights work?" |

## Proposed v1 allowlist (Timothy to approve)

Only these values go into the model schema's `issueType` enum and the eval labels for #4. Everything else stays in this document until it earns a place.

1. `mould-signs`
2. `damp-signs`
3. `crack-signs`
4. `water-entry-signs`
5. `blind-cord-loop`
6. `window-covering-damage`

Why these six: Strong or useful visible signs, often missed in a 15-minute walk-through, and they map to the inspection's biggest worries (mould and damp, water, child safety). Six types across 40–50 photos is about 7–8 photos per type, plus clean photos for false alarms.

Not in v1, and why: latch, lock, switchboard, stovetop and exposed wiring are Weak signs, usually not in frame or hard to judge, so they're better handled as standing questions.

## Standing questions (asked whatever the photos show)

Every facet in the "Can't be shown" column maps to one of these, or is out of scope with a reason.

| Standing question | Covers [source] |
| --- | --- |
| "Is there a fixed heater in the living area? Is it energy efficient, and does it work?" | Heating [[C1 p1]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=1) |
| "Do all the bedrooms and living areas have curtains or blinds that block light?" | Window coverings [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) |
| "Are all the blind and curtain cords anchored?" | Window covering anchors [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) |
| "How are the bathroom, toilet and laundry ventilated?" | Ventilation [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) |
| "Is there reliable hot and cold water in the kitchen, bathroom and laundry?" | Bathroom, Kitchen, Laundry [[C1]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf) |
| "Is the shower head water-efficient?" | Bathroom [[C1 p1]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=1) |
| "Has an electrician checked the switchboard and safety switches?" | Electrical safety [[C1 p1]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=1) |
| "Do the stove, oven and toilet all work?" | Kitchen, Toilets [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) |
| "Do all the lights work?" | Lighting [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) |
| "Do the outside doors lock with a key, and open from inside without one?" | Locks [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) |
| "Do all the opening windows latch securely and stay open or shut?" | Windows [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) |
| "Has there been mould or damp here, and what caused it?" | Mould and damp [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) |
| "Has the building had any structural or leak problems?" | Structural soundness [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) |
| "Are rubbish and recycling bins supplied?" | Vermin-proof bins [[C1 p2]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=2) |

Out of scope: whether the toilet is connected to sewer or septic, which renters can't judge or usefully ask about at an inspection, and natural light, which renters can see for themselves.

## Energy efficiency standards from 2027 (not current; not in the schema)

[[C3]](https://www.consumer.vic.gov.au/resources-and-tools/legislation/public-consultations-and-reviews/new-minimum-energy-efficiency-standards) sets new standards in phases. None are in force today, so Inspect must not present them as current obligations. They're listed only so the product can be ready for them.

| Standard [[C3]](https://www.consumer.vic.gov.au/resources-and-tools/legislation/public-consultations-and-reviews/new-minimum-energy-efficiency-standards) | Starts | Trigger | Visible sign |
| --- | --- | --- | --- |
| Heating | 1 Mar 2027 | When the existing fixed heater fails and can't be repaired | No |
| Cooling | 1 Mar 2027 (new leases); all rentals by 1 Jul 2030 | New lease start | Partly (unit in frame) |
| Hot water | 1 Mar 2027 | When the system permanently fails | No |
| Shower heads | 1 Mar 2027 | New lease or month-to-month conversion (rating: see [[C3]](https://www.consumer.vic.gov.au/resources-and-tools/legislation/public-consultations-and-reviews/new-minimum-energy-efficiency-standards); not recorded here until confirmed from it) | No |
| Ceiling insulation | 1 Mar 2027 | New lease or month-to-month conversion | No (in the ceiling) |
| Draughtproofing | 1 Jul 2027 | New lease or month-to-month conversion | Partly (daylight under doors) |

The current bathroom rule (3-star shower head, [[C1 p1]](https://www.consumer.vic.gov.au/library/publications/housing-and-accommodation/renting/rental-minimum-standards/rental-minimum-standards-checklist-for-rental-providers-pdf.pdf#page=1)) applies now. The 2027 shower-head standard is a separate, later change.
