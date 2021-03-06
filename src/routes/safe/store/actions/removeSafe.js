// @flow
import { createAction } from 'redux-actions'

export const REMOVE_SAFE = 'REMOVE_SAFE'

const removeSafe = createAction<string, *>(REMOVE_SAFE)

export default removeSafe
