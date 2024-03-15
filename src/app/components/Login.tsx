export default function Login(){
    return(
        <form>
            <legend>
                <h1>
                    Login
                </h1>
            </legend>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" />
            </div>
            <div>
                <input type="submit" name="submit" id="submit" value="login" />
            </div>
        </form>
    );
}