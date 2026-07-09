# nexeagle-api

Relay backend for the NexEagle website. It:

- serves the **doctor directory** to the website (`GET /api/doctors`),
- receives **appointment bookings** and forwards them to **1HMS** (`POST /api/appointments`),
- receives **general site feedback** (`POST /api/feedback`).

It keeps any 1HMS credentials server-side so they never reach the browser.

## Run locally

```bash
cp .env.example .env
npm install
npm run dev        # http://localhost:4000
```

## The doctor-source toggle

`DOCTOR_SOURCE` controls where the doctor list comes from:

| Value    | Behaviour                                                        |
| -------- | --------------------------------------------------------------- |
| `manual` | Serve the curated list in `src/data/doctors.json` (default).    |
| `onehms` | Fetch the live list from the 1HMS API (`GET {ONEHMS_API_URL}/doctors`). |

Flipping it is a backend-only change — the website always calls `GET /api/doctors`
and needs no rebuild.

## Endpoints

- `GET /health` → `{ status, doctorSource }`
- `GET /api/doctors?location=&specialty=` → `{ source, count, doctors[] }`
- `POST /api/appointments` → `201 { id, status, forwardedToOneHms }`
- `POST /api/feedback` → `201 { id, status }`

## 1HMS integration contract

All 1HMS calls live in `src/services/onehms.ts`. Until `ONEHMS_API_URL` is set,
reads return an empty list and writes are stored locally + logged.

**Fetch doctors (toggle ON)** — `GET {ONEHMS_API_URL}/doctors`, header `X-Api-Key`,
returns an array of:

```json
{
  "id": "doc-123",
  "name": "Dr. A. Sharma",
  "specialty": "Cardiology",
  "location": "Kolkata",
  "clinic": "Care Hospital",
  "availableSlots": ["10:00-10:30", "11:00-11:30"],
  "fee": 600
}
```

**Push booking (always)** — `POST {ONEHMS_API_URL}/appointments`, header `X-Api-Key`:

```json
{
  "source": "nexeagle-website",
  "doctorId": "doc-123",
  "doctorName": "Dr. A. Sharma",
  "specialty": "Cardiology",
  "location": "Kolkata",
  "clinic": "Care Hospital",
  "patient": { "name": "...", "phone": "...", "email": "..." },
  "preferredDate": "2026-07-15",
  "preferredSlot": "10:00-10:30",
  "reason": "...",
  "createdAt": "2026-07-09T12:00:00.000Z"
}
```

Notifying the doctor is 1HMS's responsibility once it receives this call.

## Persistence

`src/services/store.ts` appends records to `data/store.json` as a placeholder so
nothing is lost before 1HMS/a real database is connected. Replace for production.
