# 💌 Bespoke Digital Wedding Invitation

![Thumbnail](/assets/images/banner.webp)

[![Code Analysis and Deploy](https://github.com/fhbkoller/weddinvite/actions/workflows/cicd.yml/badge.svg)](https://github.com/fhbkoller/weddinvite/actions/workflows/cicd.yml)
[![GitHub repo size](https://img.shields.io/github/repo-size/fhbkoller/weddinvite?color=brightgreen)](https://github.com/fhbkoller/weddinvite)
[![GitHub License](https://img.shields.io/github/license/fhbkoller/weddinvite?color=brightgreen)](https://github.com/fhbkoller/weddinvite/blob/master/LICENSE)

An elegant, modern, and highly personalized digital wedding invitation. Designed as a fully responsive single-page web application, this project features an interactive welcome card, modern light/dark theme modes, a dynamic countdown, and optimized asset caching to offer a premium presentation for guests.

## ✨ Features

- 💌 **Personalized Interactive Cover**: An elegant, animated virtual envelope with a wax seal that opens on click. It programmatically reads a query parameter (`?id=...`) to load and display the specific guest's name from a local database file (`guests.json`).
- ⏳ **Dynamic Countdown Timer**: A real-time JavaScript countdown clock displaying days, hours, minutes, and seconds.
- 📅 **Google Calendar Event Generator**: Programmatically generates a calendar link allowing guests to add the event directly to their schedule.
- 🎨 **Aesthetic Theme Switcher**: A local-storage-persisted theme toggle that switches between customized light and dark modes.
- 🚀 **Preload & Asynchronous Resource Loader**: Features a custom loader with cache management and a visual loading progress indicator.
- ✨ **Viewport Scrollspy & Animations**: Uses scroll spy tracking paired with smooth scroll adjustments and entrance animations (AOS).

## 📦 Running the project locally

* Install the dependencies by running `npm install`.
* Start the local development server with `npm run dev`.
* Open your browser and navigate to `http://localhost:8080`.
* To compile the project for production, run `npm run build:public`. The optimized bundle will be compiled into the `public` folder, ready for direct deployment (e.g., to Netlify).

## ⚙️ Tech Stack

- Bootstrap 5.3.8
- AOS (Animate On Scroll) 2.3.4
- Fontawesome 7.1.0
- Google Fonts (DM Sans, Libre Caslon Text)
- Custom Font (Joliet-Regular)
- Vanilla JavaScript & CSS

## 🤝 Credits and Adaptation

This project is a bespoke customization and adaptation by [fhbkoller](https://github.com/fhbkoller/weddinvite) based on the original open-source template ["Simple Wedding Invitation Website Template"](https://github.com/dewanakl/invitation) created by [Dewanakl](https://github.com/dewanakl).

## 📜 License

This software is an adaptation of an open-source template licensed under the [MIT License](https://opensource.org/licenses/MIT).

The original template copyright (`Copyright (c) 2023 dewana_kl`) is preserved in the `LICENSE` file in full compliance with the MIT License terms. All custom adaptations, design tokens, and localized visual layouts created for this specific repository are copyrighted under `Copyright (c) 2026 fhbkoller`.
