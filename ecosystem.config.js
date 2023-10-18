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
      user: 'ubuntu',
      key:'chat-app-key.pem',
      host:'13.232.14.31',
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
