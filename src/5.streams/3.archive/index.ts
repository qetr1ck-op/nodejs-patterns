import zlib from 'zlib'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import combinePipe from 'multipipe'

const algorithm = 'aes192'

export function compressAndEncrypt(password = 'password'): NodeJS.ReadStream {
  return combinePipe(
    zlib.createGzip(),
    crypto.createCipher(algorithm, password)
  )
}

export function decompressAndDecrypt(password = 'password'): NodeJS.ReadStream {
  return combinePipe(
    crypto.createDecipher(algorithm, password),
    zlib.createUnzip()
  )
}

function encrypt() {
  return combinePipe(
    fs.createReadStream(path.join(__dirname, 'input.txt')),
    compressAndEncrypt(),
    fs.createWriteStream(path.join(__dirname, 'output-encrypt.txt')),
    () => console.log('done')
  ).on('error', e => console.log(e))
}

function decrypt() {
  return combinePipe(
    fs.createReadStream(path.join(__dirname, 'output-encrypt.txt')),
    decompressAndDecrypt(),
    fs.createWriteStream(path.join(__dirname, 'output-decrypt.txt')),
    () => console.log('done')
  ).on('error', e => console.log(e))
}

encrypt()
// decrypt()
