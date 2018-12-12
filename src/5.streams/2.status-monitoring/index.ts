import fs from 'fs'
import split from 'split'
import path from 'path'
import request from 'request'
import fromString from 'from2-string'
import through2Parallel from 'through2-parallel'

export function statusMonitoring(urls: string) {
  fromString(urls)
    .pipe(split(','))
    .pipe(httpStatus())
    .pipe(destination)
    .on('finish', () => console.log('end'))
}

function emulateInput(): string {
  return 'https://google.com,http://example.com,http://foo.bar'
}

function httpStatus() {
  return through2Parallel.obj(
    { concurency: 2 },
    (url: string, enc: any, done: any) => {
      console.log(url)

      if (!url) {
        done(null, null)
      }
      request.head(url, err => {
        const status = err ? 'down\n' : 'up\n'

        done(null, `${url} - ${status}`)
      })
    }
  )
}

const destination = fs.createWriteStream(path.join(__dirname, 'output.txt'))

statusMonitoring(emulateInput())
