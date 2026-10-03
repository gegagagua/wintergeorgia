# 04 — Transfers module

The only module that takes money in v1. Everything else feeds it.

## Booking flow

1. Pick a route (or land directly on the route page from search).
2. Date, time, passengers, luggage pieces, ski/snowboard count.
3. Vehicle class: shared seat · sedan · minivan · 4x4.
4. Extras: child seat, ski rack, return leg.
5. Airport routes: flight number (used to auto-track delays).
6. Pickup address (free text + map pin) — the guest's hotel or apartment.
7. Card payment. Confirmation by email and WhatsApp.
8. 12 hours before departure: driver name, phone, vehicle and plate are sent automatically.

## Rules that create trust — show them on the booking page itself

- **Fixed price, shown before booking.** No dynamic pricing in season 1.
- **Road closed → booking moves or is refunded in full, automatically.**
- **Cancellation:** free up to 24h before; 50% after. Flight delays are never penalised.
- **Every driver is vetted:** documents, insurance, winter tyres, chains. Profile is public.
- Vehicle class states its winter equipment explicitly (4x4, chains, winter tyres).

## Shared vs private

Shared seats are sold only on `tbilisi-airport-gudauri`, `tbilisi-gudauri` and
`mestia-tetnuldi`. All other routes are whole-vehicle.

`mestia-tetnuldi` is a **daily scheduled shuttle**, not an ad-hoc transfer: fixed morning
departures, seats sold in advance, return in the afternoon. A guest staying a week buys it
4–6 times. Model it as a schedule with seat inventory, not as a one-off booking.

## Pricing

`route_prices` rows keyed by route + vehicle class + validity window. Prices are integers in
tetri. Display currency GEL by default, with USD/EUR display conversion (informational only —
charge in GEL).

## Driver settlement

Commission 15–25%, configurable per driver. Payment is collected by the platform; drivers are
settled weekly. Every booking records the commission amount at booking time (never recomputed
later from a changed rate).

## Notifications

| Moment | Channel | Content |
|---|---|---|
| Booking paid | email + WhatsApp | confirmation, route, price, cancellation policy |
| T-12h | WhatsApp | driver name, phone, vehicle, plate |
| T-2h | WhatsApp | driver is on the way |
| Road closed | WhatsApp + email | new options: reschedule or refund |
| After trip | email | receipt + review request + link to rental/lessons |

Queue all of these through QStash. Never send from the request handler.

## Admin

Operator view: today's bookings, unassigned bookings, driver assignment, road status switch
(which triggers the closure rule above), price editor, refund action. Every action is logged.
