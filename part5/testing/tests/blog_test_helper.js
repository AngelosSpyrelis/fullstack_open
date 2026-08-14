const signIn = async (page, username, password) => {
        await page.getByText('login').click();
        await page.getByRole('heading', { name: 'Sign In' }).waitFor();
        await page.getByLabel('Username').fill(username);
        await page.getByLabel('Password').fill(password);
        await page.getByTestId('sign-in').click();
};

const createBlog = async (page, title, author, likes) => {
        await page.getByText('Create Blog').click();
        await page.getByLabel('Title:').fill(title);
        await page.getByLabel('Author:').fill(author);
        await page.getByLabel('Likes:').fill(likes);
        await page.getByTestId('save-blog-button').click();
        await page.getByText(`${ title } by ${ author } was posted successfully.` ).waitFor();
};

export { signIn, createBlog };