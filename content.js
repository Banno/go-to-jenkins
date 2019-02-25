function getJenkinsUrl(pathname) {
    var urlMap = [
        { regexp: new RegExp("/Banno/mobile-android/pull/"), url: "https://jenkins.dev.banno-internal.com/job/mobile-android/job/android-tests/view/change-requests/job/PR-" },
        { regexp: new RegExp("/Banno/conversations-android/pull/"), url: "https://jenkins.dev.banno-internal.com/job/mobile-android/job/conversations/job/tests/view/change-requests/job/PR-" },
        { regexp: new RegExp("/Banno/zelle-android/pull/"), url: "https://jenkins.dev.banno-internal.com/job/mobile-android/job/zelle/job/tests/view/change-requests/job/PR-" }
    ]

    return urlMap.filter(x => x.regexp.test(pathname)).map(x => pathname.replace(x.regexp, x.url)).find(x => true)
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
