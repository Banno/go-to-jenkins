function isPullRequest() {
    return window.location.pathname.match(/pull\/\d+/) != null
}

function jenkinsUrl() {
    return window.location.pathname
        .match(/pull\/\d+/)[0]
        .replace(/pull\//, "https://jenkins.dev.banno-internal.com/job/mobile-android/job/android-tests/view/change-requests/job/PR-");
}

function addButtonIfNecessary() {
    if (!isPullRequest()) {
        return;
    }

    var existingButton = document.getElementById("go-to-jenkins-button")
    if (existingButton == null) {
        var button = document.createElement("a")
        button.id = "go-to-jenkins-button"
        button.innerHTML = "Go to Jenkins"
        button.classList.add("btn")
        button.classList.add("btn-sm")
        button.setAttribute("href", jenkinsUrl())

        var actions = document.getElementsByClassName('gh-header-actions')[0];
        actions.appendChild(button)
    }
}

document.addEventListener('pjax:end', addButtonIfNecessary)
addButtonIfNecessary()
