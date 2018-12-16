import { profileProvider } from './profiler'

function run(lenght: number) {
  const profiler = profileProvider('measure-label')
  const arr: number[] = []

  profiler.start()
  for (let i = 0; i < lenght; i++) {
    arr.push(Math.random())
  }
  profiler.end()
}

run(1e6)
