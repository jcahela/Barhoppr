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
    <a href="https://barhoppr.herokuapp.com/" target="_blank"><strong>Explore the website »</strong></a>
    <br />
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary id="table-of-contents">Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li>
      <a href="#interesting-issues">Interesting Issues</a>
      <ul>
        <li><a href="#drinks-page-action-buttons">Drinks Page Action Buttons</a></li>
        <li><a href="#landing-page-animation---only-animates-once">Landing Page Animation - Only Animates Once</a></li>
      </ul>
    </li>
    <li>
      <a href="#features-to-implement-next">Features to Implement Next</a>
      <ul>
        <li><a href="#comments">Comments</a></li>
        <li><a href="#drink-card-info-when-filtering-by-drink">Drink Card Info When Filtering by Drink</a></li>
      </ul>
    <li><a href="#contact">Contact</a></li>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project 
[Back to top](#table-of-contents)
[![Product Name Screen Shot][product-screenshot]](https://barhoppr.herokuapp.com/)

I chose to clone Untappd because of its interesting premise, which involves users rating beers they've had at different venues, and share their thoughts with other users. The difference between Untappd and Barhoppr though is that Barhoppr doesn't limit drinks to beers, but any alcoholic drink. This project was a cool mix of a review/rating type website and a social media site, and offered some interesting challenges with context and shared state in the React/Redux frontend.

### Built With 
[Back to top](#table-of-contents)
* [AWS - Amazon Web Services](https://aws.amazon.com/)
* [PostgreSQL](https://www.postgresql.org/docs/)
* [Sequelize](https://sequelize.org/v5/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)

<!-- USAGE EXAMPLES -->
## Usage
[Back to top](#table-of-contents)

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

## Interesting Issues:
### Drinks Page Action Buttons
[Back to top](#table-of-contents)

<b>Goal</b>: When creating the Drinks page, I wanted each drink card to use the Checkin action button used on the Bar Talk page that opens up the same Checkin form modal but with that particular drink pre-selected. Clicking on the plus button on the Blue Moon drink card should open the Blue Moon Checkin form so the user can describe their experience and rate it.

<b>Original Solution</b>: In order for a drink to be selected and show the Checkin form modal with that drink's picture and title, I set up state variables in the Checkin form modal component for whether there was a drink selected (drinkSelected) and what the selected drink was (currentDrink). 

<b>Issue</b>: However, I couldn't prop thread the drink variable from the Drink Card component, representing each drink card, to the Checkin form modal to checkin that specific drink, because the Checkin form modal existed as an ancestor component to the Drink Card component in the virtual DOM.

<b>Solution</b>: To fix it, I changed drinkSelected and currentDrink to context variables and wrapped the App component in it, so I could open the modal, set isDrinkSelected to true, and set the drinkSelected variable directly from any component:

[![Product Name Screen Shot][context-example]](https://barhoppr.herokuapp.com/bar-talk)

### Landing Page Animation - Only Animates Once
[Back to top](#table-of-contents)

<b>Goal</b>: I wanted to make an animation that brings the main title of the website, its subtitle, and the action signup button fade and slide in. I also wanted to use this animation as a way to give time for my App to frontload as much of the Redux store as was needed, such as the drinks for the Drinks page, checkins for the Bartalk page, etc.

<b>Original Solution</b>: I was able to use CSS keyframe animations to make the animation seen on the landing page.

<b>Issue</b>: The animation worked well, but it kept repeating any time I would go back to the landing page. So if I clicked on 'Sign Up', then decided I wanted to go back to the landing page and Login, it would replay the animation, which got tedious.

<b>Solution</b>: I made the HTML that had the keyframe classes attached to them only have those classes if the previous host visited was not the host of my website:

[![Product Name Screen Shot][prevhost]](https://barhoppr.herokuapp.com/bar-talk)

In order to do that, I set prevHost as a context variable so that it could be changed from any component. I realized the only links that sent users to the landing page was "Back to Home" on the Sign Up page, or after logging out. If the user tried to manually enter the landing page while logged in, the user would get redirected back to the Bar Talk page, so I didn't have to worry about that. 

So, I set the two links (from the Sign Up page and the Logout button) to also set the prevHost variable as its current host name (window.location.hostname) before sending the user to the landing page. This made it so that the animation only places once, and the only time it repeats is if the user refreshes the page, or enters the website from another host name.

## Features to Implement Next
### Comments
[Back to top](#table-of-contents)

<b>Idea</b>: I think the next extention of this project would be adding a comments feature on each checkin. 

<b>How I would do it</b>: It would be simple to implement, since I could add a comments joins table that connected the Checkins table with a new table named Comments. 

The comments joins table could hold the checkin Id that the comment belongs to, and the comment Id of the comment added to that checkin. The Comments table could hold the comment content, the user Id that made the comment, and the time it was created/edited. 

Then, if I wanted to get a list of comments associated with a Checkin, I could use eager loading in sequelize to get an array of comments, and their associated users, to display the comments in each checkin.

### Drink Card Info When Filtering by Drink
[Back to top](#table-of-contents)

<b>Idea</b>: Adding a drink's drink card, which includes a description of it, its average rating, and the number of ratings it has, would be an interesting addition to put in the Bar Talk page, above the checkins, when users filter checkins by drink, so they can see more information about the drink they're filtering by.

<b>How I would do it</b>: I would import the Drink Card component into the BarTalk page, and when a drink is chosen in the filter drop-down, I would also render that Drink Card component and pass in the drink object that was selected as a prop. React would render that Drink Card which already includes the needed information.

<!-- CONTACT -->
## Contact
[Back to top](#table-of-contents)

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
[context-example]: images/context-example.png
[prevhost]: images/prevhost.png
