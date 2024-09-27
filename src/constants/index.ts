import type { SelectItem } from 'src/types'

export const TABS = [
  {
    title: 'Code',
    href: '/'
  },
  {
    title: 'Document',
    href: '/document'
  }
]

export const SHORT_ID_INITIAL_LENGTH = 5
export const SHORT_ID_MAX_LENGTH = 12

export const DEFAULT_LANGUAGE = 'javascript'
export const DEFAULT_THEME = 'dracula'

export enum DocumentType {
  code = 'code',
  document = 'document'
}

export const LANGUAGES: SelectItem[] = [
  {
    value: 'abap',
    label: 'abap'
  },
  {
    value: 'apex',
    label: 'apex'
  },
  {
    value: 'azcli',
    label: 'azcli'
  },
  {
    value: 'bat',
    label: 'bat'
  },
  {
    value: 'bicep',
    label: 'bicep'
  },
  {
    value: 'cameligo',
    label: 'cameligo'
  },
  {
    value: 'clojure',
    label: 'clojure'
  },
  {
    value: 'coffeescript',
    label: 'coffeescript'
  },
  {
    value: 'c',
    label: 'c'
  },
  {
    value: 'cpp',
    label: 'cpp'
  },
  {
    value: 'csharp',
    label: 'csharp'
  },
  {
    value: 'csp',
    label: 'csp'
  },
  {
    value: 'css',
    label: 'css'
  },
  {
    value: 'cypher',
    label: 'cypher'
  },
  {
    value: 'dart',
    label: 'dart'
  },
  {
    value: 'dockerfile',
    label: 'dockerfile'
  },
  {
    value: 'ecl',
    label: 'ecl'
  },
  {
    value: 'elixir',
    label: 'elixir'
  },
  {
    value: 'flow9',
    label: 'flow9'
  },
  {
    value: 'freemarker2',
    label: 'freemarker2'
  },
  {
    value: 'fsharp',
    label: 'fsharp'
  },
  {
    value: 'go',
    label: 'go'
  },
  {
    value: 'graphql',
    label: 'graphql'
  },
  {
    value: 'handlebars',
    label: 'handlebars'
  },
  {
    value: 'hcl',
    label: 'hcl'
  },
  {
    value: 'html',
    label: 'html'
  },
  {
    value: 'ini',
    label: 'ini'
  },
  {
    value: 'java',
    label: 'java'
  },
  {
    value: 'javascript',
    label: 'javascript'
  },
  {
    value: 'json',
    label: 'json'
  },
  {
    value: 'julia',
    label: 'julia'
  },
  {
    value: 'kotlin',
    label: 'kotlin'
  },
  {
    value: 'less',
    label: 'less'
  },
  {
    value: 'lexon',
    label: 'lexon'
  },
  {
    value: 'liquid',
    label: 'liquid'
  },
  {
    value: 'lua',
    label: 'lua'
  },
  {
    value: 'm3',
    label: 'm3'
  },
  {
    value: 'markdown',
    label: 'markdown'
  },
  {
    value: 'mdx',
    label: 'mdx'
  },
  {
    value: 'mips',
    label: 'mips'
  },
  {
    value: 'msdax',
    label: 'msdax'
  },
  {
    value: 'mysql',
    label: 'mysql'
  },
  {
    value: 'objective-c',
    label: 'objective-c'
  },
  {
    value: 'pascal',
    label: 'pascal'
  },
  {
    value: 'pascaligo',
    label: 'pascaligo'
  },
  {
    value: 'perl',
    label: 'perl'
  },
  {
    value: 'pgsql',
    label: 'pgsql'
  },
  {
    value: 'php',
    label: 'php'
  },
  {
    value: 'pla',
    label: 'pla'
  },
  {
    value: 'postiats',
    label: 'postiats'
  },
  {
    value: 'powerquery',
    label: 'powerquery'
  },
  {
    value: 'powershell',
    label: 'powershell'
  },
  {
    value: 'proto',
    label: 'proto'
  },
  {
    value: 'pug',
    label: 'pug'
  },
  {
    value: 'python',
    label: 'python'
  },
  {
    value: 'qsharp',
    label: 'qsharp'
  },
  {
    value: 'r',
    label: 'r'
  },
  {
    value: 'razor',
    label: 'razor'
  },
  {
    value: 'redis',
    label: 'redis'
  },
  {
    value: 'redshift',
    label: 'redshift'
  },
  {
    value: 'restructuredtext',
    label: 'restructuredtext'
  },
  {
    value: 'ruby',
    label: 'ruby'
  },
  {
    value: 'rust',
    label: 'rust'
  },
  {
    value: 'sb',
    label: 'sb'
  },
  {
    value: 'scala',
    label: 'scala'
  },
  {
    value: 'scheme',
    label: 'scheme'
  },
  {
    value: 'scss',
    label: 'scss'
  },
  {
    value: 'shell',
    label: 'shell'
  },
  {
    value: 'sol',
    label: 'sol'
  },
  {
    value: 'aes',
    label: 'aes'
  },
  {
    value: 'sparql',
    label: 'sparql'
  },
  {
    value: 'sql',
    label: 'sql'
  },
  {
    value: 'st',
    label: 'st'
  },
  {
    value: 'swift',
    label: 'swift'
  },
  {
    value: 'systemverilog',
    label: 'systemverilog'
  },
  {
    value: 'verilog',
    label: 'verilog'
  },
  {
    value: 'tcl',
    label: 'tcl'
  },
  {
    value: 'twig',
    label: 'twig'
  },
  {
    value: 'typescript',
    label: 'typescript'
  },
  {
    value: 'vb',
    label: 'vb'
  },
  {
    value: 'wgsl',
    label: 'wgsl'
  },
  {
    value: 'xml',
    label: 'xml'
  },
  {
    value: 'yaml',
    label: 'yaml'
  },
  {
    value: 'ada',
    label: 'ada'
  },
  {
    value: 'cobol',
    label: 'cobol'
  },
  {
    value: 'd',
    label: 'd'
  },
  {
    value: 'dart',
    label: 'dart'
  },
  {
    value: 'elixir',
    label: 'elixir'
  },
  {
    value: 'erlang',
    label: 'erlang'
  },
  {
    value: 'fortran',
    label: 'fortran'
  },
  {
    value: 'groovy',
    label: 'groovy'
  },
  {
    value: 'haskell',
    label: 'haskell'
  },
  {
    value: 'julia',
    label: 'julia'
  },
  {
    value: 'ocaml',
    label: 'ocaml'
  },
  {
    value: 'octave',
    label: 'octave'
  },
  {
    value: 'racket',
    label: 'racket'
  },
  {
    value: 'sbcl',
    label: 'sbcl'
  },
  {
    value: 'scala',
    label: 'scala'
  }
] as const

export const THEMES: SelectItem[] = [
  {
    value: 'vs',
    label: 'VS'
  },
  {
    value: 'vs-dark',
    label: 'VS Dark'
  },
  {
    value: 'hc-black',
    label: 'High Contrast (Dark)'
  },
  {
    value: 'active4d',
    label: 'Active4D'
  },
  {
    value: 'all-hallows-eve',
    label: 'All Hallows Eve'
  },
  {
    value: 'amy',
    label: 'Amy'
  },
  {
    value: 'birds-of-paradise',
    label: 'Birds of Paradise'
  },
  {
    value: 'blackboard',
    label: 'Blackboard'
  },
  {
    value: 'brilliance-black',
    label: 'Brilliance Black'
  },
  {
    value: 'brilliance-dull',
    label: 'Brilliance Dull'
  },
  {
    value: 'chrome-devtools',
    label: 'Chrome DevTools'
  },
  {
    value: 'clouds-midnight',
    label: 'Clouds Midnight'
  },
  {
    value: 'clouds',
    label: 'Clouds'
  },
  {
    value: 'cobalt',
    label: 'Cobalt'
  },
  {
    value: 'cobalt2',
    label: 'Cobalt2'
  },
  {
    value: 'dawn',
    label: 'Dawn'
  },
  {
    value: 'dracula',
    label: 'Dracula'
  },
  {
    value: 'dreamweaver',
    label: 'Dreamweaver'
  },
  {
    value: 'eiffel',
    label: 'Eiffel'
  },
  {
    value: 'espresso-libre',
    label: 'Espresso Libre'
  },
  {
    value: 'github-dark',
    label: 'GitHub Dark'
  },
  {
    value: 'github-light',
    label: 'GitHub Light'
  },
  {
    value: 'github',
    label: 'GitHub'
  },
  {
    value: 'idle',
    label: 'IDLE'
  },
  {
    value: 'katzenmilch',
    label: 'Katzenmilch'
  },
  {
    value: 'kuroir-theme',
    label: 'Kuroir Theme'
  },
  {
    value: 'lazy',
    label: 'LAZY'
  },
  {
    value: 'magicwb-amiga',
    label: 'MagicWB (Amiga)'
  },
  {
    value: 'merbivore-soft',
    label: 'Merbivore Soft'
  },
  {
    value: 'merbivore',
    label: 'Merbivore'
  },
  {
    value: 'monokai-bright',
    label: 'Monokai Bright'
  },
  {
    value: 'monokai',
    label: 'Monokai'
  },
  {
    value: 'night-owl',
    label: 'Night Owl'
  },
  {
    value: 'nord',
    label: 'Nord'
  },
  {
    value: 'oceanic-next',
    label: 'Oceanic Next'
  },
  {
    value: 'pastels-on-dark',
    label: 'Pastels on Dark'
  },
  {
    value: 'slush-and-poppies',
    label: 'Slush and Poppies'
  },
  {
    value: 'solarized-dark',
    label: 'Solarized-dark'
  },
  {
    value: 'solarized-light',
    label: 'Solarized-light'
  },
  {
    value: 'spacecadet',
    label: 'SpaceCadet'
  },
  {
    value: 'sunburst',
    label: 'Sunburst'
  },
  {
    value: 'dominion-day',
    label: 'Dominion Day'
  },
  {
    value: 'textmate-mac-classic',
    label: 'Textmate (Mac Classic)'
  },
  {
    value: 'tomorrow-night-blue',
    label: 'Tomorrow-Night-Blue'
  },
  {
    value: 'tomorrow-night-bright',
    label: 'Tomorrow-Night-Bright'
  },
  {
    value: 'tomorrow-night-eighties',
    label: 'Tomorrow-Night-Eighties'
  },
  {
    value: 'tomorrow-night',
    label: 'Tomorrow-Night'
  },
  {
    value: 'tomorrow',
    label: 'Tomorrow'
  },
  {
    value: 'twilight',
    label: 'Twilight'
  },
  {
    value: 'upstream-sunburst',
    label: 'Upstream Sunburst'
  },
  {
    value: 'vibrant-ink',
    label: 'Vibrant Ink'
  },
  {
    value: 'xcode-default',
    label: 'Xcode_default'
  },
  {
    value: 'zenburnesque',
    label: 'Zenburnesque'
  },
  {
    value: 'iplastic',
    label: 'iPlastic'
  },
  {
    value: 'idlefingers',
    label: 'idleFingers'
  },
  {
    value: 'krtheme',
    label: 'krTheme'
  },
  {
    value: 'monoindustrial',
    label: 'monoindustrial'
  }
] as const
