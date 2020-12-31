import { uid } from 'quasar'

window.dataLayer = window.dataLayer || [];

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

const logEvent = (category: string, action: string, label: string, value: string): void => {
  window.dataLayer.push({
      'event': 'customEvent',
      'category': category,
      'action': action,
      'label': label,
      'value': value,
      'cid': getCid()
  })
}

const logPage = (path: string) => {
  // Here you can preprocess the path, if needed
  window.dataLayer.push({
      'event': 'customPageView',
      'path': path,
      'cid': getCid()
  })
}

const getCid = (): string => {
    // We need an unique identifier for this session
    // We store it in a localStorage, but you may use cookies, too
    if (!localStorage.cid) {
        localStorage.cid = uid();
    }
    return localStorage.cid as string
}

export default {
  logEvent,
  logPage,
  getCid,
}