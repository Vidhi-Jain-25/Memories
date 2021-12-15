export const initialUIState = {
  mdScreen: false,  // mdscreen is the user screen 
                    // mdscreen= true, if includes right or left menus which show up when full screened
                    // mdscreen= false, but when we minimize to half screen, ie menus disappear
  drawer: false,    // drawer is only when the screen is minimized
                    // drawer = true, it is when we click the three lines to open up a drawer.
                    // drawer= false, else or when we close the drawer.
  navDrawerMenu: false, //?????
  postModel: false,
  message: null, // flash messages
  notifications: [],
  loading: false,
  darkMode: false,
}

export const UIReducer = (state, action) => {
  switch (action.type) {

    case 'SET_USER_SCREEN':
      return {
        ...state,
        mdScreen: action.payload,
      }

    case 'SET_DRAWER':
      return {
        ...state,
        drawer: action.payload,
      }

    //  This is displaying of flash messages on doing any actions.
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload,
      }

    // ???????????????????????????????
    case 'SET_NAV_MENU':
      // console.log(action.payload)
      return {
        ...state,
        navDrawerMenu: action.payload,
      }

    case 'SET_POST_MODEL':
      return {
        ...state,
        postModel: action.payload,
      }

    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      }

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'SET_DARK_MODE':
      return {
        ...state,
        darkMode: action.payload,
      }

    default:
      throw new Error(`Action type ${action.type} is undefined`)
  }
}
