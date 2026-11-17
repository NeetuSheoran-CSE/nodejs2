# AuraNotes — Modern SaaS Notes Application Frontend

A modern, responsive frontend built for your existing Express & MongoDB backend, featuring a soft lavender aesthetic, card and list views, full CRUD capabilities, JWT authentication, and smooth animations.

---

## 🎨 Visual Identity & Color Palette

- **Primary**: `#8B5CF6` (Vibrant Purple)
- **Secondary**: `#A78BFA` (Soft Purple)
- **Background**: `#F8F7FF` (Lavender mist)
- **Surface & Cards**: `#FFFFFF`
- **Text Main**: `#25213B`
- **Text Muted**: `#85819A`
- **Borders**: `#EAE7F3`

---

## 🚀 Key Features

### 1. Authentication
- **Login Page**:
  - Email & Password with show/hide toggle
  - Remember me checkbox
  - Password reset guidance modal
  - Real-time validation and error notifications
- **Sign Up Page**:
  - Full Name, Email, Password, Confirm Password
  - Live password strength indicator
  - Validation matching the backend requirements
- **Session & Profile Management**:
  - Profile menu displaying user's name & email
  - Secure JWT storage and header transmission (`Authorization: Bearer <token>`)
  - Instant logout clearing session state

### 2. Main Dashboard & Workspace
- **Sidebar Navigation**:
  - Brand identity with AuraNotes PRO badge
  - Dashboard overview, All Notes, Starred Favorites, and Trash
  - Live badge counters for active, favorite, and trashed notes
  - Real-time Backend Connection Status indicator
  - Settings & preferences modal trigger
- **Dashboard Header**:
  - Time-aware dynamic greeting (Good morning / afternoon / evening)
  - Global instant search across title, content, and category tags
  - Grid View and List View toggle
  - Quick "+ New Note" action button
  - Profile avatar dropdown menu
- **Productivity Stats Overview**:
  - Total Notes counter
  - Starred Favorites count
  - Recently updated relative timestamp
  - Total Words captured counter

### 3. Complete Notes CRUD
- **Create Note**: Title, category (Work, Personal, Ideas, Study, Tasks), accent color picker, and multi-line content with word and character counters.
- **Read / View Note**: Full reading modal with timestamps, category badge, and one-click "Copy to Clipboard".
- **Update Note**: Edit modal pre-filled with existing data; instant UI refresh on save.
- **Delete Note**: Two-stage deletion with confirmation dialog (Soft delete to Trash, and permanent deletion from MongoDB).
- **Favorites**: One-click star toggle (mapped to backend `pinned` property).

---

## 🛠️ How to Run

### Development Mode (with Vite Hot Reloading)
```bash
cd "c:\Users\AC\nodejs2\js practice\week8\notes-frontend"
npm run dev
```
Open **`http://localhost:5173`** in your browser. All API requests are proxied seamlessly to `http://localhost:8080`.

### Direct Backend Access
Your backend at `http://localhost:8080` also serves the production build directly:
```bash
# Open in your browser:
http://localhost:8080
```
