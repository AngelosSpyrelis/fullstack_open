export const Notification = ({message, isSuccess}) =>{
    if(message == ''){return;}
    return(
        <div className={(isSuccess)?'notification success':'notification error'}>{message}</div>
    );
};