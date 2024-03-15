export default function Message({message}:{message:string}){
    console.log(message);
    return(
        <div className="message">
            <h2>
                Message Title
            </h2>
            <p>
                {message}
            </p>
        </div>
    )
}