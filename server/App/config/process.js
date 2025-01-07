const  fs = require('fs');

module.exports= (logger) => {
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        logger.error(`Uncaught exception: ${err} --- Origin: ${origin}`);
    });
    process.on('uncaughtException', (err,origin) => {
        fs.writeSync(
              process.stderr.fd,
              `Caught exception: ${err.stack}\n` +
              `Exception origin: ${origin}`
            );
        process.exit(1);
    });

    process.on('unhandledRejection', async(reason, p) => {
        await p.catch(err => logger.error(err.stack))
        // logger.error();
        // fs.writeSync(
        //     process.stderr.fd,
        //     `Unhandled rejection at: ${p}\n` +
        //     ` reason: ${reason}\n`
        //   );
        process.exit(1);
    });
    process.on('warning', (warning) => {
        logger.warn(warning.name);    // Print the warning name
        logger.warn(warning.message); // Print the warning message
        logger.warn(warning.stack);   // Print the stack trace
      });
}