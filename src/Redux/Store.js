import profileReducer from './profileReducer';
import messagesPageReducer from './messagesPageReducer';

let store = {
    state: {
        profile: {
            CurrentPostText: '',
            posts: [
                {
                    'text': 'Here is supposed to be sth... sooo',
                    'likes': 7
                },
                {
                    'text': 'Hi there!',
                    'likes': 0
                },
                {
                    'text': 'The Earth is flat!!!',
                    'likes': 11
                }
            ]
        },

        messagesPage: {
            CurrentMessageText: '',
            messages: [
                {
                    'message': 'g and typesetting industry. Lorem Ipum ha',
                    'mine': false
                },
                {
                    'message': 'Havent heard from you for a while?',
                    'mine': true
                },
                {
                    'message': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took',
                    'mine': false
                },
                {
                    'message': 'Same, just got back from holiday',
                    'mine': true
                },
                {
                    'message': 'How was it?',
                    'mine': false
                },
                {
                    'message': 'Saw photos you posted',
                    'mine': false
                },
                {
                    'message': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. L',
                    'mine': true
                },
                {
                    'message': 'Hi, what\'s up?',
                    'mine': false
                },
                {
                    'message': 'Havent heard from you for a while?',
                    'mine': true
                },
                {
                    'message': 'Fine, u?',
                    'mine': false
                },
                {
                    'message': 'Same, just got back from holiday',
                    'mine': true
                },
                {
                    'message': 'How was it?',
                    'mine': false
                },
                {
                    'message': 'Saw photos you posted, look rlly cool',
                    'mine': false
                },
                {
                    'message': 'Ah, it was the best thing that has ever happened to me!',
                    'mine': true
                },
                {
                    'message': 'How was daffadfsfasdfasdfadsfit?',
                    'mine': false
                },
                {
                    'message': 'Saw photosadfsdf you posted, look rsdfadfasdflly cool',
                    'mine': false
                }
            ],
            contacts: [
                {
                    'user': 'Andrew',
                    'avatar': 'https://avatars.mds.yandex.net/get-pdb/2491787/c82afcee-0b50-42ed-b927-faf3d67afb72/s1200'
                },

                {
                    'user': 'Ivan',
                    'avatar': 'https://avatars.mds.yandex.net/get-pdb/2219628/905c1cc4-069d-4f01-94d2-8522c1b2e320/s1200'
                },

                {
                    'user': 'Pavel',
                    'avatar': 'https://million-wallpapers.ru/wallpapers/3/42/515299961860872/tukan.jpg'
                },

                {
                    'user': 'JustHuman',
                    'avatar': 'https://avatars.mds.yandex.net/get-pdb/2799203/5fe88d2f-8f12-441e-96e6-7e621bd16ce3/s1200'
                },

                {
                    'user': 'DreamSeeker',
                    'avatar': 'https://avatars.mds.yandex.net/get-pdb/2389283/5494d86b-47c8-449e-b500-6cb2a795b1ad/s1200'
                },

                {
                    'user': 'RandomPerson',
                    'avatar': 'https://im0-tub-ru.yandex.net/i?id=6beb1ecc62519b0342c172a07200aabb-l&n=13'
                },

                {
                    'user': 'Dima',
                    'avatar': 'https://avatars.mds.yandex.net/get-pdb/2385465/7ace5b47-13f4-43a7-b3b8-90e96af35903/s1200'
                }
            ]
        }
    },

    rerender() {
        return 0;
    },

    subscribe(observer) {
        this.rerender = observer;
    },


    dispatch(action) {
        this.state.profile = profileReducer(store.state.profile, action);
        this.state.messagesPage = messagesPageReducer(store.state.messagesPage, action);
        this.rerender();
    }
}



export default store;











