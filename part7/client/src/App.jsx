import { useEffect } from 'react';
import Nav from './features/Navigation/Navigation';
import RoutesElem from './features/Navigation/Routes';
import { Notification } from './features/notifications/Notification';
import { Page } from './features/utils/StyledComponents';

import { useAuthActions } from './hooks/useAuthenticator';
import { useUserActions } from './hooks/useUsers';
import { useBLogActions } from './hooks/useBlogs';

const App = () => {
    const { getUserFromLocaldata } = useAuthActions();

    const { getUsers } = useUserActions();

    const { getBlogs } = useBLogActions();

    useEffect(() => {
        getUserFromLocaldata();
        getBlogs();
        getUsers();
    }, [getBlogs, getUsers, getUserFromLocaldata]);

    /** BLOGS PART */

    return (
        <Page>
            <Nav />
            <Notification />
            <RoutesElem />
        </Page>
    );
};

export default App;
