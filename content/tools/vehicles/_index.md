---
title: "Vehicles"
description: "Narrow U.S.-market vehicle picks with lower embedded-telematics risk"
date: 2026-06-09T00:00:00-07:00
draft: false
weight: 65
---

This is a U.S.-market vehicle category focused on embedded cellular telemetry. It is intentionally narrow: the cards below should be solid candidates, not a long list of everything that might work. Assume every mainstream current-production vehicle has embedded connectivity unless a VIN check, trim sheet, window sticker, and physical inspection prove otherwise. Mozilla's [Privacy Not Included car review](https://www.mozillafoundation.org/en/privacynotincluded/articles/its-official-cars-are-the-worst-product-category-we-have-ever-reviewed-for-privacy/) gave every one of the 25 car brands it reviewed a warning label, the worst product category it had tested, and California's [GM/OnStar settlement](https://oag.ca.gov/news/press-releases/when-it-comes-data-privacy-consumers-must-be-driver%E2%80%99s-seat-attorney-general), the largest CCPA penalty in the state's history to date, shows the risk is not theoretical.

The consumer answer is not "buy a new privacy car." It is: buy a used vehicle from a verified non-telematics trim and year, or physically bypass the telematics module when a newer vehicle is unavoidable.

Toyota announced a [broader U.S. DCM rollout](https://pressroom.toyota.com/toyota-connected-car-technology-accelerates/) starting with model changes in 2017, and Toyota's [2020 Connected Services table](https://www.toyota.com/content/dam/toyota/audio-multimedia/pdf/new/MY20_Connected_Services_Table.pdf) lists connected-service availability across mainstream Corolla, RAV4, 4Runner, and Tacoma configurations. Treat 2020+ Toyota/Lexus as presumptively connected. Older vehicles still need trim-level verification: Safety Connect, Starlink, OnStar, Blue Link, HondaLink, and similar packages vary by year and trim. GM has had OnStar embedded since the late 1990s; avoid the brand entirely. Nissan was the worst non-Tesla brand in Mozilla's review.

Before any purchase: run the VIN through [Privacy4Cars](https://vehicleprivacyreport.com) and physically inspect for an SOS or emergency-call button near the mirror or overhead console. On pre-2020 Toyotas, no SOS button is a strong sign that Safety Connect hardware was not installed, but still confirm by VIN and trim sheet before treating the car as clean.

Use the [Vehicle Telematics Inspection Checklist](/tools/vehicles/vehicle-telematics-inspection-checklist/) before trusting any vehicle recommendation. Also run a separate [Aftermarket GPS / OBD Tracker Inspection](/tools/vehicles/aftermarket-gps-obd-tracker-inspection/) on used cars, especially former rentals, fleet vehicles, repossessions, financed cars, buy-here-pay-here cars, and trucks. A car can be factory-clean and still carry a dealer, fleet, finance, insurance, or prior-owner tracker.

Assurance tiers:

- Best: verified no embedded modem from the factory.
- Acceptable: modem physically bypassed, antenna-disconnected, or removed on a vehicle you own and understand. For 2020+ Toyotas, the [Toyota DCM Bypass Harness](/tools/vehicles/toyota-dcm-bypass-harness/) is the advanced fallback when a clean pre-2020 car is not an option.
- Lower assurance: vendor or app deactivation with documentation from the manufacturer.
- Not sufficient: subscription cancellation alone, app deletion alone, or "the dealer said it is fine."

This category does not eliminate local [event data recorders](https://www.nhtsa.gov/research-data/event-data-recorder), toll-tag logs, ALPR/license-plate-camera tracking, phone navigation logs, insurance dongles, dealer service records, satellite-radio accounts, Bluetooth phone remnants, or aftermarket GPS trackers. It is about reducing the car's own cellular data path first.
