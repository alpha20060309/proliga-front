// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: "proliga-front",          // any name you want
      script: "pnpm",                 // the command to run
      args: "start",                  // equivalent to `pnpm start`
      interpreter: "none",            // prevents PM2 from using node
      cwd: "D:/Projects/proliga-front", // ensure you're in correct working directory (slashes `/` or `\\`)
      kill_timeout: 1000,
      listen_timeout: 10000,
      autorestart: true,              // automatically restart the app if it crashes
      shutdown_with_message: true,
      env: {
        NODE_ENV: "production",
      }
    }
  ]
}
