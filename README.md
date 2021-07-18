<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <strong><a href="#about-the-project">About The Project</a></strong>
    </li>
    <li>
      <strong><a href="#deployment">Deployment</a></strong>
    </li>
    <li>
      <strong><a href="#built-with">Built With</a></strong>
    </li>
    <li>
      <strong><a href="#product-screenshots">Product Screenshots</a></strong>
    </li>
    <li>
      <strong><a href="#contact">Contact</a></strong>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<strong>
<ul>
  <li>
    Developed an email web application using django and javascript.
  </li>
  <li>
    While registering for the application, users are free to choose any email-id and password; the same will be used to login into the application when you wish to.
  </li>
  <li>
    The emails you’ll be sending and receiving in this application will be entirely stored in the application's database (they won’t actually be sent to real email servers).
  </li>
  <li>
    Implemented database autentication and wrote the api's for the email communications and authentication in Django. 
  </li>
  <li>
     The applications consists of single page. After login/registering, the user is directed to the "inbox" section. The users can see all the emails which are received from other users within the application's database in the inbox. Moreover, inbox has the ability to distinguish between the read and unread emails by the user.
  </li>
  <li>
    User can compose a new email to any other user/users within the application's database, provided the email address of the desired recipient is known. After sending a mail, a new mail gets added on top of the "Sent" emails. To send email to multiple users, just specify the emails in a comma separated fashion in the "TO" box.
  </li>
  <li>
    A user has the ability to archive any of the sent or the received emails, and all the archived emails are shown in the "Archived" section. We can also "Unarchive" an email back to its origin(i.e. inbox or sent).
  </li>
  <li>
    When a user clicks on any email(sent/received), the user is taken to a view where they see the content of that email i.e.  email’s sender, recipients, subject, timestamp, and body. The user can also reply to any received email by clicking on reply. 
  </li>
</ul>
</strong>

<!-- Deployment -->
## Deployment
The web app is deployed to Heroku
<br>
[Mail](https://pradnesh-mail.herokuapp.com)

## Built With
* [Django](https://www.djangoproject.com)
* [Javascript](https://www.javascript.com)
* [Bootstrap](https://getbootstrap.com)

## Product Screenshots
[![Login][Login]](https://github.com/PradKalkar/Mail)
[![Register][Register]](https://github.com/PradKalkar/Mail)
[![Inbox][Inbox]](https://github.com/PradKalkar/Mail)
[![Sent][Sent]](https://github.com/PradKalkar/Mail)
[![Compose][Compose]](https://github.com/PradKalkar/Mail)
[![View][View]](https://github.com/PradKalkar/Mail)
[![Reply][Reply]](https://github.com/PradKalkar/Mail)
[![Archived][Archived]](https://github.com/PradKalkar/Mail)
[![IncorrectAuth][IncorrectAuth]](https://github.com/PradKalkar/Mail)

<!-- CONTACT -->
## Contact
Pradnesh Kalkar - ppk.kalkar@gmail.com

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Login]: https://github.com/PradKalkar/Mail/blob/master/Screenshots/Login%20Page.png
[Register]: https://github.com/PradKalkar/Mail/blob/master/Screenshots/Register%20Page.png
[Inbox]: https://github.com/PradKalkar/Mail/blob/master/Screenshots/Inbox.png
[Sent]: https://github.com/PradKalkar/Mail/blob/master/Screenshots/Sent.png
[Compose]: https://github.com/PradKalkar/Mail/blob/master/Screenshots/Compose.png
[View]: https://github.com/PradKalkar/Mail/blob/master/Screenshots/Email%20View.png
[Reply]: https://github.com/PradKalkar/Mail/blob/master/Screenshots/Reply.png
[Archived]: https://github.com/PradKalkar/Mail/blob/master/Screenshots/Archived.png
[IncorrectAuth]: https://github.com/PradKalkar/Mail/blob/master/Screenshots/Invalid%20EmailPassword.png
