# 🚨 Alertify

> A real-time, map-based incident reporting and alert system that provides location-aware notifications for emergencies, traffic updates, weather alerts, public safety events, and more.

---

## 📖 Overview

Alertify is a community-driven, browser-based platform that puts real-time situational awareness in the hands of everyone. Users can report incidents on an interactive map, receive live notifications from their area, chat with their local community, and instantly access emergency services — all from a single interface.

---

## ✨ Features

### 🗺️ Interactive Map
Live Leaflet.js map that plots reported incidents as they come in, giving users an immediate visual overview of activity in their area.

### 📋 Incident Reporting
A structured submission form that lets users report incidents with:
- Location (text input)
- Incident type (Fire, Flood, Accident, Earthquake, Landslide, Medical Emergency, Crime, Power Outage, Gas Leak, Garbage)
- Image upload for visual evidence
- Free-text additional details

### 🔔 Real-Time Notifications
A live notifications panel that updates as new incidents are submitted, keeping the community informed without needing to refresh.

### 💬 Local Community Chat
A floating chat panel for real-time text communication between users in the same area — useful during active emergencies for coordinating and sharing updates.

### 🆘 Emergency Quick-Dial
One-tap access to critical emergency services directly from the navbar:

| Service | Number |
|---------|--------|
| 🚔 Police | 100 |
| 🔥 Fire | 101 |
| 👩 Women's Safety | 1091 |
| 🚑 Ambulance | 102 |

### 🔴 SOS Button
A prominent SOS button in the header for immediate distress signalling.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser (Client)                 │
│                                                     │
│  ┌───────────┐  ┌───────────────┐  ┌─────────────┐  │
│  │  Incident │  │  Leaflet Map  │  │ Notification│  │
│  │   Form    │  │  (Live Pins)  │  │   Panel     │  │
│  └─────┬─────┘  └───────────────┘  └─────────────┘  │
│        │               ▲                  ▲         │
│        │        script.js (logic layer)   │         │
│        └───────────────┴──────────────────┘         │
└──────────────────────┬──────────────────────────────┘
                       │ Firebase SDK (module)
                       ▼
            ┌─────────────────────┐
            │   Firebase          │
            │   Firestore DB      │
            │  (incidents, chat)  │
            └─────────────────────┘
```

---

## 📁 Project Structure

```
Alertify/
├── index.html          # Main app — map, form, notifications, chat
├── script.js           # Core logic — map pins, form handling, Firestore, chat
├── styles.css          # Main stylesheet
├── loading.html        # Splash/loading screen
├── loading.css         # Loading screen styles
├── Loading/            # Loading screen assets
└── LICENSE             # Apache-2.0
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Map | Leaflet.js v1.9.3 |
| Database | Firebase Firestore |
| Authentication | Firebase (module-based SDK v10) |
| Hosting | Any static host (GitHub Pages, Firebase Hosting, Netlify) |

---

## 🚀 Getting Started

### Prerequisites
- A Firebase project with Firestore enabled
- A modern web browser
- A local HTTP server (e.g. VS Code Live Server, `npx serve`, or Python's `http.server`)

### 1. Clone the Repository

```bash
git clone https://github.com/Soorya-Narayan/Alertify.git
cd Alertify
```

### 2. Configure Firebase

Open `index.html` and replace the placeholder Firebase config with your own project's credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

You can find these values in your Firebase Console under **Project Settings → General → Your apps**.

### 3. Set Up Firestore

In the Firebase Console:
1. Go to **Firestore Database** → **Create database**.
2. Start in **test mode** for development (remember to add security rules before going to production).

### 4. Run Locally

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

Open `http://localhost:8080` in your browser.

### 5. Deploy (Optional)

Deploy to Firebase Hosting in one command:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 🔒 Security Notes

- Before going live, replace the default Firestore **test mode** rules with proper security rules to prevent unauthorized reads/writes.
- Never commit your real Firebase API keys to a public repository. Consider using environment injection or Firebase's App Check for production.

---

## 📄 License

This project is licensed under the [Apache-2.0 License](LICENSE).

---

<p align="center">Made with ❤️ by <a href="https://github.com/Soorya-Narayan">Soorya Narayan</a></p>
