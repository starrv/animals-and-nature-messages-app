export default function Message({message}){
    console.log(message);
    return(
        <div className="message">
            {message}
        </div>
    )
}