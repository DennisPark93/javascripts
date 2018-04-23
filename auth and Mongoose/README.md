Create a link aggregator site (like reddit, hacker news, etc.) that supports user registration and login… along with the ability to post articles (links).

Registering or logging in will create an authenticated session that contains all of the logged in user's information. Some elements on pages will only appear when a user is logged in. Some pages will redirect to login if a user arrives unauthenticated.


Features

register a new account
login using an existing account
add a new article
view all posted articles
show a single article's details
prevent / allow access to certain ui elements or pages based on authenticated status


/ - lists all articles
/register - register form
/login - login form
/article/add - add new article form
/article/:slug - detail page for a specific article
