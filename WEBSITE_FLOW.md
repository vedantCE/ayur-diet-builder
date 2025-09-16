# Ayurvedic Diet Builder - Core Website Flow

```
┌─────────────────┐
│   Landing Page  │
│   (Homepage)    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Dosha Assessment│ ← Classical Ayurvedic Constitution Test
│ (15 Questions)  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Patient Profile │ ← Age, Gender, Health, Dietary Habits
│   Creation      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Food Selection │ ← ICMR-NIN Database + Ayurvedic Properties
│ + AI Suggestions│ ← 🤖 Gemini AI Recommendations
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Diet Chart    │ ← Personalized Meal Plan
│ Generation      │ ← Print/PDF Export
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Reports & Export│ ← Analytics & Progress Tracking
└─────────────────┘

PARALLEL FLOWS:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Recipe Analyzer │    │Practitioner     │    │Integration      │
│ (AI Analysis)   │    │Dashboard        │    │Roadmap          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Key User Journeys:

### 1. **Patient Journey** (5 steps):
```
Landing → Dosha Test → Profile → Food Selection → Diet Chart
```

### 2. **Practitioner Journey** (3 steps):
```
Practitioner Login → Patient Management → Generate Reports
```

### 3. **AI Features** (2 entry points):
```
Food Selection → AI Suggestions
Recipe Input → AI Analysis
```

## Core Features Summary:
- ✅ **Dosha Assessment** - 15-question constitutional analysis
- ✅ **Patient Profiles** - Comprehensive health data
- ✅ **Food Database** - ICMR-NIN + Ayurvedic properties  
- ✅ **AI Suggestions** - Gemini-powered recommendations
- ✅ **Diet Charts** - Personalized meal plans
- ✅ **Recipe Analysis** - AI-powered Ayurvedic analysis
- ✅ **Practitioner Portal** - Professional dashboard
- ✅ **Reports & Export** - PDF generation & analytics
- ✅ **Integration Roadmap** - Future development plans