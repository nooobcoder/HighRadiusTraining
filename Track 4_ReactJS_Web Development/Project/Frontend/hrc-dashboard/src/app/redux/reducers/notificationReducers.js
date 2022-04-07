/* Initial State

    hasError: false,
    message: '',
    title:'',
    visible: false,
*/

const reducers = {
    setNotification: (state, action) => {
        const {hasError, message, title} = action.payload;
        return {
            ...state,
            hasError,
            message,
            title,
            visible: true,
        };
    },
    clearNotification: (state) => ({
        ...state,
        hasError: false,
        message: '',
        title: '',
        visible: false,
    }),
};

export default reducers;
