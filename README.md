# Lendsqr Frontend Test

This repository contains the solution for the Lendsqr Frontend Test. It includes the implementation of four pages: Login, Dashboard, User page, and User details page. The pages are built using React with TypeScript and styled using SCSS. The data for the User page is fetched from a mock API that provides 500 records. The User details page uses local storage or indexedDB to store and retrieve user details.

## Pages

1. **Login**: This page allows the user to log in using any email and a password of at least 4 characters. Email validation is performed to ensure a valid email format.

2. **Dashboard**: After successful login, the user is redirected to the Dashboard page. This page provides an overview of the application's main functionality.

3. **User page**: This page displays a list of users fetched from the mock API. The list contains 500 records and is paginated for better performance.

4. **User details page**: When a user from the list is selected, the User details page is shown. It retrieves the user's details from local storage or indexedDB and displays them. Users can also update their details on this page.

## Tech Stack

- React: JavaScript library for building user interfaces
- TypeScript: Language of choice for type-checking and enhanced development experience
- SCSS: CSS preprocessor for styling the application

## Deployment

The deployed application can be found at [https://example.com](https://example.com)

## Conclusion

This solution demonstrates the implementation of the Login, Dashboard, User page, and User details page as per the requirements provided in the assessment. React with TypeScript was used as the main technology stack, while SCSS was utilized for styling. The mock API provides 500 user records for the User page, and local storage or indexedDB is used to store and retrieve user details on the User details page.
