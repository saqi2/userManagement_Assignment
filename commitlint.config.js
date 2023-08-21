module.exports = {
  extends: ['jira'],
  plugins: ['commitlint-plugin-jira-rules'],
  rules: {
    'jira-task-id-empty': [2, 'never'],
    'jira-task-id-max-length': [2, 'always', 10],
    'jira-task-id-case': [2, 'always', 'uppercase'],
    'jira-task-id-separator': [2, 'always', '-'],
    'jira-task-id-project-key': [2, 'always', 'AVIP'],
  },
};
