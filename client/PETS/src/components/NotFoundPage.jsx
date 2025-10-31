import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div id='content'>
            <div id='box-content'>
                <p>
                    404 - Página não encontrada
                </p>
                <p>
                    <Link to="/"> Ir para página principal </Link>
                </p>
            </div>
        </div>
    )
}

export default NotFoundPage