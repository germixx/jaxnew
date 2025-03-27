module.exports = {
  apps: [{
    name: "jax",
    script: "npm",
    args: "start",
    env_production: {
      NODE_ENV: "production",
      PORT: 3002
    }
  }]
};

