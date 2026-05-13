'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, locales } from './settings'

const runsOnServerSide = typeof window === 'undefined'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`../../messages/${language}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // Let it detect
    detection: {
      order: ['localStorage', 'cookie', 'navigator'], // localStorage priorities
      caches: ['localStorage', 'cookie']
    },
    preload: runsOnServerSide ? locales : []
  })

export function useTranslation(lng?: string, ns?: string, options?: any) {
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret

  useEffect(() => {
    if (i18n.language) {
      document.documentElement.lang = i18n.language
    }
  }, [i18n.language])

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return
      i18n.changeLanguage(lng)
    }, [lng, i18n])
  }
  return ret
}
