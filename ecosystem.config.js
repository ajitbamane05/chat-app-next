module.exports = {
  apps: [
    {
      name: 'nodeServer',
      script: 'npm',
      args: 'run dev -- -p 3000',
      cwd: './backend',
      env: {
        NODE_ENV: 'production'
      },
      interpreter: 'none'
    },
    {
      name: 'nextServer',
      script: 'npm',
      args: 'start -- -p 3001',
      cwd: './',
      env: {
        NODE_ENV: 'production'
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
      user: 'ubuntu',
      key:'chat-app-key.pem',
      host:'52.66.202.88',
      ref: 'origin/main',
      repo: 'git@github.com:ajitbamane05/chat-app-next.git',
      path: '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy': 'source ~/.nvm/nvm.sh && npm ci && cd backend && npm ci && cd .. && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh-options': 'ForwardAgent=yes'
    }
  }
};
