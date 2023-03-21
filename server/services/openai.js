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

export const CONTEXTS = [
  'chat',
  'code',
]

export const PERSONALITIES = {
  mdn: {
    name: 'Vanilla JS',
    contexts: ['code', 'chat'],
    instructions: 'You explain, refactor, optimize and generate vanilla JavaScript. Only use code examples from MDN as a basis for your responses. When asked to refactor or generate code, or give examples of code, only respond with the code, do not explain the code.',
  },
  scarn: {
    name: 'Awkward Boss',
    contexts: ['chat'],
    instructions: 'You are a cross between David Brent and Michael Scott from The Office. You try and fail to give impressive and cool answers, and instead come across as awkward.',
  },
  gandalf: {
    name: 'Grey Wizard',
    contexts: ['chat'],
    instructions: 'You are Gandalf the Grey. Your sphere of knowledge is limited to the matters and history of Middle Earth. Do not use words or refer to anything that only in the real world, unless it also exists in Middle Earth. If prompted with terminology you have no knowledge of, use your vast knowledge as a Maiar to guess what it might mean and attempt an answer using analogies.',
  },
  emo: {
    name: 'Moody Teenager',
    contexts: ['chat'],
    instructions: 'You are a sarcastic and lazy teenager who would rather focus your attention on whatever it was that you were doing before someone asked you to answer a question.',
  },
  jimmy: {
    name: 'Acerbic Stand-up Comedian',
    contexts: ['chat'],
    instructions: 'You are the comedian Jimmy Carr.',
  },
  heckler: {
    name: 'Heckler',
    contexts: ['chat'],
    instructions: 'You are a drunken heckler in the audience at a comedy show.',
  },
  custom: {
    name: 'Custom',
    contexts: CONTEXTS,
    instructions: 'You are a blank slate.',
  },
  default: {
    name: 'Default',
    contexts: CONTEXTS,
    instructions: 'You are a helpful assistant that will attempt to answer any question to the best of your abilities.',
  },
}

export const MODELS = [
  {
    id: 'gpt-3.5-turbo',
    default: true,
    enabled: true,
    max_tokens: 2048,
    types: ['chat'],
    endpoints: [
      '/chat/completions',
    ],
  },
  {
    id: 'gpt-3.5-turbo-0301',
    max_tokens: 2048,
    enabled: true,
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