import { generateClasses } from '@formkit/themes'

const config = {
  config: {
    classes: generateClasses({
      global: {
        label: 'block text-sm font-medium leading-6 text-gray-700',
        message: 'block text-sm text-red mb-3',
        wrapper: 'space-y-1 mb-1',
        input:
          'block w-full rounded-md border-0 py-2 px-3 text-cool-gray ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6'
      },
      text: {},
      number: {},
      file: {
        noFiles: 'block my-2',
        fileItem: 'hidden'
      },
      select: {},
      submit: {
        input:
          '$reset bg-yellow hover:bg-yellow/90 transition text-white font-bold py-2 px-4 rounded w-full mt-5 active:bg-yellow/70  disabled:opacity-50 disabled:cursor-not-allowed'
      }
    })
  }
}

export default config
