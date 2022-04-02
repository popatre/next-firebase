<!-- Make sure the file always includes the following elements:

Titles and internal titles
Introduction - the project's aim
Technologies
Launch

Consider also using additional elements such as:

Table of contents
Illustrations
Scope of functionalities
Examples of use
Project status
Sources
Other information -->

# Table of Contents

-   General Info
-   Technologies
-   Setup
-   Using the app

# General Info

This project's aims were to explore the functionalities of the Next.js framework, as well as Google's Firebase suite.

The result was a news site, which enables users to login using their Google email, browse current user stories, as well as write, edit, posts and delete their own stories to the site.

Images can also be uploaded and posts can be styled using markdown.

The site uses Firestore rules to improve security, as well as Firebase authorisation.

I followed the Fireship.io course to build the basic site, then added extra features from this foundation.

**A hosted version of the site can be found here: https://next-firebase-news.vercel.app/**

## Technologies

-   Node v.16.14.0
-   Next.js v.12.1.0
-   React.js v.17.0.2
-   Firebase v.9.6.8 - (Auth, Storage, Firestore)
-   React firebase hooks v.5.0.3
-   React hot toast v.2.2.0
-   React markdown v.8.0.1
-   Lodash
-   Vercel continuous deployment
-   React Hooks - (useState, useEffect, useContext, useCallBack)

## Setup

1.  Clone this repository to your usual file directory for project. To do this, run the following command in your terminal

        git clone https://github.com/popatre/next-firebase.git

2.  Open the directory in your usual code editor and then run the following command to install the dependencies needed to run the project

        npm install

3.  This project uses Firebase to collect the data from a database. You will need to set up your own firebase account, create a new web app, and then copy the configuration code provided, into the firebase.js file.

It should look something like this.

        const firebaseConfig = {
            apiKey: YOUR CONFIG DETAILS HERE,
            authDomain: YOUR CONFIG DETAILS HERE,
            projectId: YOUR CONFIG DETAILS HERE,
            storageBucket: YOUR CONFIG DETAILS HERE,
             messagingSenderId: YOUR CONFIG DETAILS HERE,
             appId: YOUR CONFIG DETAILS HERE,
             measurementId: YOUR CONFIG DETAILS HERE,
             };

You may need to also enable 'auth' from the 'auth' tab in firebase, then enable Google in the providers.

4. To start the project, type the command `npm run dev`. This should enable you to see the project running at `localhost:3000`, in your browser.

5. As you have created a new firebase account and database, there should be no posts available. You should be able to log in using your google email, and create posts to appear in the news feed.

## Using the App

Users can sign in using the 'log in' button, and use the Google email to do this.

A signed in user can then add a new post, edit their previous posts, publish/un-publish their posts, as well as delete them. Users cannot delete or edit a post that is not their own. If a user it not signed in, they do not have access to edit/delete.

The main home page displays the most recent news posts. These are server side rendered.
Clicking 'load more' updates the state with the next lot of posts. These are client side rendered.

Users can view their own profile page by clicking their google image icon. This will display 5 of their most recent posts. They can view another user's posts by typing in their username into the URL. When a user is on their own profile page, they have the option to edit their own posts.

Editing can also be done through the 'manage posts' button/link, which also enables a user to delete, and view if their posts of published or not.

The manage posts page is client side rendered, due to it not being a public page, and needing realtime information.

Click a post on the home page will enable a user to view the post in more detail. These post pages of static pages, with data originally fetched at build time. There is also realtime data hydrating the page using reactbase-hooks. As a fallback, the static page wil be provided if the data has not been fetched in time.

Logged in users can heart each other's posts. A user can only heart a post once, and this is logged in the firestore database when they do, creating a many to many relationship.
