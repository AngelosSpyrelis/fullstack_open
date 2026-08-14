const { test, expect, beforeEach, describe } = require('@playwright/test')
const { signIn, createBlog } = require('./blog_test_helper');


describe('Blog App', () => {

    const user = {
        username: 'Dummy',
        password: 'DES12090037gt!'
    };

    const otherUser = {
        username: 'Smartie',
        password: 'DES12090037gt!'
    };

    const blog = {
        title: 'A treatise in Tests',
        author: 'Test Testington',
        likes: '55'
    };

    const secondBlog = {
        title: 'A treatise in Tests',
        author: 'Jord Jordenson',
        likes: '25'
    };



    
    
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset/');
        await request.post('http://localhost:3003/api/users/sign-up/', {
            data:{
                username: user.username,
                password: user.password
            }
        });
        await request.post('http://localhost:3003/api/users/sign-up/', {
            data:{
                username: otherUser.username,
                password: otherUser.password
            }
        });
        await page.goto('/');
        
    });

    test('Log in succeeds with the correct password and username', async ({ page }) => {
        await signIn(page, user.username, user.password);
        await expect(page.getByText('Log in successful!')).toBeDefined();
    });

    test('Login fails if the username/password is incorrect', async ({ page }) => {

        
        await signIn(page, user.username, 'dawdafhlhlida'); 
        await expect(page.getByText('invalid username or password')).toBeVisible();

        
    });

    test('When trying to log in with the wrong credentials the login is unsuccessfull and a notification shows up', async ({ page }) => {

        await expect(page.getByText('Blog App')).toBeVisible();
        await signIn(page, user.username, 'dwadacvwa');
        await expect(page.getByText('invalid username or password')).toBeVisible();
    });

    test('A logged in user can create a blog.', async ({ page }) => {
        
        await signIn(page, user.username, user.password);
        await createBlog(page, blog.title, blog.author, blog.likes);
        await expect(page.getByText(`${ blog.title } by ${ blog.author } was posted successfully.`));
    });

    test('A logged in user can like a post', async ({ page }) => {
        await signIn(page, user.username, user.password);
        await createBlog(page, blog.title, blog.author, blog.likes);
        await page.getByRole('link', { name: `${ blog.title } by ${ blog.author}` }).click();
        await page.getByTestId('blog').waitFor();
        await page.getByTestId('like-button').click();
        await expect(page.getByTestId('likes')).toContainText(`Likes: ${ parseInt(blog.likes) + 1 }`);
    });

    test('A logged in user can delete their post', async ({ page }) => {
        await signIn(page, user.username, user.password);
        await createBlog(page, blog.title, blog.author, blog.likes);
        await page.getByRole('link', { name: `${ blog.title } by ${ blog.author}` }).click();
        await page.getByTestId('blog').waitFor();
        page.on('dialog', dialog => dialog.accept());
        await page.getByTestId('delete-button').click();
        await expect(page.getByText(`Blog was deleted successfully.`)).toBeVisible();
    });

});

