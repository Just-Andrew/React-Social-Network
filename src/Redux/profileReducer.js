
export const addPost = text => ({ type: 'ADD-POST', text: text });

export const changeCurrentPostText = text => ({ type: 'CHANGE-CURRENT-POST-TEXT', text: text });

let InitialState = {
    CurrentPostText: '',
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

let profileReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'ADD-POST':
            let post = {
                'text': action.text,
                'likes': 0
            };
            return {...state, posts:[post, ...state.posts], CurrentPostText : ''};

        case 'CHANGE-CURRENT-POST-TEXT':
            return {...state, CurrentPostText: action.text};
    }

    return state

}



export default profileReducer;

