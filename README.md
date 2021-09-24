<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="90">
  </a>

  <h3 align="center">Barhoppr</h3>

  <p align="center">
    A portfolio clone of <a href="https://untappd.com/">Untappd.com</a>
    <br />
    <a href="https://barhoppr.herokuapp.com/"><strong>Explore the website »</strong></a>
    <br />
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#interesting-issues">Interesting Issues</a></li>
    <li><a href="#features-to-implement-next">Features to Implement Next</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://barhoppr.herokuapp.com/)

I chose to clone Untappd because of its interesting premise, which involves users rating beers they've had at different venues, and share their thoughts with other users. The difference between Untappd and Barhoppr though is that Barhoppr doesn't limit drinks to beers, but any alcoholic drink. This project was a cool mix of a review/rating type website and a social media site, and offered some interesting challenges with context and shared state in the React/Redux frontend.

### Built With

* [PostgreSQL](https://www.postgresql.org/docs/)
* [Sequelize](https://sequelize.org/v5/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)

<!-- USAGE EXAMPLES -->
## Usage

Users can signup and login to use Barhoppr, and can login as a demo user to experience the website quickly.

[![Product Name Screen Shot][signup]](https://barhoppr.herokuapp.com)
[![Product Name Screen Shot][login]](https://barhoppr.herokuapp.com/signup)
<br>
<br>
Once logged in, the user is directed to the Bar Talk page, where logged-in users can view a global feed of checkins from other users, and post their own checkins.

[![Product Name Screen Shot][bartalk]](https://barhoppr.herokuapp.com/signup)

Included on the Bar Talk page are the following:

1. The Checkin Button - allows users to checkin and rate a drink in the database
2. The Sort By selector - users can sort the Bar Talk page by newest to oldest, oldest to newest, by rating highest to lowest, and by rating lowest to highest.
3. The Filter By selector - users can filter the Bar Talk page by drink, and see only the checkins for a particular drink. The user can then sort the specific drink checkin by any of the Sort By selections
4. Top 5 Rated Drinks - As checkins get added, the average rating of each drink is calculated, and the top 5 rated drinks are dynamically set to this list

### Checking In:
[![Product Name Screen Shot][checkin]](https://barhoppr.herokuapp.com/bar-talk)

### Sorting and Filtering
[![Product Name Screen Shot][sortingfiltering]](https://barhoppr.herokuapp.com/bar-talk)

### Editing and Deleting Checkins
[![Product Name Screen Shot][editingdeleting]](https://barhoppr.herokuapp.com/bar-talk)

<br>
<br>
Over on the My Profile page, users can view their profile, which includes their checkin activity. Users can also change their profile picture.
<br>
<br>

[![Product Name Screen Shot][profilepage]](https://barhoppr.herokuapp.com/bar-talk)
<br>
<br>
On the Drinks page, users can view a list of drinks, and check them in by clicking their individual checkin buttons. Users can create a new drink to review by clicking the New Drink card:

[![Product Name Screen Shot][drinks]](https://barhoppr.herokuapp.com/bar-talk)
<br>
<br>
If a user can't find a drink they want to checkin, they can create a new one:

[![Product Name Screen Shot][newdrink]](https://barhoppr.herokuapp.com/bar-talk)
When creating a checkin on the Drinks page, you can see the rating average and number of ratings on that drink set dynamically.

## Interesting Issues

## Features to Implement Next

<!-- CONTACT -->
## Contact

Jason Cahela - [LinkedIn](https://www.linkedin.com/in/jason-cahela/) - jpacahela@gmail.com

Project Repo Link: [https://github.com/jcahela/Barhoppr](https://github.com/jcahela/Barhoppr)

Project Link: [https://barhoppr.herokuapp.com/](https://barhoppr.herokuapp.com/)




















<!-- ACKNOWLEDGEMENTS --

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/barhoppr_landing.gif
[signup]: images/signuppage.png
[login]: images/loginmodal.png
[bartalk]: images/bartalk.png
[checkin]: images/checkingin.gif
[sortingfiltering]: images/sortingfiltering.gif
[editingdeleting]: images/editingdeleting.gif
[profilepage]: images/profilepage.gif
[drinks]: images/drinks.gif
[newdrink]: images/newdrink.gif
