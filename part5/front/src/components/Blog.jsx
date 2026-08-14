import { memo  } from 'react';
import styled from 'styled-components';

const StyledBlog = styled.div`
display: flex;
flex-direction: column;
height: fit-content;
width: fit-content;
min-width: 360px;
box-shadow: 5px 5px;
border: 2px solid #FFF;
padding: 25px 5%;
gap: 25px;
`;

const ExtraBlogDetails = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;

const ButtonWrap = styled.div`
display: flex;
justify-content: space-between;
padding: 5px 0;
`;

const LikeButton = styled.button`
border: 2px solid #00bfff ;
border-radius: 15px;
padding: 5px;
background-color: transparent;
color: #00bfff ;
&:hover{
    background-color: #00bfff ;
    color: #FFF;
}
`;

const DeleteButton = styled(LikeButton)`
border: 2px solid red;
color: red;
&:hover{
    background-color: red;
}
`;

const Blog = memo(function Blog({ blog , providedUser, onLike, onDelete }){

    if(!blog){
        return null;
    }
    const { title, author, likes, id, url, user } = blog;
    return(
        <StyledBlog data-testid='blog'>
            <div>
                <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{ title }</h3>
                <h4 style={{ fontSize: '15px' }}> by { author }</h4>
            </div>
            <div>
                <ExtraBlogDetails>
                    <p>url: { url }</p>
                    <p className='blog-likes' data-testid='likes'>Likes: { likes }</p>
                    <p>Posted by: { user.username }</p>
                    { (providedUser)?
                        <ButtonWrap data-id={ id }>
                            <LikeButton data-testid='like-button' onClick={ onLike }>Like</LikeButton>
                            { (providedUser._id === user.id)?<DeleteButton onClick={ onDelete } data-testid='delete-button' data-question={ title + ' by ' + author }>Delete</DeleteButton>:'' }
                        </ButtonWrap>
                        :
                        ''
                    }
                </ExtraBlogDetails>
            </div>
        </StyledBlog>
    );
});

export default Blog;