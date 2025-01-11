
---

### Milestone 04 - Final Project Documentation

---

#### **NetID**
**af4329**

---

#### **Name**
**Ahamed Foisal**

---

#### **Repository Link**
[**https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ahamedfoisal**](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ahamedfoisal)

---

#### **URL for Deployed Site**
[**http://linserv1.cims.nyu.edu:20357**](http://linserv1.cims.nyu.edu:20357)

---

#### **URL for Form 1 (from previous milestone)**
[**http://linserv1.cims.nyu.edu:20357/manager-dashboard**](http://linserv1.cims.nyu.edu:20357/manager-dashboard)

---

#### **Special Instructions for Form 1**
- You need to login to go to the manager dashboard

---

#### **URL for Form 2 (for current milestone)**
[**http://linserv1.cims.nyu.edu:20357/signup?role=manager**](http://linserv1.cims.nyu.edu:20357/signup?role=manager)

---

#### **Special Instructions for Form 2**
- This is a sign-up page for managers. After signing up, a login link will be provided. Use the link to access the dashboard functionalities.

---

#### **URL for Form 3 (from previous milestone)**
[**http://linserv1.cims.nyu.edu:20357/events**](http://linserv1.cims.nyu.edu:20357/events)

---

#### **Special Instructions for Form 3**
- This page lists all events.
- Users can RSVP to events without logging in. Simply click on an event to view its details and RSVP.

---

#### **First Link to GitHub Line Number(s) for Constructor, HOF, etc.**
[**EventDetails - RSVP Mapping**](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ahamedfoisal/blob/master/client/src/components/EventDetails.js#L59)

---

#### **Second Link to GitHub Line Number(s) for Constructor, HOF, etc.**
[**Event List Filtering (HOF)**](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ahamedfoisal/blob/master/client/src/components/ManagerDashboard.js#L93)

---

#### **Short Description for Links Above**
1. **RSVP Filter Function**: Uses the `.map()` higher-order function to dynamically render a list of guests who RSVP'd for the event, showing their names and RSVP statuses.
2. **Event List Filtering (HOF)**: Filters events dynamically using `filter` based on search input and manager-specific toggling.

---

#### **Link to GitHub Line Number(s) for Schemas (db.js or Models Folder)**
[**Event Schema**](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ahamedfoisal/blob/master/models/Event.js#L10)

---
Here's the updated section for your **Milestone 04 Documentation** with the specified research topics and their assigned point values:

---

### Research Topics

**User Authentication (5 Points):**
- Implemented secure user authentication using **Passport.js**.
- Provides restricted access to event management features based on user roles (e.g., managers).
- Ensures protected routes and secure session handling.


**React.js for Frontend (5 Points):**
- Built a dynamic and responsive frontend using **React.js**.
- Designed components for user interaction, including event lists, RSVP forms, and manager dashboards.
- Enabled seamless user experience with state management and routing.

---

### Links to GitHub Line Number(s) for Research Topics:

1. **User Authentication**
   - [Authentication Middleware and Passport.js Setup](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ahamedfoisal/blob/master/config/passportConfig.mjs)


2. **React.js for Frontend**
   - [ManagerDashboard Component - React State and Dynamic Event Handling](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ahamedfoisal/blob/master/client/src/components/ManagerDashboard.js#L15)
   - [Navbar Component - User State and Dynamic Rendering](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-ahamedfoisal/blob/master/client/src/components/NavBar.js#L7)


---

#### **Optional Project Notes**
1. The project requires MongoDB and `npm install` to install dependencies.
2. Before running, ensure the `.env` file is correctly configured with database URI and port information.
3. To start the application:
   - `npm start`


---

#### **Attributions**
1. **routes/auth.js** - Authentication code adapted from [Passport.js Documentation](http://www.passportjs.org/docs/).
2. **models/Event.js** - Schema design referenced from [Mongoose Documentation](https://mongoosejs.com/docs/guide.html).
3. **src/components/Navbar.js** - Navbar structure and styling adapted from [Bootstrap Navbar Examples](https://getbootstrap.com/docs/5.1/components/navbar/).
4. **ProtectedRoute Component** - Adapted from [React Router Documentation](https://reactrouter.com/docs/en/v6/getting-started/overview).

---
