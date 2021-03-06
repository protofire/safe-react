// @flow
import Cookies from 'js-cookie'
import { getNetwork } from '~/config'

const PREFIX = `v1_${getNetwork()}`

export const loadFromCookie = async (key: string): Promise<*> => {
  try {
    const stringifiedValue = await Cookies.get(`${PREFIX}__${key}`)
    if (stringifiedValue === null || stringifiedValue === undefined) {
      return undefined
    }

    return JSON.parse(stringifiedValue)
  } catch (err) {
    console.error(`Failed to load ${key} from cookies:`, err)
    return undefined
  }
}

export const saveCookie = async (key: string, value: *, expirationDays: number): Promise<*> => {
  try {
    const stringifiedValue = JSON.stringify(value)
    const expiration = expirationDays ? { expires: expirationDays } : undefined
    await Cookies.set(`${PREFIX}__${key}`, stringifiedValue, expiration)
  } catch (err) {
    console.error(`Failed to save ${key} in cookies:`, err)
  }
}
