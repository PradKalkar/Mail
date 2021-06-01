const options = {year: 'numeric', month: 'long', day: 'numeric' };

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener('DOMContentLoaded', function() {
    // Use buttons to toggle between views
    document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
    document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    document.querySelector('#archived').addEventListener('click', () => load_mailbox('archived'));
    document.querySelector('#compose').addEventListener('click', compose_email);
  
    // By default, load the inbox
    load_mailbox('inbox');  
  });
  
function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  history.pushState({mailbox: mailbox}, '', `/${mailbox}`)
  document.querySelector(`#${mailbox}`).disabled = true; // disable the button after its triggered
  document.querySelector("#emails-view").style.display = "block";
  document.querySelector("#compose-view").style.display = "none";

  // Show the mailbox name
  document.querySelector("#emails-view").innerHTML = `<h3>${
    capitalize(mailbox)
  }</h3>`;

  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      emails.forEach(element => {
        const isoDateTime = new Date(element.timestamp);
        const localDateTime = isoDateTime.toLocaleDateString('en-US', options) + " " + isoDateTime.toLocaleTimeString();

        if (mailbox != "sent") {
          sender_recipients = element.sender; // if i am receiving the email, its important to know the sender
        } 
        else {
          sender_recipients = element.recipients; // if I am sending, then the recipients are imp
        }

        if (typeof(sender_recipients) == 'object'){
          if (sender_recipients.length > 1) recipients_to_display = sender_recipients[0] + ', ...';
          else recipients_to_display = sender_recipients[0]
        }
        else{
          recipients_to_display = sender_recipients
        }

        // controlling read-unread feature in inbox
        if (mailbox == "inbox") {
          if (element.read) is_read = "read";
          else is_read = "";
        }
        else is_read = "";

        // check elements subject and if its more than 100 characters long append 3 dots
        let element_subject = element.subject;
        if (element.subject.length > 100){
          element_subject = element_subject.slice(0, 100) + ' ...';
        }

        const item = document.createElement("div");
        if (!element.read){
          item.style.fontWeight = 'bold';
        }

        item.className = `card ${is_read} my-1 items`;

        item.innerHTML = `<div class="card-body" id="item-${element.id}">
        ${element_subject} 
        <br>
        ${recipients_to_display} | ${localDateTime}
      </div>`;

        document.querySelector("#emails-view").append(item);

        item.addEventListener("click", () => {
          show_mail(element.id, mailbox);
        });
      });

      document.querySelector(`#${mailbox}`).disabled = false // now enable the button since our job is done
    });
}

function show_mail(id, mailbox) {
  console.log(mailbox, id);
  history.pushState({mailbox: mailbox, id: id}, '', `/${mailbox}/${id}`)
  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
      const isoDateTime = new Date(email.timestamp);
      const localDateTime = isoDateTime.toLocaleDateString('en-US', options) + " " + isoDateTime.toLocaleTimeString();

      // mark email as read since we have opened up the email
      make_read(id);

      document.querySelector("#emails-view").innerHTML = "";

      let item = document.createElement("div");
      item.className = `card items`;

      let email_body = '';
      for (let i = 0; i < email.body.length; i++){
        if (email.body[i] == '\n'){
          email_body += "<br>"
        }
        else{
          email_body += email.body[i];
        }
      }

  item.innerHTML = `<div style="white-space: no-wrap; word-wrap: break-word">
        <b>Sender</b>: ${email.sender} <br>
        <b>Recipients</b>: ${email.recipients} <br>
        <b>Subject</b>: ${email.subject} <br>
        <b>Time</b>: ${localDateTime} <br>
        <br>${email_body}
      </div>`;

      // when we double click on email, revert to that particular mailbox
      item.ondblclick = () => {
        load_mailbox(mailbox)
      }

      document.querySelector("#emails-view").append(item);

      // creating archive button
      const archive = document.createElement("btn");
      archive.className = `btn btn-outline-info my-2`;

      archive.addEventListener("click", () => {
        toggle_archive(id, email.archived);
      });

      if (!email.archived) archive.textContent = "Archive";
      else archive.textContent = "Unarchive";

      document.querySelector("#emails-view").append(archive);

      // this is not needed when the user is itself the sender of email
      if (email.user === email.sender) return;

      const reply = document.createElement("btn");
      reply.className = `btn btn-outline-success m-2`;
      reply.textContent = "Reply";
      reply.addEventListener("click", () => {
        reply_mail(email.sender, email.subject, email_body, localDateTime);
      });
      document.querySelector("#emails-view").append(reply);
    });
}

function toggle_archive(id, state) {
  fetch(`/emails/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      archived: !state,
    }),
  })
  .then(() => {
    load_mailbox('archived')
  })
  ;
}

function make_read(id) {
  fetch(`/emails/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      read: true,
    }),
  });
}

function reply_mail(sender, subject, body, timestamp) {
  history.pushState({sender: sender, subject: subject, body: body, timestamp: timestamp}, '', 'reply');
  compose_email();
  if (!/^Re:/.test(subject)) subject = `Re: ${subject}`;
  document.querySelector("#compose-recipients").value = sender;
  document.querySelector("#compose-subject").value = subject;

  pre_fill = `On ${timestamp} ${sender} wrote:\n${body}\n\n`;

  document.querySelector("#compose-body").value = pre_fill;
}

window.onpopstate = event => {
  const state = event.state
  console.log(state);
  if ('sender' in state){
    reply_mail(state.sender, state.subject, state.body, state.timestamp);
  }
  else if ('id' in state){
    console.log("Show mail called");
    show_mail(state.id, state.mailbox);
  }
  else{
    load_mailbox(state.mailbox);
  }
}

window.onbeforeunload = () => {
  location.replace('http://127.0.0.1:8000/');
  location.reload();
  return null;
}