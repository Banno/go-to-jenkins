function getJenkinsUrl(pathname) {
    var urlMap = new Map([
        [new RegExp("/Banno/mobile-android/pull/"), "https://jenkins.dev.banno-internal.com/job/mobile-android/job/android-tests/view/change-requests/job/PR-"],
        [new RegExp("/Banno/conversations-android/pull/"), "https://jenkins.dev.banno-internal.com/job/mobile-android/job/conversations/job/tests/view/change-requests/job/PR-"],
        [new RegExp("/Banno/zelle-android/pull/"), "https://jenkins.dev.banno-internal.com/job/mobile-android/job/zelle/job/tests/view/change-requests/job/PR-"]
    ])

    var jenkinsUrl = null

    urlMap.forEach(function(url, regex) {
        if (regex.test(pathname)) {
            jenkinsUrl = pathname.replace(regex, url);
        }
    });

    return jenkinsUrl;
}

function addButtonIfNecessary() {

    var jenkinsUrl = getJenkinsUrl(window.location.pathname);

    if (jenkinsUrl == null) {
        return;
    }

    var existingButton = document.getElementById("go-to-jenkins-button")
    if (existingButton == null) {
        var button = document.createElement("a")
        button.id = "go-to-jenkins-button"
        button.innerHTML = "Go to Jenkins"
        button.classList.add("btn")
        button.classList.add("btn-sm")
        button.setAttribute("href", jenkinsUrl)

        var actions = document.getElementsByClassName('gh-header-actions')[0];
        actions.appendChild(button)
    }
}

document.addEventListener('pjax:end', addButtonIfNecessary)
addButtonIfNecessary()
