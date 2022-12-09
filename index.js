const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    const status = core.getInput('status', { required: true });
    const token = core.getInput('token', { required: true });
    const repo = core.getInput('repo', { required: true });
    const owner = core.getInput('owner', { required: true });
    const issue = core.getInput('issue', { required: true });

    const labels = [];
    if (status == 'success') {
        labels.push('success');
    } else if (status == 'failure') {
        labels.push('failure');
    }

    const octokit = new github.getOctokit(token);

    octokit.rest.issues.addLabels({
        owner,
        repo,
        issue,
        labels
    });

  }catch (error) {
    core.setFailed(error.message);
  }
}

// Call the main function to run the action
main();