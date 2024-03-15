import Image from 'next/image'
import leaf from "../images/leaf.jpg";
import Nav from './Nav';

export default function Header(){
    return(
        <header>
            <Image style={{margin:"0 auto",textAlign:"center", display:"block",borderRadius:"5px"}} src={leaf} alt="leaf icon" width={50} height={50} />
             <h1>
                Animals and Nature Messages
            </h1>
            <Nav />
        </header>
    );
}