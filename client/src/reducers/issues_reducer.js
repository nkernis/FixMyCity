import { DID_GET_ISSUES, DID_GET_ISSUE} from '../action_types'

export default (state = [], action) => {
  if (action.error) {
    return state
  }

  switch (action.type) {
    case DID_GET_ISSUES:
      return [...state, ...action.payload]
    case DID_GET_ISSUE:
      return [...state, ...action.payload]
    default:
      return state
  }
}