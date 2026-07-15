# Task List: B2B Routing Split & Patient Booking Portal

This task list tracks the execution steps for splitting the B2B marketing homepage to `/os` and establishing the new patient-facing booking portal at `/`.

- [x] Create client-side `LayoutWrapper` component in `app/layout-wrapper.tsx`
- [x] Modify `app/layout.tsx` to use the new `LayoutWrapper`
- [x] Create B2B homepage at `app/os/page.tsx` by moving current `app/page.tsx` content
- [x] Create patient-facing appointment booking page at `app/page.tsx`
  - [x] Design patient-facing header (logo, CTA to OS)
  - [x] Implement doctor & specialty select cards
  - [x] Implement calendar slots grid
  - [x] Implement booking forms (name, phone, age, reason)
  - [x] Implement success/confirmation dialog
- [x] Update B2B Navbar logo/home link targets in `src/components/Navbar.tsx` to point to `/os`
- [x] Update B2B Footer logo/home link targets in `src/components/Footer.tsx` to point to `/os`
- [x] Run production build `npm run build` to verify compilation
- [x] Verify local routes render properly

## Phase 2: Patient Booking UX Improvements
- [x] Design a Practo/Jio-Kiwi inspired Patient Header component in `src/components/patient/PatientHeader.tsx`
  - [x] Include the official NexEagle Healthcare Excellence logo (with eagle icon)
  - [x] Implement location selector (city dropdown: Kolkata, Delhi, Bengaluru, etc.)
  - [x] Add search input for doctors, symptoms, or specialties
  - [x] Style patient navigation links ("Find Doctors", "Book an Appointment")
  - [x] Add a clear B2B "For Providers" redirection button
- [x] Integrate `PatientHeader` into `app/page.tsx`
- [x] Connect header search input to page states to dynamically filter specialties and doctors
- [x] Fix header top alignment (eliminate `padding-top: 5rem` body gap specifically for `nexeagle.com` root page)
- [x] Add scroll anchor IDs to page sections (e.g. `id="booking"` on the booking card container)
- [x] Update Hero section with top specialties circular cards, updated copy, and click-to-book smooth scrolls
- [x] Remove the hard drop-down selector and replace it with a **Smart Card Search** widget
  - [x] Implement location detector state (`isDetecting`) and simulated auto-detect clinic button
  - [x] Set up quick 1-click area selection pills (`📍 Salt Lake`, `📍 Gariahat`, `📍 New Town`)
  - [x] Set up 1-click symptom/disease select pills (`🌡️ Fever / Flu`, `🤰 Pregnancy Care`, etc.) that auto-select specialty and navigate immediately
  - [x] Link location states to doctor lists to ensure real-time clinic filtering works properly
- [x] Verify production build compiles successfully

## Phase 3: Revert Flat Component Rewrite (Reverted)
- [x] Revert `app/page.tsx` to the Phase 2 version (circular specialty cards with emojis and the Smart Search Card widget)
- [x] Delete the temporary flat design components (`Nav.tsx`, `Hero.tsx`, `SymptomGrid.tsx`, `DoctorCard.tsx`, `TrustBar.tsx`)
- [x] Confirm local dev server and production builds are compiled successfully
