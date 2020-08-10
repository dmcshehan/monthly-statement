# Monthly Statement

[![github starts](https://img.shields.io/github/stars/dmcshehan/monthly-statement)](https://github.com/dmcshehan/monthly-statement/stargazers) [![github issues](https://img.shields.io/github/issues/dmcshehan/monthly-statement)](https://github.com/dmcshehan/monthly-statement/issues) [![github license](https://img.shields.io/github/license/dmcshehan/monthly-statement)](https://github.com/dmcshehan/monthly-statement/blob/master/LICENSE.md) [![live demo](https://img.shields.io/badge/Demo-online-success?logo=firebase&style=plastic)](https://monthly-statement-cf95d.firebaseapp.com/)

A monthly expense management application built with pure JavaScript and Redux. You can add montly expenses and incomes. It shows the total monthly expenses and incomes. I have developed a seperate [backend](https://github.com/dmcshehan/monthly-statement-backend) for this application.

## Buy me a coffee

Whether you use this project, have learned something from it, or just like it, please consider supporting it by buying me a coffee, so I can dedicate more time on open-source projects like this :)

<a href="https://www.buymeacoffee.com/dmcshehan" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## Features

- Bulma React Components
- Monthly expenses/incomes

## Setup

1.  Clone this repo to your computer.
2.  Clone [backend](https://github.com/dmcshehan/monthly-statement-backend) repo to your computer.

## Usage

### Method 01 (Without Backend Server on Local Machine)

1.  Navigate to the root folder
2.  Run `npm install` or `yarn install` in the project root folder to install all the dependencies.
3.  Run `npm start` or `yarn start` in order to start the project in your local enviroment (`http://localhost:3000/`)

### Method 02 (With Backend Server on Local Machine)

1.  Navigate to the `monthly-statement-backend` folder
2.  Run `npm install` or `yarn install` in the project root folder to install all the dependencies.
3.  Run `npm start` or `yarn start` in order to start the project in your local enviroment (`http://localhost:3000/`)
4.  Navigate to `monthly-statement` folder
5.  Chnage `baseURL` of `src/js/shared/axios.js` to the URL where the backend app is running (Example : `http://localhost:3000/`)
6.  Run `npm install` or `yarn install` in the project root folder to install all the dependencies.
7.  Run `npm start` or `yarn start` in order to start the project in your local enviroment (`http://localhost:3001/`)
