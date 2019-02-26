function getJenkinsUrl(pathname) {
    var urls = [
        {
            repo: "Banno/mobile-android",
            url: "https://jenkins.dev.banno-internal.com/job/mobile-android/job/android-tests/view/change-requests/job/PR-{PR}"
        },
        {
            repo: "Banno/conversations-android",
            url: "https://jenkins.dev.banno-internal.com/job/mobile-android/job/conversations/job/tests/view/change-requests/job/PR-{PR}"
        },
        {
            repo: "Banno/zelle-android",
            url: "https://jenkins.dev.banno-internal.com/job/mobile-android/job/zelle/job/tests/view/change-requests/job/PR-{PR}"
        }
    ]

    var pullRequestRegExp = (repo => new RegExp(`/${repo}/pull/(\\d*)`))
    var pullRequestNumber = (repo => pathname.match(pullRequestRegExp(repo))[1])

    return urls
        .filter(x => pullRequestRegExp(x.repo).test(pathname))
        .map(x => x.url.replace("{PR}", pullRequestNumber(x.repo)))
        .shift()
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
