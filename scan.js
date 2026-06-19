const scanner = require('/usr/local/lib/node_modules/sonarqube-scanner').default;

scanner(
{
  serverUrl: 'http://3.111.41.145:9000',
  token: 'squ_f85541eda13cf1bb90ea98fb3943c0e38bfba70b',
  options: {
    'sonar.projectKey': 'Portfolio',
    'sonar.projectName': 'Portfolio',
    'sonar.sources': '.'
  }
},
() => process.exit()
);
