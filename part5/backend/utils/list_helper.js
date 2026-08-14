const dummy = (blogs) => {
    console.log(blogs);
    return 1;
};

const totalLikes = (blogs) => {
    let totalLikes = 0;
    for(let i = 0; i < blogs.length; i++){
        totalLikes+=blogs[i].likes;
    }
    return totalLikes;
};

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return null;
    }
    let favoriteBlog = blogs[0];
    for(let i = 1; i < blogs.length; i++){
        if(favoriteBlog.likes < blogs[i].likes){
            favoriteBlog = blogs[i];
        }
    }
    return favoriteBlog;
};

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return null;
    }
    const authors = {};
    let mostActive = blogs[0].author;
    for(let i = 0; i < blogs.length; i++){
        if(!authors[blogs[i].author]){
            authors[blogs[i].author] = {
                author: blogs[i].author,
                blogs: 1
            };
            continue;
        }
        authors[blogs[i].author].blogs++;
        if(authors[blogs[i].author].blogs > authors[mostActive].blogs){
            mostActive = authors[blogs[i].author].author;
        }
    }
    return authors[mostActive];
};

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return null;
    }
    const authors = {};
    let mostLiked = blogs[0].author;
    for(let i = 0; i < blogs.length; i++){
        if(!authors[blogs[i].author]){
            authors[blogs[i].author] = {
                author: blogs[i].author,
                likes: blogs[i].likes
            };
            continue;
        }
        authors[blogs[i].author].likes+=blogs[i].likes;
        if(authors[blogs[i].author].likes > authors[mostLiked].likes){
            mostLiked = authors[blogs[i].author].author;
        }
    }
    return authors[mostLiked];
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };