import fs from 'fs'
import path from 'path'
import from from 'from2'
import through2 from 'through2'

export const concatFiles = (files: string[], outputFileName: string) => {
  const destinationStream = fs.createWriteStream(
    joinRelativePath(outputFileName)
  )
  from
    .obj((size, next) => {
      if (!files.length) return next(null, null)

      next(null, files.pop())
    })
    .pipe(transformStream)
    .pipe(destinationStream)
    .on('finish', () => {
      console.log('end')
    })
}

const transformStream = through2.obj((fileName: string, enc, done) => {
  fs.createReadStream(joinRelativePath(fileName)).on('data', data =>
    done(null, data.toString())
  )
})
const joinRelativePath = (filename: string) => path.join(__dirname, filename)

concatFiles(['input1.txt', 'input2.txt'], './output.txt')
