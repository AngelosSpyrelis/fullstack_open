import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blogs from './Blogs';
import { expect } from 'vitest';

const user = { id: 'ugglh' };

const blogs = [
    {
        id: 'uuggkh',
        title: 'A test',
        author: 'Angel',
        url: 'http://test.gr',
        likes: 5,
        user: { _id: 'ugglh', username: 'Dummy' }
    }
];
const likeAction = vi.fn();
const DOMUser = userEvent.setup();

describe('<Blogs />', () => {
    beforeEach(() => {

        render(<Blogs user={ user } blogs={blogs} likeAction={ likeAction }/>);
    });

    /**
     * I cannot use the actual toBeDefined method as all elements are rendered and the only thing that changes is the display prop in styles.
     * Also, I had to change the component so that its style property was altered instead of using classes as I originally did.
    */
    test('Only title and author are visible', () => {

        const title = screen.getByText('A test by Angel');
        const url = screen.getByText(blogs[0].url, { exact:false } );
        expect(url).not.toBeVisible();
        const likes = screen.getByText(blogs[0].likes, { exact:false });
        expect(likes).not.toBeVisible();
        expect(title).toBeVisible();
    });

    test('when the Show button is pressed, the rest of the elements become visible', async () => {

        const button = screen.getByText('Show');
        await DOMUser.click(button);

        const url = screen.getByText(blogs[0].url, { exact:false } );
        expect(url).toBeVisible();
        const likes = screen.getByText(blogs[0].likes, { exact:false });
        expect(likes).toBeVisible();

    });

    test('<Blogs /> clicking on the like button twice will call the relevant method twice', async () => {

        const likeButton = screen.getByText('Like');

        await DOMUser.click(likeButton);
        await DOMUser.click(likeButton);

        expect(likeAction.mock.calls).toHaveLength(2);
    });
});

