import express from 'express'
import https from 'https'
import http from 'http'
import { readFileSync } from 'fs'
import { join } from 'path'

import open from 'opn'

const options = {
  key: readFileSync(join(__dirname, './server.key')),
  cert: readFileSync(join(__dirname, './server.crt'))
}

var app = express()
// Create an HTTP service.
http.createServer(app).listen(8080)
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443)

open('https://localhost')
