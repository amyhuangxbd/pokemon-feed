export const sleep = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time))

  let count = 0

  export async function mockRequest() {
    if (count >= 5) {
      return []
    }
    await sleep(2000)
    count++
    return [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
    ]
  }