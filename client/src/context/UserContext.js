import { filterArray } from '../utils/FilterArray'

export const initialUserState = {

  recentAccounts: [],
  socketio: null,

  // for a particular user
  users: [],  // all users of this website other than current user
  currentUser: null,
  sendedFriendRequests: [],
  receivedFriendRequests: [],
  isLoggedIn: false,

  selectedUserProfile: null,
}

export const UserReducer = (state, action) => {
  switch (action.type) {

    // recent logins
    case 'RECENT_ACCOUNTS':
      console.log(action.payload)
      const accounts = filterArray(action.payload)
      console.log(accounts)
      return {
        ...state,
        recentAccounts: accounts,
        // recentAccounts: [accounts, ...state.recentAccounts],
      }

    case 'ADD_RECENT_ACCOUNT':
      let account = state.recentAccounts.find(
        (account) => account.id === action.payload.id,
      )
      if (account) {
        return {
          ...state,
          recentAccounts: [...state.recentAccounts],
        }
      } 
      else {
        let accounts = []
        accounts = localStorage.accounts
          ? JSON.parse(localStorage.accounts)
          : []
        accounts.push(action.payload)
        localStorage.setItem('accounts', JSON.stringify(accounts))

        return {
          ...state,
          recentAccounts: [action.payload, ...state.recentAccounts],
        }
      }

    case 'UPDATE_PROFILE':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          [action.payload.label]: action.payload.value,
        },
      }

    // removing accounts from recent logins
    case 'REMOVE_ACCOUNT':
  
      let accountsData = []
      accountsData = localStorage.accounts
        ? JSON.parse(localStorage.accounts)
        : []
      accountsData = accountsData.filter((acc) => acc.id !== action.payload)
      localStorage.setItem('accounts', JSON.stringify(accountsData))

      let accountArray = state.recentAccounts.filter(
        (account) => account.id !== action.payload,
      )
      return {
        ...state,
        recentAccounts: accountArray,
      }

    // user which is logged in or LOGIN
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
        isLoggedIn: true,
      }

    // setting all users of website other than current user
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      }

    // ????????????
    case 'ADD_USER':
      console.log(action.payload)
      console.log("Ssssssss")
      console.log(state.users)
      let index_io1 = state.users.findIndex(
        (user) => user.id === action.payload.id,
      )
      if (index_io1 === -1) {
        return {
          ...state,
          users: [action.payload, ...state.users],
        }
      } 
      else {
        return {
          ...state,
        }
      }

    case 'UPDATE_USER':
      console.log("Dddddddddd")
      let i = state.users.findIndex((user) => user.id === action.payload.id)
      if (i !== -1) {
        state.users[i] = action.payload
      }
      return {
        ...state,
        currentUser: action.payload,
      }

    // ?????????????????
    case 'REMOVE_USER':
      let f_users = state.users.filter((user) => user.id !== action.payload)
      return {
        ...state,
        users: f_users,
      }

    case 'LOGOUT_USER':
      if (localStorage.token) {
        localStorage.removeItem('token')
      }
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
        users: [],
        sendedFriendRequests: [],
        receivedFriendRequests: [],
        selectedUserProfile: null,
      }

    // to track 'active or not' status of friends of current user
    case 'FRIEND_LOGOUT':
      let i_friend = state.currentUser.friends.findIndex(
        (user) => user.id === action.payload,
      )
      if (i_friend !== -1) {
        state.currentUser.friends[i_friend].active = false
      }
      return {
        ...state,
      }

    case 'FRIEND_LOGIN':
      let in_friend = state.currentUser.friends.findIndex(
        (user) => user.id === action.payload,
      )
      if (in_friend !== -1) {
        state.currentUser.friends[in_friend].active = true
      }
      return {
        ...state,
      }


    case 'SET_FRIEND_REQUESTS_SENDED':
      return {
        ...state,
        sendedFriendRequests: action.payload,
      }

    case 'ADD_FRIEND_REQUEST_SENDED':
      return {
        ...state,
        sendedFriendRequests: [action.payload, ...state.sendedFriendRequests],
      }

    case 'REMOVE_FRIEND_REQUEST_SENDED':
      let rqs_filtered = state.sendedFriendRequests.filter(
        (r) => r.id !== action.payload,
      )
      return {
        ...state,
        sendedFriendRequests: rqs_filtered,
      }


    case 'SET_FRIENDS_REQUEST_RECEIVED':
      return {
        ...state,
        receivedFriendRequests: action.payload,
      }
    case 'ADD_FRIENDS_REQUEST_RECEIVED':
      return {
        ...state,
        receivedFriendRequests: [
          action.payload,
          ...state.receivedFriendRequests,
        ],
      }

    case 'REMOVE_FRIEND_REQUEST_RECEIVED':
      let rv_f_filtered = state.receivedFriendRequests.filter(
        (r) => r.id !== action.payload,
      )
      return {
        ...state,
        receivedFriendRequests: rv_f_filtered,
      }


    case 'ADD_FRIEND':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friends: [action.payload, ...state.currentUser.friends],
        },
      }

    // ?????????
    case 'DELETE_FRIEND':
      let filtered = state.currentUser.friends.filter(
        (r) => r.id !== action.payload,
      )
      console.log(filtered)
      state.currentUser.friends= filtered
      return {
        ...state,
        // currentUser: {
        //   ...state.currentUser,
        //   friends: [...filtered],
        // },
      }

    // its just clicking on one and viewing their profile.
    case 'ADD_SELECTED_USER_PROFILE':
      return {
        ...state,
        selectedUserProfile: action.payload,
      }

    case 'REMOVE_SELECTED_USER_PROFILE':
      return {
        ...state,
        selectedUserProfile: null,
      }


    case 'SET_SOCKETIO':
      return {
        ...state,
        socketio: action.payload,
      }

    default:
      throw new Error(`Action type ${action.type} is undefined`)
  }
}
