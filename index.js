const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    const status = core.getInput('status', { required: true });
    const token = core.getInput('token', { required: true });
    const repo = core.getInput('repo', { required: true });
    const owner = core.getInput('owner', { required: true });
    const issue_number = core.getInput('issue_number', { required: true });

    const labels = ['default'];
    if (status == 'success') {
        labels.push('success');
    } else if (status == 'failure') {
        labels.push('failure');
    }

    core.error('repo:' + repo);
    core.error('owner:' + owner);

    const octokit = new github.getOctokit(token);
    const split = repo.split('/');

    core.error('split1: ' + split[0]);
    core.error('split2: ' + split[1]);

    octokit.rest.issues.addLabels({
        split[0],
        split[1],
        issue_number,
        labels
    });

  }catch (error) {
    core.setFailed(error.message);
  }
}

// Call the main function to run the action
main();