import type { DictShape } from "./dictionaries/fr"

export type Locale = 'fr' | 'en'

export const locales: Locale[] = ['fr', 'en']
export const defaultLocale: Locale = 'en'

export const hasLocale = (locale: string): locale is Locale =>
  (locales as readonly string[]).includes(locale)

const dictionaries = {
  fr: () => import('./dictionaries/fr').then(m => m.dict),
  en: () => import('./dictionaries/en').then(m => m.dict),
}

export const getDictionary = (locale: Locale): Promise<DictShape> =>
  dictionaries[locale]()

export type Dictionary = DictShape
