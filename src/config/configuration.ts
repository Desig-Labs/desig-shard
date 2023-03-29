import appRootPath from 'app-root-path'
import ip from 'ip'

const env = process.env.NODE_ENV || 'development'
const configuration = () => ({
  server: {
    env,
    port: parseInt(process.env.PORT, 10) || 10000,
    ip: ip.address() as string,
  },
  throttler: {
    ttl: env === 'development' ? 5 : 24 * 60 * 60,
    limit: env === 'development' ? 3 : 10,
  },
  myid: process.env.MY_ID || '',
  level: {
    root:
      env === 'development'
        ? appRootPath.resolve('./.level')
        : '/var/lib/.level',
  },
})

export type EnvironmentVariables = ReturnType<typeof configuration>

export default configuration
