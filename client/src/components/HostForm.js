function Home(){
    return (
        <div>
            <form action='/game'>
                <label for="host"></label>
                <input type="text" id="host" name="host"></input>
                <input type="submit" value="Create Game"></input>
            </form>
        </div>
    )
}