import {createApp} from './lib/createApp';
const cluster = require ('cluster');

const PORT = process.env.PORT || 3003;

async function main () {
  try {
    if (cluster.isMaster) {
      var cpuCount = require ('os').cpus ().length;

      for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork ();
      }

      // Listen for terminating workers,restart them if they terminate
      cluster.on ('exit', function (worker) {
        console.log (`Worker ${worker.id} died but it will be restarted`);
        cluster.fork ();
      });
      return null;
    } else {
      const app = await createApp ();
      await app.listen (PORT, async () => {
        console.log (
          `Shopping-list app listening on port: http://localhost:${PORT}`
        );
      });
      return app;
    }
  } catch (error) {
    console.error (error);
    process.exit (1);
    return null;
  }
}

export default main ();
