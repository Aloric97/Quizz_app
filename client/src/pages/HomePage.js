import {Link,Route,Routes,useNavigate} from 'react-router-dom'


//import components
import {Game} from './Game'

//importing css
import './HomePage.css'

//importing img
import mainLogo from '../img/trivia.jpg'

export const HomePage = ()=>{


    const navigate = useNavigate();


    return(
        
        <div className="home">
            
            <div className = "head-text">
                <img src={mainLogo} alt="img" className="img" />
                <div class='text-on-image'>
                    <h3> Welcome </h3>
                    <h4>do you dare to play it?</h4>
                </div>
            </div>
            <Link to="/Game">
                <button className="btn btn-primary button "><h2>Play now!</h2></button>
            </Link>

        </div>
        
    )
}

