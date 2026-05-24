# 💌 Simple Wedding Invitation Website Template

![Thumbnail](/assets/images/banner.webp)

[![Netlify Status](https://api.netlify.com/api/v1/badges/cef32dbf-f26f-4865-84a9-b85a439c9994/deploy-status)](https://app.netlify.com/sites/ulems/deploys)
[![Hits](https://dikit.my.id/0b3y8q)](https://cie.my.id)
[![GitHub repo size](https://img.shields.io/github/repo-size/dewanakl/undangan?color=brightgreen)](https://shields.io)
[![GitHub License](https://img.shields.io/github/license/dewanakl/undangan?color=brightgreen)](https://shields.io)

## 🚀 Demo
For those who want to see the demo first:

[https://ulems.my.id/?to=Friends and family](https://ulems.my.id/?to=Friends%20and%20family)

## 📦 Documentation

* Run the command `npm install`, then `npm run dev`, and open `http://localhost:8080`.
* Modify the content of the `index.html` file as you wish.
* If you don't want to use the **comment feature**, remove the `data-url` and `data-key` attributes in the `<body>` element in index.html.
* Adjust `data-url` in the `<body>` of index and dashboard according to the backend URL (if you are self-hosting).
* Also adjust `data-key` in index with the access key you can get from the dashboard.
* If you want to use GIFs, get a Tenor API key at [developers.google.com/tenor](https://developers.google.com/tenor/guides/quickstart).
* For deployment, run `npm run build:public`. The `public` folder is what you will upload.
* For self-hosting backend, see the explanation below, or use the **trial API** for free.

> This invitation only uses standard HTML, CSS, and JavaScript. NPM is used so that JavaScript files can be executed directly (no longer as modules).

> If you still want to go without NPM, change `src="./dist/guest.js"` to `src="./js/guest.js" type="module"` in the `<head>` tag of index and dashboard.html, with the risk of theme glitch at initial loading.

> If you have questions, use the `discussions` feature so other friends can read them too.

> [!WARNING]  
> Use version 3.14.0, as version 4 is still in development and potentially has bugs 🐛

## 🔥 API Deployment

- Video\
    Coming soon

- Presentation
    [https://docs.google.com/presentation](https://docs.google.com/presentation/d/1EY2YmWdZUI7ASoo0f2wvU7ec_Yt0uZanYa8YLbfNysk/edit)

## ⏰ Trial API
For those who want to try it for free:

[https://trial.ulems.my.id](https://trial.ulems.my.id)

## ⚙️ Tech stack

- Bootstrap 5.3.8
- AOS 2.3.4
- Fontawesome 7.1.0
- Canvas Confetti 1.9.3
- Google Fonts
- Vanilla JS

## 🎨 Credit
All visual assets in this project are sourced from Pixabay.

## 🤝 Contributing

I'm very open to those of you who want to contribute to the invitation!

## 🐞 Security Vulnerabilities

If you find any security vulnerabilities in this invitation, please email DKL via [dewanakretarta29@gmail.com](mailto:dewanakretarta29@gmail.com).

## 📜 License

Invitation is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
