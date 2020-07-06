//import profileReducer, {addPost} from './profileReducer'
let InState = {
    posts: [
        {
            id: 1,
            'text': 'Here is supposed to be sth... sooo',
            'likes': 7
        },
        {
            id: 2,
            'text': 'Hi there!',
            'likes': 0
        },
        {
            id: 3,
            'text': 'The Earth is flat!!!',
            'likes': 11
        }
    ]
}
const addPost = text => ({ type: 'ADD-POST', text })

let profileReducer = (state = InState, action) => {
    switch (action.type) {
        case 'ADD-POST':
            let post = {
                'text': action.text,
                'likes': 0
            };
            return { ...state, posts: [post, ...state.posts] }
    }
    return state
}

it('checking reducer for correctly addigng new post', () => {
    // 1) data

    let action = addPost('new post')

    // 2) action
    let newState = profileReducer(InState, action)

    // 3) expectation
    expect(newState.posts.length).toBe(InState.posts.length + 1)

});
