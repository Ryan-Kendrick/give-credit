import server from './server'

const PORT = process.env.PORT || 5000

server.listen(PORT, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port', PORT)
})
