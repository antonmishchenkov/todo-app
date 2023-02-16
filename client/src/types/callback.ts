import { FormEvent } from "react"

type callback<T = any, Returned = any> =(...args:T[]) => Returned

export type nothingReturnCallback<T> = callback<T, void>
export type formCallback = callback<FormEvent, void>

export default callback