export const addMessage = text => ({ type: 'ADD-MESSAGE', text })
let InitialState = {
    messages: [
        {
            id: 0,
            message: 'g and typesetting industry. Lorem Ipum ha',
            mine: false
        },
        {
            id: 1,
            message: 'Havent heard from you for a while?',
            mine: true
        },
        {
            id: 2,
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took',
            mine: false
        },
        {
            id: 3,
            message: 'Same, just got back from holiday',
            mine: true
        },
        {
            id: 4,
            message: 'How was it?',
            mine: false
        },
        {
            id: 5,
            message: 'Saw photos you posted',
            mine: false
        },
        {
            id: 6,
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. L',
            mine: true
        },
        {
            id: 7,
            message: 'Hi, what\'s up?',
            mine: false
        },
        {
            id: 8,
            message: 'Havent heard from you for a while?',
            mine: true
        },
        {
            id: 9,
            message: 'Fine, u?',
            mine: false
        },
        {
            id: 10,
            message: 'Same, just got back from holiday',
            mine: true
        },
        {
            id: 11,
            message: 'How was it?',
            mine: false
        },
        {
            id: 12,
            message: 'Saw photos you posted, look rlly cool',
            mine: false
        },
        {
            id: 13,
            message: 'Ah, it was the best thing that has ever happened to me!',
            mine: true
        },
        {
            id: 14,
            'message': 'How was daffadfsfasdfasdfadsfit?',
            'mine': false
        },
        {
            id: 15,
            'message': 'Saw photosadfsdf you posted, look rsdfadfasdflly cool',
            'mine': false
        }
    ],
    contacts: [
        {
            id: 0,
            user: 'Andrew',
            avatar: 'https://avatars.mds.yandex.net/get-pdb/2491787/c82afcee-0b50-42ed-b927-faf3d67afb72/s1200'
        },

        {
            id: 1,
            user: 'Ivan',
            avatar: 'https://avatars.mds.yandex.net/get-pdb/2219628/905c1cc4-069d-4f01-94d2-8522c1b2e320/s1200'
        },

        {
            id: 2,
            user: 'Pavel',
            avatar: 'https://million-wallpapers.ru/wallpapers/3/42/515299961860872/tukan.jpg'
        },

        {
            id: 3,
            user: 'JustHuman',
            avatar: 'https://avatars.mds.yandex.net/get-pdb/2799203/5fe88d2f-8f12-441e-96e6-7e621bd16ce3/s1200'
        },

        {
            id: 4,
            user: 'DreamSeeker',
            avatar: 'https://avatars.mds.yandex.net/get-pdb/2389283/5494d86b-47c8-449e-b500-6cb2a795b1ad/s1200'
        },

        {
            id: 5,
            user: 'RandomPerson',
            avatar: 'https://im0-tub-ru.yandex.net/i?id=6beb1ecc62519b0342c172a07200aabb-l&n=13'
        },

        {
            id: 6,
            user: 'Dima',
            avatar: 'https://avatars.mds.yandex.net/get-pdb/2385465/7ace5b47-13f4-43a7-b3b8-90e96af35903/s1200'
        }
    ]
}

let messagesPageReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            let message = {
                'message': action.text,
                'mine': true
            }
            return { ...state, messages: [...state.messages, message] }

        default:
            return state
    }
}
export default messagesPageReducer