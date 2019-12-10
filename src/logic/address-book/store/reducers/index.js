// @flow
import { Map } from 'immutable'
import { handleActions, type ActionType } from 'redux-actions'
import { SET_NAMES_FOR_ADDRESSES } from '../actions'

export const ADDRESS_BOOK_REDUCER_ID = 'addressesToName'

export type State = Map<string, string>

export default handleActions<State, *>(
  {
    [SET_NAMES_FOR_ADDRESSES]: (state: State, action: ActionType<Function>): State => {

    },
    [ADD_TOKEN]: (state: State, action: ActionType<Function>): State => {
      const { token } = action.payload
      const { address: tokenAddress } = token

      return state.set(tokenAddress, makeToken(token))
    },
    [REMOVE_TOKEN]: (state: State, action: ActionType<Function>): State => {
      const { token } = action.payload
      const { address: tokenAddress } = token

      return state.remove(tokenAddress)
    },
  },
  Map(),
)
