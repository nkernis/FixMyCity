import { DID_GET_ISSUES, DID_GET_ISSUE} from '../action_types'

const API_URL = 'http://localhost:3000/api/v1/issues/'

// Will need to use redux-thunk middleware and/or redux-promise-middleware

// export const getIssues = () => {
//   return {
//     type: DID_GET_ISSUES,
//     payload: fetch(API_URL)
//     .then(res => res.json())
//     .then(issues => issues)
//   }
// }

export const getIssues = () => {
  return ({
    type: DID_GET_ISSUES,
    payload: [{name: "Carl"}]
  })
}

export const getIssue = (id) => {
  return {
    type: DID_GET_ISSUE,
    payload: fetch(API_URL + `${id}`)
    .then(res => res.json())
    .then(issue => issue)
  }
}
