// pm2 process file — keeps the website running and restarts it after crashes or reboots
module.exports = {
  apps: [
    {
      name: 'zubairakbar-website',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '600M',
      env: { NODE_ENV: 'production', PORT: process.env.PORT || 3000 },
    },
  ],
};
