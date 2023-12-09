jest.mock('./open-ai-client', () => ({
  callOpenAi: jest.fn(),
}))

global.popclip = {
  showText: jest.fn(),
  pasteText: jest.fn(),
  showSuccess: jest.fn(),
  modifiers: {
    command: false,
  },
}

const { callOpenAi } = require('./open-ai-client')
const { createHandler, ask, createPrompt } = require('./service')

describe('createHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('creates a handler with the expected structure', () => {
    const handler = createHandler('SUMMARIZE')
    expect(handler).toHaveProperty('title')
    expect(handler).toHaveProperty('icon')
    expect(handler).toHaveProperty('code')
    expect(typeof handler.code).toBe('function')
  })
})

describe('ask', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  it('calls callOpenAi and displayAnswer as expected', async () => {
    callOpenAi.mockResolvedValue('Test answer')
    global.popclip.modifiers.command = false

    await ask('Test prompt', {})

    expect(callOpenAi).toHaveBeenCalledWith('Test prompt', {})
    /* eslint-disable no-undef */
    expect(popclip.pasteText).toHaveBeenCalledWith('Test answer', {
      restore: true,
    })
    /* eslint-enable no-undef */
  })
})

describe('createPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('formats prompt as expected', () => {
    const input = { text: 'test input' }
    const task = { promptText: 'Please do: ' }
    const formattedPrompt = createPrompt(input, task)

    expect(formattedPrompt).toBe('Please do: test input')
  })
})
