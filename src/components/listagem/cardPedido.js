import { Link } from 'react-router-dom'
import '../../styles/cardPedido.css'

export default function CardPedido({filtro}) {
    return (
        <div className='container'>
            <div className='content'>
                <div className='left'>
                    <h2>Title</h2>
                    <p>filtro</p>
                </div>
                <div className='right'>
                    <div className='status-category'>
                        <div className='item-status'>Status</div>
                        <div className='item-category'>Category</div>
                    </div>
                    <Link className='ver-mais'>Ver Mais</Link>
                </div>
            </div>
        </div>
    )
}
