const axios = require('axios')

const { config } = require('./config')
const { callOpenAi } = require('./open-ai-client')

jest.mock('axios')

describe('callOpenAi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  const mockPrompt = 'Test prompt'
  const mockApiKey = 'mock-api-key'
  const mockResponse = {
    data: { choices: [{ message: { content: 'Test response' } }] },
  }

  it('calls the OpenAI API with expected parameters', async () => {
    axios.post.mockResolvedValue(mockResponse)

    const response = await callOpenAi(mockPrompt, {
      aiModel: 'test-model',
      apiKey: mockApiKey,
    })

    expect(axios.post).toHaveBeenCalledWith(
      config.clients.openAi.ApiUrl,
      {
        model: 'test-model',
        messages: [{ role: 'user', content: mockPrompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${mockApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    expect(response).toBe('Test response')
  })

  it('throws an error for empty prompt', async () => {
    await expect(callOpenAi('', { apiKey: mockApiKey })).rejects.toThrow(
      'Prompt is empty'
    )
  })

  it('throws an error for empty API key', async () => {
    await expect(callOpenAi(mockPrompt, { apiKey: '' })).rejects.toThrow(
      'API key is empty'
    )
  })

  it('handles axios errors correctly', async () => {
    const error = new Error('Network error')
    axios.post.mockRejectedValue(error)

    await expect(
      callOpenAi(mockPrompt, { apiKey: mockApiKey })
    ).rejects.toThrow(error)
  })
})
