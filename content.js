function getJenkinsUrl(pathname) {
    const androidJobPath = "https://jenkins.dev.banno-internal.com/job/mobile-android/job"
    const urls = [
        {
            repo: "Banno/mobile-android",
            url: `${androidJobPath}/android-tests/view/change-requests/job/PR-{PR}`
        },
        {
            repo: "Banno/conversations-android",
            url: `${androidJobPath}/conversations/job/tests/view/change-requests/job/PR-{PR}`
        },
        {
            repo: "Banno/zelle-android",
            url: `${androidJobPath}/zelle/job/tests/view/change-requests/job/PR-{PR}`
        }
    ]

    const pullRequestRegExp = (repo => new RegExp(`/${repo}/pull/(\\d*)`))
    const pullRequestNumber = (repo => pathname.match(pullRequestRegExp(repo))[1])

    return urls
        .filter(x => pullRequestRegExp(x.repo).test(pathname))
        .map(x => x.url.replace("{PR}", pullRequestNumber(x.repo)))
        .shift()
}

function addButtonIfNecessary() {

    const jenkinsUrl = getJenkinsUrl(window.location.pathname);

    if (jenkinsUrl == null) {
        return;
    }

    const existingButton = document.getElementById("go-to-jenkins-button")
    if (existingButton == null) {
        var button = document.createElement("a")
        button.id = "go-to-jenkins-button"
        button.innerHTML = "Go to Jenkins"
        button.classList.add("btn")
        button.classList.add("btn-sm")
        button.setAttribute("href", jenkinsUrl)

        const actions = document.getElementsByClassName('gh-header-actions')[0];
        actions.appendChild(button)
    }
}

document.addEventListener('pjax:end', addButtonIfNecessary)
addButtonIfNecessary()
