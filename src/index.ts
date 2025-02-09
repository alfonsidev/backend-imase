import "reflect-metadata";
import server from './server'
import config from './config/config'
import sequelize from './libs/sequelize'

sequelize.sync().then(() => {
  server.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  })
})
