function discordButtonPressed() {
    navigator.clipboard.writeText("Cyvann7#1783");
    text = document.getElementById("copyDiscord")
    text.innerHTML = "<b>&nbsp&nbsp&nbsp&nbsp &gt&gt Copied To Clipboard! </b>";
    setTimeout(() => text.innerHTML = "", 3000);
};

function emailButtonPressed() {
    navigator.clipboard.writeText("James@Sheeley.co.uk");
    text = document.getElementById("copyEmail")
    text.innerHTML = "<b>&nbsp&nbsp&nbsp&nbsp &gt&gt Copied To Clipboard! </b>";
    setTimeout(() => text.innerHTML = "&nbsp&nbsp&nbsp&nbsp &gt&gt Email: James@Sheeley.co.uk", 3000);
};

function twitterButtonPressed() {
    window.location.href = 'https://twitter.com/cyvann7';
};

function contactsButtonPressed() {
    window.location.href = 'contactme.html';
};