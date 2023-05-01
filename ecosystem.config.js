module.exports = {
  apps: [
    {
      name: 'API',
      script: './dist',
      args: '',
      instances: -1,
      exec_mode: 'cluster_mode',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_PATH: 'dist/',
        NODE_ENV: 'development',
      },
      env_test: {
        NODE_PATH: 'dist/',
        NODE_ENV: 'test',
      },
      env_staging: {
        NODE_PATH: 'dist/',
        NODE_ENV: 'staging',
      },
      env_production: {
        NODE_PATH: 'dist/',
        NODE_ENV: 'production',
      },
    },
    {
      name: 'WORKER',
      script: 'npm',
      args: 'run worker',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_test: {
        NODE_ENV: 'test',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
