# JobTrack Pro

JobTrack Pro is a frontend job application tracker made with React, Vite, React Router, Context API, Tailwind CSS, and localStorage.

## Features

- Dashboard with application counts and recent applications
- Add, view, edit, and delete job applications
- Save application data in browser localStorage
- Search applications by company, role, or location
- Filter applications by status
- Sort applications by applied date
- View one application using its dynamic URL
- See applications in the Interview status
- Add interview dates, company website, salary, location, job type, and notes
- Edit a simple personal profile
- Settings for compact rows, delete confirmation, and clearing saved applications
- Responsive navigation and a 404 page

## Run the project

You need Node.js installed.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Create a production build

```bash
npm run build
npm run preview
```

## Important notes

- This is a frontend portfolio project. It does not use a backend or database.
- Application data is saved only in the current browser using localStorage.
- Data does not sync between devices or browsers.
- Real login, multi-user accounts, and AI features are not included.
- Do not store passwords or sensitive personal information in this project.

## How to explain this project in an interview

"JobTrack Pro is a React job application tracker. I used React state to manage forms and UI, Context API to share application data between pages, and localStorage to keep the data after refresh. React Router is used for page navigation and dynamic application detail pages. Users can add, edit, delete, search, filter, and sort their job applications."
