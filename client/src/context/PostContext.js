export const initialPostState = {
  posts: [],
  postPagination: {
    currentPage: 0,
    totalPage: 0,
  },
  // post= particular post which we view
  post: {
    comments: [],
    commentPagination: {
      currentPage: 0,
      totalPage: 0,
    },
  },
}

export const PostReducer = (state, action) => {
  switch (action.type) {

    // ??????????????
    case 'SET_POSTS':
      console.log("ssettt postsss")
      return {
        ...state,
        posts: action.payload,
      }

    // to view the particular post
    case 'SET_CURRENT_POST':
      return {
        ...state,
        post: action.payload,
      }

    // it is basically when we had done with viewing particular post and we do back or click anything else. this is reverse of above SET_CURRENT_POST
    case 'REMOVE_CURRENT_POST':
      return {
        ...state,
        post: {
          comments: [],
          commentPagination: {
            currentPage: 0,
            totalPage: 0,
          },
        },
      }

    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }

    case 'LIKE_UNLIKE_POST':
      let postIndex = state.posts.findIndex(
        (post) => post.id === action.payload.id,
      )
      state.posts[postIndex] = action.payload
      if (state.post.id === action.payload.id) {
        state.post = action.payload
      }

      return {
        ...state,
      }
     
    case 'POST_PAGINATION':
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        postPagination: {
          ...state.postPagination,
          currentPage: action.payload.currentPage,
          totalPage: action.payload.totalPage,
        },
      }

      // ????????????
    case 'SET_POST_COMMENTS':
      console.log("set postcommmentsssss")
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.payload,
        },
      }

    case 'ADD_POST_COMMENT':
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      }

    case 'LIKE_UNLIKE_COMMENT':
      let commentIndex = state.post.comments.findIndex(
        (comment) => comment.id === action.payload.id,
      )
      state.post.comments[commentIndex] = action.payload

      return {
        ...state,
      }
    
    case 'COMMENT_PAGINATION':
      return {
        ...state,
        post: {
          ...state.post,
          commentPagination: {
            ...state.post.commentPagination,
            currentPage: action.payload.currentPage,
            totalPage: action.payload.totalPage,
          },
          comments:
            state.post.comments && state.post.comments.length
              ? [...state.post.comments, ...action.payload.comments]
              : [...action.payload.comments],
        },
      }

    default:
      throw new Error(`Action type ${action.type} is undefined`)
  }
}
