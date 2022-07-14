import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper'

const Paginador = () => {
  
    const [data, setData] = useState([
        { item: "item#!1" },
        { item: "item#!2" },
        { item: "item#!3" },
        { item: "item#!4" },
        { item: "item#!5" },
        { item: "item#!6" },
        { item: "item#!7" },
        { item: "item#!8" },
        { item: "item#!9" },
        { item: "item#!10" },
        { item: "item#!11" },
        { item: "item#!12" },
        { item: "item#!13" },
        { item: "item#!14" },
        { item: "item#!15" },
        { item: "item#!16" },
        { item: "item#!17" },
        { item: "item#!18" },
        { item: "item#!19" },
        { item: "item#!20" },
        { item: "item#!21" },
        { item: "item#!22" },
        { item: "item#!23" },
        { item: "item#!24" },
        { item: "item#!25" },
        { item: "item#!26" },
        { item: "item#!27" },
        { item: "item#!28" },
        { item: "item#!29" },
        { item: "item#!30" },
        { item: "item#!31" },
      ])
      const ITEMS_PER_PAGE = 5;
      const [items, setItems] = useState([...data].splice(0, ITEMS_PER_PAGE));
      const [currentPage, setCurrentPage] = useState(0);
      const [numPage, setNumPage] = useState([]);
    
      useEffect(() => {

        return () => {
          let paginas = Math.ceil(data.length / ITEMS_PER_PAGE);
          let datos =[]
          for (let index = 0; index < paginas; index++) {
            datos.push(index)
          }
          setNumPage(datos);
        }
      }, []);
    
      const Anterior = () => {
        const prevPage = currentPage - 1;
        const firstIndex = prevPage * ITEMS_PER_PAGE;
        if (firstIndex < 0) return;
        setItems([...data].splice(firstIndex, ITEMS_PER_PAGE));
        setCurrentPage(prevPage);
      }
      const Siguietne = () => {
        const totalItems = data.length;
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * ITEMS_PER_PAGE;
        console.log(firstIndex, " - ", totalItems);
        if (firstIndex > totalItems) return;
        setItems([...data].splice(firstIndex, ITEMS_PER_PAGE));
        setCurrentPage(nextPage);
      }
    
      const buscaPagina = (item) => {
        const firstIndex = item * ITEMS_PER_PAGE;
        setItems([...data].splice(firstIndex, ITEMS_PER_PAGE));
        setCurrentPage(item);
    
      }
      return (
        <div>
          <Wrapper paginaActual={currentPage} data={items} Anterior={Anterior} Siguietne={Siguietne} />
        {numPage.map((item)=>(
          <div key={item} onClick={()=>buscaPagina(item)}>{"- "+item+" -"}</div>
        ))}
    
        </div>
      )
}

export default Paginador