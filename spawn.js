const spawn = async (...args) => {
  const { spawn } = require("child_process");
  const options = args[args.length - 1];

  if (process.platform === "win32") {
    options.shell = true;
  }

  return new Promise((resolve, reject) => {
    const proc = spawn(...args);

    proc.stderr.pipe(process.stderr);
    proc.stdout.pipe(process.stdout);
    proc.on("close", resolve);
    proc.on("error", reject);
  });
};

module.exports = {
  spawn,
};
