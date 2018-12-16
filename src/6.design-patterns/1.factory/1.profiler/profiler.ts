abstract class BaseProfiler {
  start() {}
  end() {}
}

class Profiler extends BaseProfiler {
  private startTime: [number, number] = [0, 0]

  constructor(private label: string) {
    super()
  }

  start() {
    this.startTime = process.hrtime()
  }

  end() {
    const [s, ms] = process.hrtime(this.startTime)
    console.log(`This ${this.label} took - ${s}s. ${ms} ms.`)
  }
}

class NullProfiler extends BaseProfiler {}
class MockedProvider extends BaseProfiler {}

export function profileProvider(label: string) {
  switch (process.env.NODE_ENV) {
    case 'development':
      return new Profiler(label)
    case 'production':
      return new NullProfiler()
    case 'test':
      return new MockedProvider()
    default:
      throw new Error('init Profiler error')
  }
}
