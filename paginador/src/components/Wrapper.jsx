import React from 'react'

const Wrapper = (props) => {
    return (
        <div>

            <h1>Pagina { props.paginaActual }</h1>

            <button onClick={() => props.Anterior()}>Anterior</button>
            <button onClick={() => props.Siguietne()}>Siguiente</button>
            {props.data.map((item,index) => (
                <div key={item.item}>
                    {item.item}
                </div>
            ))}

        </div>
    )
}

export default Wrapper