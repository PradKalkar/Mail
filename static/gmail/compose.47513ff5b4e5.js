document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#compose-form')
    const msg = document.querySelector('#message')

    form.onsubmit = () => {
        const to = document.querySelector('#compose-recipients')
        const subject = document.querySelector('#compose-subject')
        const body = document.querySelector('#compose-body')

        // call the compose email API asynchronously
        fetch("/emails", {
            method: "POST",
            body: JSON.stringify({
                recipients: to.value,
                subject: subject.value,
                body: body.value
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.status == 201){
                load_mailbox('sent') // email is sent successfully, so load the sent emails
            }
            else{
                msg.innerHTML = `<div class="alert alert-danger" role="alert"> ${result.error} </div>`;
            }
        })

        // prevent the form from submitting to server and reloading the page
        // we will do the form submission asyncronously
        return false;
    }
})