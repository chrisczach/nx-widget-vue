const instanceArg = process.argv.reverse()[0]

export const devServer = 'http://127.0.0.1:3000'
export const cloudInstance = instanceArg === '--' ? 'https://127.0.0.1:9000' : instanceArg
