import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';


export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));
}

export const fetchPosts = () => {
    return async dispatch => {
        const responce = await jsonPlaceholder.get('/posts');

        dispatch({type: 'FETCH_POSTS', payload: responce.data});
    };
};

export const fetchUser = (id) => async dispatch => {
    const user = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type: 'FETCH_USER', payload: user.data});
}
