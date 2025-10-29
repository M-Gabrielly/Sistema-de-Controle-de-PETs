import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div>
            <p>
                404 - Página não encontrada
            </p>
            <p>
                <Link to="/"> Ir para página principal </Link>
            </p>
        </div>
    )
}

export default NotFoundPage