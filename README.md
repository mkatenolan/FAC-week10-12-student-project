# FAC-Weeks 10-12 - 1 week design + 2 week build using Express.js, Handlebars & PostgreSQL

![](https://i.imgur.com/8DiFb4A.png)

[![Build Status](https://travis-ci.org/fac-17/NomNom.svg?branch=master)](https://travis-ci.org/fac-17/NomNom)

#### The planning meal app

#### Project idea

Build a planning meal app that suggest a week-long meal plans with common ingredients and provides healthy options in order to reduce food waste.

#### User journey

Noah is a 30 years old boy that never has time to get creative with his cooking and feels guilty about wasting food.

#### User Stories

- As a user I want to know straight away what the app does on the landing page.
- As a user, I want to be offered a range of recipes to choose from for inspiration.
- As a user I want to be able to select two recipes I like the look and sound of quickly and easily.
- As a user I want to be able to quickly search through the currently existing meal plans and get a summary of their common ingredients, healthiness and average time.
- As a user I want to be able to input my dietary requirements (and allergies?).
- As a user I want to be able to see my meal plan for the week at a quick glance.
- As a user I want to have access to an easily readable shopping list covering everything I need for that week.
- As a user I want to be able to send myself a meal plan and select the number of days
- As a user I want to be able to share my meal plan via social media.
- As a user I want to be able to create a new meal plan from anywhere in the app

## Process


1. The user **pick two recipes** that like to cook that week.
2. The **app suggests additional recipes** with similar ingredients and the user can pick up 3 additional recipes 
3. The app provides shopping list for the week.
4. The user can email the shopping list to himself.

## The team and our agile roles

Martha: UX/UI
Victor: SCRUM
Fran: DevOps
Tony: QA

https://github.com/fac-17/student-project-ideas/issues/10

---
### Design week

1. Define a long-term goal
2. How might we
3. The crazy 8
4. User survey
5. Create a figma prototype 


#### Figma prototype

![](https://i.imgur.com/Sylxsks.png)


![](https://i.imgur.com/SaV41yR.png)

Check it out here :
https://www.figma.com/file/O7eqqYMd8CvnsmpfZ9xM73/Meal-Planning-Prototype?node-id=0%3A1


### Our goals 
- [ ] Build an app using the Express framework.
- [ ] Use a PostgreSQL database to store and retrieve your data.
- [ ] Use the retrieved data to populate a Handlebars template for server-side rendering to be displayed on the front-end.
- [ ] Include tests and set up code coverage.
- [ ] Unit tests of pure functions, and integration tests of your server routes, including tests for errors such as 404.
- [ ] Write tests for your database and use a separate test database and build script.
- [ ] Use Heroku to host the app and the database.
- [ ] Use Travis for test coverage 


### Our stretch goals

- [ ] Allow user to track which recipes they've made and give them a score every week of how many they've made which use common ingredients.
- [ ] Thumbs up/down rating on recipes so you do or don't seem them again.
- [ ] Share meal plan with friends and share ingredients
