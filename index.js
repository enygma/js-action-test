const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    const status = core.getInput('status', { required: true });
    const token = core.getInput('token', { required: true });
    const issue_number = core.getInput('issue_number', { required: true });
    const team = core.getInput('team', { required: true });

    var repo = core.getInput('repo', { required: true });

    const labels = [];
    if (status == 'Approved') {
        labels.push('Reviewed - '+team);
    } else if (status == 'Not Approved') {
        labels.push('HOLD - '+team);
    }

    const octokit = new github.getOctokit(token);
    const split = repo.split('/');

    owner = split[0];
    repo = split[1];

    octokit.rest.issues.addLabels({
        owner,
        repo,
        issue_number,
        labels
    });

  }catch (error) {
    core.setFailed(error.message);
  }
}

// Call the main function to run the action
main();