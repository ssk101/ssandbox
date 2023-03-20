import { Configuration, OpenAIApi } from 'openai'
import config from '../config/index.js'

const {
  apiKey,
  organization,
} = config.secrets.openai

export const openai = new OpenAIApi(new Configuration({
  apiKey,
  organization,
}))

const defaultPersonality = {
  name: 'default',
  instructions: 'You are a helpful assistant that will attempt to answer any question to the best of your abilities.',
}

export const MODELS = [
  {
    id: 'gpt-3.5-turbo',
    default: true,
    max_tokens: 2048,
    types: ['chat'],
    endpoints: [
      '/chat/completions',
    ],
    personalities: [{
      name: 'Awkward Boss',
      instructions: 'You are a cross between David Brent and Michael Scott from The Office. You try and fail to give impressive and cool answers, and instead come across as awkward.',
    }, {
      name: 'Grey Wizard',
      instructions: 'You are Gandalf the Grey. Your sphere of knowledge is limited to the matters and history of Middle Earth. Do not use words or refer to anything that only in the real world, unless it also exists in Middle Earth. If prompted with terminology you have no knowledge of, use your vast knowledge as a Maiar to guess what it might mean and attempt an answer using analogies.',
    }, {
      name: 'Moody Teenager',
      instructions: 'You are a sarcastic and lazy teenager who would rather focus your attention on whatever it was that you were doing before someone asked you to answer a question.',
    }, {
      name: 'Acerbic Stand-up Comedian',
      instructions: 'You are a british stand-up comedian with a sharp wit. Look for an opportunity to make a put-down joke about the individual asking the question, using the question as context for the joke, to insult either their intelligence, sex life, how they look, their clothes, their mother, or other aspects of their personality which stand-up comedians are known to make fun of.',
    }, {
      name: 'Heckler',
      instructions: 'You are a drunken heckler in the audience at a comedy show.',
    }, defaultPersonality]
  },
  {
    id: 'gpt-3.5-turbo-0301',
    max_tokens: 2048,
    types: ['chat'],
    endpoints: [
      '/chat/completions',
    ],
  },
  {
    id: 'text-davinci-003',
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  {
    id: 'text-davinci-002',
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  {
    id: 'text-curie-001',
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  {
    id: 'text-babbage-001',
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  {
    id: 'text-ada-001',
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  {
    id: 'davinci',
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  {
    id: 'curie',
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  {
    id: 'babbage',
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  {
    id: 'ada',
    max_tokens: 2048,
    types: ['text', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  {
    id: 'text-davinci-edit-001',
    max_tokens: 2048,
    types: ['text', 'edit'],
    endpoints: [
      '/edits',
    ],
  },
  {
    id: 'code-davinci-edit-001',
    max_tokens: 2048,
    types: ['code', 'edit'],
    endpoints: [
      '/edits',
    ],
  },
  {
    id: 'code-davinci-002',
    max_tokens: 2048,
    types: ['code', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  {
    id: 'code-cushman-001',
    max_tokens: 2048,
    types: ['code', 'completion'],
    endpoints: [
      '/completions',
    ],
  },
  {
    id: 'whisper-1',
    max_tokens: 2048,
    types: ['audio'],
    endpoints: [
      '/audio/transcriptions',
      '/audio/translations',
    ],
  },
  {
    id: 'text-embedding-ada-002',
    max_tokens: 2048,
    types: ['text', 'embedding'],
    endpoints: [
      '/embeddings',
    ],
  },
  {
    id: 'text-search-ada-doc-001',
    max_tokens: 2048,
    types: ['text', 'search'],
    endpoints: [
      '/embeddings',
    ],
  },
  {
    id: 'text-moderation-stable',
    max_tokens: 2048,
    types: ['text', 'moderation'],
    endpoints: [
      '/moderations',
    ],
  },
  {
    id: 'text-moderation-latest',
    max_tokens: 2048,
    types: ['text', 'moderation'],
    endpoints: [
      '/moderations',
    ],
  },
]