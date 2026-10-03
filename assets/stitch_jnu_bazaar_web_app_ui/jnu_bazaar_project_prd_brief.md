# Product Requirements Document (PRD): JNU Bazaar
**Project Brief & Technical Specification**
*Version: 1.0.0 | Status: Approved Baseline | Audience: Product, Engineering, Design & Campus Operations*

---

## 1. Executive Summary & Vision

### 1.1 Product Vision
**JNU Bazaar** (`Buy • Sell • Belong`) is a dedicated, hyper-local peer-to-peer (P2P) campus exchange network engineered specifically for the scholars, students, and faculty of **Jawaharlal Nehru University (JNU), New Delhi**.

Traditional general-market platforms (OLX, Quikr, Facebook Marketplace) expose students to scams, spam, intrusive phone contact, safety risks from unknown outsiders entering campus, and friction in shipping or middleman commissions. **JNU Bazaar** solves this through mandatory institutional verification (`@jnu.ac.in`), zero platform commission, direct peer-to-peer UPI settlement, and a designated network of monitored daytime campus handover hubs (Central Library, KC Market, Ganga Dhaba, Hostel Foyers).

### 1.2 Target Audience & User Personas
1. **The Hosteller / Scholar (Primary)**:
   - Resides in one of the 18 campus hostels across Dakshinapuram, Uttarakhand, and Poorvanchal clusters.
   - Needs to buy/sell course books, coolers for monsoon/summer semesters, cycles, kettles, bed study tables, or lab instruments before vacating or graduating.
2. **The Day Scholar**:
   - Commutes to campus daily (SIS, SSS, SPS, SLS).
   - Needs semester textbooks, scientific calculators, stationery, or bicycle handoffs at central academic gates.
3. **Incoming Freshers / Research Scholars**:
   - On a tight budget; seeking pre-loved room essentials and prescribed syllabi material without paying commercial bookstore prices.

---

## 2. Core Value Propositions & Business Model

| Pillar | Specification |
| :--- | :--- |
| **100% Institutional Trust** | Gated registration strictly restricted to `@jnu.ac.in` domain credentials with student ID & roll number checks. |
| **Zero Platform Commission** | 100% free transactions (`Strictly ₹0 Fee`). Direct buyer-to-seller UPI or cash on spot upon physical inspection. |
| **Campus Geography-Aware** | Clustered by JNU residential areas (Dakshinapuram, Uttarakhand, Poorvanchal) and Academic complexes (SIS, SSS, SLS, SPS, SC&SS). |
| **Monitored Safe Hubs** | In-person handovers scheduled strictly at high-visibility, CCTV-monitored university hubs to eliminate secluded meetings. |
| **Privacy First** | Hostel room numbers and phone numbers are hidden by default; in-app encrypted real-time chat with scheduled handover passes. |

---

## 3. Product Architecture & Implemented Screens

The application UI suite comprises 7 core interconnected desktop experiences:

### 3.1 Screen Catalog & Mapping
1. **Landing & Discovery Portal (`Campus Marketplace Landing Page`)**:
   - High-impact brand hero, dynamic campus metrics (850+ active listings, 2,400+ scholars), category quick-links, and trending semester deals.
2. **Marketplace Catalog & Search (`Marketplace All Products`)**:
   - Filterable product grid with faceted search: Price range, Condition (Mint, Good, Fair), JNU Hostel Cluster, Academic School tags, and Instant Buy/Negotiate tags.
3. **Brand Hub & Campus Community Portal (`Brand Hub & Campus Community Portal`)**:
   - Institutional pride showcase, safety guidelines, 3-step verification onboarding guide, and hostel directory breakdown.
4. **Post Listing & Valuation Form (`Sell Product & Post Listing`)**:
   - Multi-image photo uploader (up to 6 photos with primary cover selection).
   - Product age selection (`< 6 months`, `6 mos - 1 yr`, `1 - 2 yrs`, `Current Sem`).
   - Condition grading, MRP vs. Selling Price discount auto-calculation, and dynamic **Campus Valuation Benchmark** (e.g. historical price ranges for similar items).
   - Safe Handover hub selector (KC Market, Central Library Porch, Ganga Dhaba, Brahmaputra Gate).
5. **Real-Time Product Chat & Negotiation (`Real-Time Product Chat`)**:
   - Pinned product context bar at top of thread (`Item`, `Price`, `Condition`, `View Listing`, `Make an Offer`).
   - Verified scholar badges, safe campus exchange safety reminders, 1-click campus handover quick-replies (`Yes, 5:00 PM works!`, `Meet at KC Market?`), and deal confirmation status.
6. **User Profile, Listings & Buying Dashboard (`User Profile, Listings & Buying Dashboard`)**:
   - Academic identity banner (`Roll: 21/42/IS/088`, SIS Centre, Brahmaputra Hostel).
   - 4-tab listing manager (*All, Active, Under Negotiation, Sold / Archived*) with quick actions (*Bump, Mark as Sold, Edit, Delete*).
   - Campus purchase history with peer ratings and UPI receipt records.
7. **Notifications & Campus Activity Hub (`Notifications & Campus Activity`)**:
   - Chronological notification feeds partitioned by: *Offers & Deals*, *Chat Messages*, *Handover & Safe Hubs*, and *Campus System Alerts*.
   - Live "Upcoming Handover" pass widget with verification token (`Token #JH-409`).
   - Communication preference toggles (In-app, WhatsApp alerts, 1-hr reminder).

---

## 4. Functional Specifications

### 4.1 Authentication & Profile Verification
- **SSO Integration**: Institutional Google Workspace / Microsoft SSO requiring `@jnu.ac.in`.
- **Identity Attributes**:
  - Full Name & Academic Roll Number.
  - School / Centre Affiliation (e.g., Centre for Political Studies, SSS).
  - Hostel & Room Allocation (optional public display; protected behind privacy toggle).
  - Trust Milestones: Verified Scholar badge, Star Rating (1.0 to 5.0), Completed Exchanges Count.

### 4.2 Product Listing Lifecycle
```
[Draft] -> [Active on Marketplace] <-> [Under Negotiation / Offer Received]
                                     |
                                     +--> [Handover Scheduled (Token Generated)]
                                     |
                                     +--> [Deal Agreed & Settled (UPI/Cash)]
                                     |
                                     +--> [Archived / Sold]
```
- **Pricing Rules**: Maximum listing price cannot exceed verified MRP.
- **Duration**: Active listings stay live for 30 days before prompting the seller to "Bump", "Discount", or "Archive".

### 4.3 Safe Handover Protocol
- When an offer is accepted, buyer and seller choose one of the official **Campus Safe Hubs**:
  1. *Central Library Main Porch / Front Steps* (Primary, 24/7 CCTV)
  2. *KC Market Open Chowk* (Daytime 9:00 AM – 9:00 PM)
  3. *Ganga Dhaba Patio* (Evening friendly)
  4. *Tapti / Sabarmati Mess Foyer*
- An encrypted Handover Token / QR Pass is generated for both parties to prevent impersonation.

---

## 5. Non-Functional & Technical Requirements

### 5.1 Design System & UI Consistency
- **Framework**: Tailwind CSS semantic tokens.
- **Palette**:
  - Primary: `#2563EB` (Campus Royal Blue)
  - Surface: Crisp light `#FFFFFF` & `#F9F9FF`, border accents `#E2E8F0` / `#D3DAEF`.
  - Contrast compliance: Meets WCAG AA standards across all text and icon indicators.
- **Typography**: Inter (geometric sans-serif with distinct headline and body weights).

### 5.2 Performance & Reliability
- Page load time < 1.2s on campus Wi-Fi networks (eduroam / JNU LAN).
- Image uploads compressed on client side before upload (WebP, max 1600px width).
- Zero external tracking scripts to maintain privacy standards.

---

## 6. Implementation Roadmap & Milestones

- **Phase 1 (Complete)**: UI Design system tokens, interactive prototypes for Marketplace, Chat, Listing Form, Profile, and Notifications.
- **Phase 2**: Backend Auth API (`@jnu.ac.in` SAML/OAuth2) and PostgreSQL database schema design for Users, Listings, and Messages.
- **Phase 3**: WebSockets / Socket.io server deployment for sub-second real-time campus chat and push alerts.
- **Phase 4**: Campus Pilot launch across Uttarakhand hostel cluster before university-wide monsoon semester rollout.
