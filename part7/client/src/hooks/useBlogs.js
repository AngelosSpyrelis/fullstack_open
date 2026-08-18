import { create } from 'zustand';
import blogService from '../services/blogs';

const useBlogStore = create((set) => ({
    values: {
        blogs: [],
        isLoading: false,
        error: '',
    },
    actions: {
        getBlogs: async () => {
            set((state) => ({
                values: {
                    ...state.values,
                    isLoading: true,
                },
            }));
            try {
                const newBlogs = await blogService.getBlogs();
                set((state) => ({
                    values: {
                        ...state.values,
                        isLoading: false,
                        blogs: newBlogs.data,
                    },
                }));
            } catch (error) {
                set((state) => ({
                    values: {
                        ...state.values,
                        isLoading: false,
                        error: error,
                    },
                }));
            }
        },
        addBlog: async (formData, token) => {
            const newBlog = await blogService.postBlog(formData, token);
            set((state) => ({
                ...state,
                values: {
                    ...state.values,
                    blogs: [...state.values.blogs, newBlog.data],
                },
            }));
        },
        likeBlog: async (id, token) => {
            await blogService.likeBlog(id, token);
            set((state) => ({
                values: {
                    ...state.values,
                    blogs: state.values.blogs.map((blog) =>
                        blog.id === id
                            ? { ...blog, likes: blog.likes + 1 }
                            : blog
                    ),
                },
            }));
        },
        commentOnBlog: async (id, token, comment) => {
            await blogService.commentOnBlog(id, token, comment);
            set((state) => ({
                values: {
                    ...state.values,
                    blogs: state.values.blogs.map((blog) => {
                        if (blog.id === id) {
                            return {
                                ...blog,
                                comments: [...blog.comments, comment.comment],
                            };
                        }
                        return blog;
                    }),
                },
            }));
        },
        deleteBlog: async (id, token) => {
            await blogService.deleteBlog(id, token);
            set((state) => ({
                values: {
                    ...state.values,
                    blogs: state.values.blogs.filter((blog) => blog.id !== id),
                },
            }));
        },
    },
}));

export const useBlogs = () => useBlogStore((state) => state.values);
export const useBLogActions = () => useBlogStore((state) => state.actions);
