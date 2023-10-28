export default function Navbar(){
    return (
    <nav className = "nav">
        <div class = "imeprezime">
            Ime Prezime
        </div>
        <ul>
            <li className="active">
                <a href = "/FAQ">
                    FAQ
                </a>
            </li>
            <li className="active">
                <a href = "/about">
                    <img class = "usericon" src = "./Icons/user-pen.svg" alt = "User logo"/>
                </a>
            </li>
        </ul>
    </nav>
    )
}