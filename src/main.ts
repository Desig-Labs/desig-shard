import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'app/app.module'
import morgan from 'morgan'
import configuration from 'config/configuration'

async function bootstrap() {
  // Init
  const app = await NestFactory.create(AppModule)
  // Middleware
  app.enableCors({ origin: '*', credentials: true })
  app.use(
    morgan('tiny', {
      skip: ({ url }) => url === '/health',
    }),
  )
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  // Start
  const PORT = configuration().server.port
  const IP = configuration().server.ip
  const ROOT = configuration().level.root
  await app.listen(PORT)
  console.info(
    `⚡️[server]: Server is running at http://localhost:${PORT} or http://${IP}:${PORT}`,
  )
  console.info(`⚡️[server]: LevelDB is mounted in ${ROOT}`)
}
bootstrap()
