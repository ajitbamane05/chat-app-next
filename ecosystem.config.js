module.exports = {
  apps: [
    {
      name: 'nodeServer',
      script: 'npm',
      args: 'run dev',
      cwd: '../chat-app-node',
      env: {
        NODE_ENV: 'development'
      },
      interpreter: 'none'
    },
    {
      name: 'nextServer',
      script: 'npm',
      args: 'run dev -- -p 3001',
      cwd: './',
      env: {
        NODE_ENV: 'development'
      },
      interpreter: 'none'
    },
    {
      name: 'socketServer',
      script: './server.js',
    }
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
