'use strict';

function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

        let textFirstButton;
        status === 'Closed' ? textFirstButton = 'Open' : textFirstButton = 'Close';

        issuesList.innerHTML += `
        <div class="well">
            <h6>Issue ID: ${id}<h6>
            <p><span class="label label-info">${status}</span></p>
            <h3>${desc}</h3>
            <p> 
                <span class="glyphicon glyphicon-time></span> ${severity} 
                <span class="glyphicon glyhicon-user></span> ${assignedTo}
            </p>
            <a href="#" class="btn btn-warning" onclick="modifyIssue('close', '${id}')">${textFirstButton}</a>
            <a href="#" class="btn btn-danger" onclick="modifyIssue('delete', '${id}')">Delete</a>
        </div>
         `
    }
}

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    let issueId = chance.guid();
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueStatus = 'Open';
    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    let issues;
    localStorage.getItem('issues') === null ? issues = [] : issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}


function modifyIssue(option, id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            if(option == 'close') {
                issues[i].status == "Closed" ? issues[i].status = "Open" : issues[i].status = "Closed";
            } else if(option == 'delete') {
                issues.splice(i, 1);
            }
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}