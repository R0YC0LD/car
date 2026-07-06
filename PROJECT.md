# Project: Çağrı Rent a Car Real-Time Sync

## Architecture
- Firebase Firestore handles all data (vehicles, testimonials, faqs, reservations).
- Client homepage (index.html, app.js) and Admin dashboard (admin.html, admin.js) use direct Firebase SDK integration.
- Real-time updates via Firestore `onSnapshot`.
- NO local storage caching for core collections.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | E2E Testing Track | Design & implement Tier 1-4 tests, publish TEST_READY.md | none | PLANNED |
| 2 | Codebase Audit & Prep | Audit app.js, admin.js, index.html, admin.html for local storage caching and Firebase setup | none | PLANNED |
| 3 | Core Real-time Sync | Implement and verify onSnapshot loading/syncing with loading states | M2 | PLANNED |
| 4 | Safe CRUD Admin Sync | Implement admin panel operations using matching Firestore IDs and permanent deletion | M3 | PLANNED |
| 5 | E2E Testing Validation & Hardening | Pass all E2E tests, do adversarial hardening (Tier 5) | M1, M4 | PLANNED |

## Interface Contracts
- window.db: Firestore Database Instance
- window.firestoreTools: collection, addDoc, setDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot
- Collection Names: "vehicles", "testimonials", "faqs", "reservations"
- Vehicle document ID format: "car-X" (where X is a unique id or timestamp)
- FAQ document ID format: "faq-X"
- Testimonial document ID format: "rev-X" or similar
- Reservation document ID format: "RES-X"

## Code Layout
- Root directory: c:\Users\by599\OneDrive\Desktop\Çağrı RentaCar
- app.js: Homepage application logic
- admin.js: Admin dashboard logic
- index.html: Homepage view
- admin.html: Admin view
