const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

describe('totalLikes returns the total likes of a collection of blogs', () => {
    test('A series of arrays should return the total', () => {
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                likes:5
            },
            {
                _id: '5a422aa71b54a676234d17f7',
                title: 'Go To Statement Not Considered Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 3
            },
            {
                _id: '5a422a571b54a676234d17f8',
                title: 'This has two likes',
                author: 'I.h',
                likes: 2
            } ,
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Human Made Code Is Always Better',
                author: 'Cicero',
                likes: 10
            }
        ];
        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 20);
    });

    test('when list has only one blog, equals the likes of that', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }
        ];
        const result = listHelper.totalLikes(listWithOneBlog);
        assert.strictEqual(result, 5);
    });

    test('A series of blogs even with blogs with 0 likes should return the total', () => {
        const blogs = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 10,
                __v: 0
            },
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 0,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                __v: 0
            }
        ];
        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 36);
    });

    test('An empty array of blogs should return 0', () => {
        const result = listHelper.totalLikes([]);
        assert.strictEqual(result, 0);
    });
});

describe('The favoriteBlog function returns the blog with the most likes. In case of a draw, it returns the first one encountered in the array.', () => {
    test('A regular array will result in the blog with the most likes', () => {
        const blogs = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 10,
                __v: 0
            },
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 0,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                __v: 0
            }
        ];
        const result = listHelper.favoriteBlog(blogs);
        assert.deepStrictEqual(result, {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        });
    });

    test('An array with equally liked blogs will return the first of the equally most liked blog in the array', () => {
        const blogs = [
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                __v: 0
            },
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 12,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 12,
                __v: 0
            }
        ];
        const result = listHelper.favoriteBlog(blogs);
        assert.deepStrictEqual(result, {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        });
    });

    test('An empty array will return null', () => {
        const result = listHelper.favoriteBlog([]);
        assert.strictEqual(result, null);
    });
});

describe('The mostBlogs method should return the most active author from an array of blogs or null if an empty array is provided. In case of a draw it will return the first author to reach the highest number of blogs in the array.', () => {
    test('An empty array should return null.', () => {
        const result = listHelper.mostBlogs([]);
        assert.strictEqual(result, null);
    });

    test('A regular array should return the author with the most blogs and the number of blogs in an object.', () => {
        const blogs = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 10,
                __v: 0
            },
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 0,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                __v: 0
            }
        ];
        const result = listHelper.mostBlogs(blogs);
        assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 });
    });
    test('A regular array with two authors competing for the first spot should return the first author to reach the highest number.', () => {
        const blogs = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Edsger W. Dijkstra',
                url: 'https://reactpatterns.com/',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 10,
                __v: 0
            },
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 0,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                __v: 0
            }
        ];
        const result = listHelper.mostBlogs(blogs);
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 3 });
    });
});

describe('The mostLikes method should return the most liked author from an array of blogs or null if an empty array is provided. In case of a draw it will return the first author to reach the highest number of likes in the array.', () => {
    test('An empty array should return null.', () => {
        const result = listHelper.mostLikes([]);
        assert.strictEqual(result, null);
    });

    test('A regular array should return the author with the most likes and the number of likes in an object.', () => {
        const blogs = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 10,
                __v: 0
            },
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 0,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                __v: 0
            }
        ];
        const result = listHelper.mostLikes(blogs);
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 });
    });
    test('A regular array with two authors competing for the first spot should return the first author to reach the highest number.', () => {
        const blogs = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Edsger W. Dijkstra',
                url: 'https://reactpatterns.com/',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b3a1b54a676234d17f9',
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422b891b54a676234d17fa',
                title: 'First class tests',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                likes: 15,
                __v: 0
            },
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Another Author',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 0,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 0,
                __v: 0
            }
        ];
        const result = listHelper.mostLikes(blogs);
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 15 });
    });
});

test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
});