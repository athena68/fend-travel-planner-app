# Travel Planner App Project

## Overview
A Web App help you to create travel planner for the place you want to travel to.
It provides
- Image of destination
- Weather data of destination
- A countdown to planned travel date

## Instructions
### Getting started

You will need to install everything:

`cd` into your new folder and run:
- `npm install`

### Setting up the API
You will be using the Geonames API / Weatherbit API / Pixabay API for this project.
So firstly, you have to create accounts and you will be given a license key to start using the API.

### Create your own .env file
- [ ] Create a new ```.env``` file in the root of your project
- [ ] Go to your .gitignore file and add ```.env``` - this will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys was pointless.
- [ ] Fill the .env file with your API keys like this:

```
GEONAME_API_KEY=**************************
WEATHER_API_KEY=**************************
PIXABAY_API
```

## Running
- `npm run build-prod`
- `npm run start`

