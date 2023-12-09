const { config } = require('./config')

describe('config', () => {
  it('has correct structure for clients', () => {
    expect(config).toHaveProperty('clients')
    expect(config.clients).toHaveProperty('openAi')
    expect(config.clients.openAi).toHaveProperty(
      'ApiUrl',
      'https://api.openai.com/v1/chat/completions'
    )
  })

  it('has correct structure for prompts', () => {
    expect(config).toHaveProperty('prompt')
    expect(Object.keys(config.prompt)).toEqual([
      'PROOFREAD',
      'SUMMARIZE',
      'REFACTOR_CODE',
      'CONVERT_TO_CODE',
      'FORMAT_AS_TICKET',
    ])

    Object.values(config.prompt).forEach((prompt) => {
      expect(prompt).toHaveProperty('title')
      expect(typeof prompt.title).toBe('string')

      expect(prompt).toHaveProperty('promptText')
      expect(typeof prompt.promptText).toBe('string')

      expect(prompt).toHaveProperty('icon')
      expect(typeof prompt.icon).toBe('string')
    })
  })
})
