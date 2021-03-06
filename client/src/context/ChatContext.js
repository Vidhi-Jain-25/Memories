export const initialChatState = {
  selectedFriend: null,
  messages: [],
}

export const ChatReducer = (state, action) => {
  switch (action.type) {
    
    // show all msgs of selected friend
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      }

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }

    case 'SET_SELECTED_FRIEND':
      return {
        ...state,
        selectedFriend: action.payload,
      }

    default:
      throw new Error(`Action type ${action.type} is undefined`)
  }
}

