import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { expect } from 'vitest';
import testBasicVisibility from './blog_test_helper';

const user = { id: 'ugglh' };
const otherUser = { id: 'notugglh' };
const blog =
    {
        id: 'uuggkh',
        title: 'A test',
        author: 'Angel',
        url: 'http://test.gr',
        likes: 5,
        user: { id: 'ugglh', username: 'Dummy' }
    };
const likeAction = vi.fn();
const deleteAction = vi.fn();

describe('<Blog />', () => {

    test('Only title and author are visible to an unsigned user. The buttons are not', () => {
        render(<Blog blog={ blog } providedUser={ null } onLike={ likeAction } onDelete={ deleteAction } />);
        testBasicVisibility(screen, blog);
        expect(screen.queryByText('Like')).toBeNull();
        expect(screen.queryByText('Delete')).toBeNull();
    });

    test('A logged in user can also see the like button but not the delete button of any blog they have not authored.', () => {
        render(<Blog blog={ blog } providedUser={ otherUser } onLike={ likeAction } onDelete={ deleteAction } />);
        testBasicVisibility(screen, blog);
        expect(screen.queryByText('Like')).toBeDefined();
        expect(screen.queryByText('Delete')).toBeNull();
    });

    test('A logged in user can see the delete button on their own blogs.', () => {
        render(<Blog blog={ blog } providedUser={ user } onLike={ likeAction } onDelete={ deleteAction } />);
        testBasicVisibility(screen, blog);
        expect(screen.queryByText('Like')).toBeDefined();
        expect(screen.queryByText('Delete')).toBeDefined();
    });

});

