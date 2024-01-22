module.exports = {
    apps: [
      {
        name: 'server',
        script: 'dist/main.js',
        exec_mode: 'cluster',
        instances: 2,
        restart_delay: 500,
      },
    ],
  };