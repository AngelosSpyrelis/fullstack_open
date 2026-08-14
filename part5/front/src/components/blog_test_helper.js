const testBasicVisibility = (screen, blog) => {
    expect(screen.getByText('A test by Angel')).toBeVisible();
    expect(screen.getByText(blog.url, { exact:false } )).toBeVisible();
    expect(screen.getByText(blog.likes, { exact:false })).toBeVisible();
};

export default testBasicVisibility;