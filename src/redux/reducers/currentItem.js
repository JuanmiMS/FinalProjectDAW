const defaultState = 
    {
        token: ''
    }

function reducer(state = defaultState, { type, payload }) {
    switch (type) {
        case 'findCurrentItem': {
            return [{
                id: 1,
                title: 'findCurrentItem'
            }]
        }
        default:
            return state
    }
}

export default reducer