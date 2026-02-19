# BloodConnect

BloodConnect helps volunteers, managers, HR, outreach teams, and admins run day-to-day blood donation operations.

## Tech stack

- **Expo** (React Native) with TypeScript
- **React Navigation** (stack + bottom tabs)
- **AsyncStorage** for auth token and user/role

## Run the app

```bash
npm install
npx expo start
```

Then open in Expo Go (scan QR on device) or press `a` for Android / `i` for iOS simulator.

For web (optional):

```bash
npx expo install react-native-web react-dom @expo/metro-runtime
npx expo start --web
```

## Demo login (role-based)

The app uses **mock auth**: the **role is derived from the email prefix**.

| Email prefix  | Role          |
|---------------|---------------|
| `admin`       | Admin         |
| `manager`      | Camp Manager  |
| `hr`          | HR            |
| `outreach`    | Outreach      |
| `volunteer`   | Volunteer     |

Example: `admin@bc.com`, `manager@bc.com`, `volunteer@bc.com` (password can be anything).

## App structure

- **0. Auth & entry**: Splash (branding + loading) → Login → role-based redirect to dashboard
- **1. Bottom tabs**: Dashboard (role-specific), Tasks, Notifications, Profile
- **2. Dashboards**: Admin, Camp Manager, HR, Outreach, Volunteer
- **3. Camp module**: List, Create, Detail (stepper workflow), Volunteer assignment, Update donation count, Post-camp follow-up
- **4. HR module**: Volunteer directory, Volunteer profile, HR analytics
- **5. Outreach module**: Lead list, Add lead, Lead detail (timeline)
- **6. Helpline module**: Create helpline, Live helpline pool, Assigned helpline, Call (with mandatory remark), Helpline closure
- **7. Reimbursement**: Create (manager), Submit (volunteer), Status
- **8. Tasks & Notifications**: Task list, Notifications
- **9. Profile**: Name, role, stats, Logout

## Project layout

```
App.tsx                 # Entry: AuthProvider + AppNavigator
src/
  context/AuthContext.tsx
  types/index.ts
  constants/roles.ts
  navigation/
    AppNavigator.tsx    # Root stack (auth + main stack)
    MainTabs.tsx        # Bottom tabs; dashboard chosen by role
  screens/
    auth/               # Splash, Login
    dashboards/         # Admin, Manager, HR, Outreach, Volunteer
    camps/              # Camp CRUD, detail, assignment, follow-up
    hr/                 # Directory, profile, analytics
    outreach/           # Leads list, add, detail
    helpline/           # Create, pool, assigned, call, closure
    reimbursement/     # Create, submit, status
    tasks/
    notifications/
    profile/
```

## Next steps (backend)

- Replace mock login with real API; store token and user from response
- Add API clients for camps, leads, helplines, reimbursements, tasks, notifications
- Implement auto-assignment logic for helplines (randomized, load-balanced) on the backend
