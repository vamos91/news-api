import { Toolbar } from '../components/Toolbar';
import style from '../styles/Eom.module.css'

export const Eom = ({ responseFromServerJson }) => {
    return (
        <div className='page-container'>
            <Toolbar />
            <div className={style.main}>
                <ul>
                    {
                        responseFromServerJson.map((user, index) => (
                        <li key={index}>
                            {user.name}
                        </li>
                    ))
                    }
                </ul>
            </div>
        </div>
    );
};

export const getServerSideProps = async (pageContext) => {
    const responseFromServer = await fetch('https://jsonplaceholder.typicode.com/users')
    const responseFromServerJson = await responseFromServer.json()
    return{
        props:{
            responseFromServerJson: responseFromServerJson
        }
    }
}

export default Eom;