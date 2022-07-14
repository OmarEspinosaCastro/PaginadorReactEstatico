import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper'

const Paginador = () => {
    /** ------------------------------------------------ */

    const [listProducts, setListProducts] = useState([]);
    const [listProducts2, setListProducts2] = useState([]);
    const [fullText_, setFullText_] = useState("xbox");
    const [orden, setOrden] = useState("OrderByScoreDESC");
    const [priceFrom, setPriceFrom] = useState(400);
    const [priceTo, setPriceTo] = useState(2000);
    const [pageFrom, setPageFrom] = useState(0);
    const [pageTo, setPageTo] = useState(31);
    const [searchProduct, setSearchProduct] = useState(false);
    const [allProducts, setAllProducts] = useState(0);
    const [suggest, setSuggest] = useState([]);
    const [facets, setFacets] = useState([]);
    const [selectedFacetsSearch, setSelectedFacetsSearch] = useState([
        {
            key: "brand",
            value: "sony",
        },
    ]);
    const [selectedFacetsSearchCat, setSelectedFacetsSearchCat] = useState([
        {
            key: "brand",
            value: "sony",
        }
    ]);
    const [filterForFacets, setFilterForFacets] = useState([]);
    //const apiEndpoint = "http://localhost:4000/_graphql/";
    const apiEndpoint = "https://catalog-search.elektrapp.com.mx/_graphql";
    const query = `
    query Query($fullText: String!, $searchSuggestionsFullText2: String!, $facetsFullText2: String!, $orderBy: String, $from: Int, $to: Int, $selectedFacets: [SelectedFacetInput], $salesChannel: String, $facetsSelectedFacets2: [SelectedFacetInput]) {
      facets(fullText: $facetsFullText2, selectedFacets: $facetsSelectedFacets2) {
        facets {
          name
          type
          hidden
          quantity
          values {
            name
            id
            key
            value
            selected
            href
          }
        }
      }
      searchSuggestions(fullText: $searchSuggestionsFullText2) {
        searches {
          term
        }
      }
      productSearch(fullText: $fullText, orderBy: $orderBy, from: $from, to: $to, selectedFacets: $selectedFacets, salesChannel: $salesChannel) {
        recordsFiltered
        products {
          productName
          brand
          items {
            itemId
            name
            nameComplete
            complementName
            ean
            measurementUnit
            unitMultiplier
            images {
              imageUrl
              imageText
              cacheId
              imageId
              imageLabel
              imageTag
            }
            videos {
              videoUrl
            }
            sellers {
              sellerId
              sellerName
              addToCartLink
              sellerDefault
              commertialOffer {
                Price
                ListPrice
                AvailableQuantity
              }
            }
            estimatedDateArrival
          }
          productId
        }
        mensaje
        folio
        codigo
      }
    }
    
   `;


    const PRODUCTOS_PER_PAGE = 10;
    const [productos, setProductos] = useState([]);
    const [currentPageProductos, setCurrentPageProductos] = useState(0);
    const [numPageProducto, setNumPageProducto] = useState([]);

    /* ----------------------------------------------------- */


    useEffect(() => {
        /*  -------------------------------------------- */

        const fetchReq1 = fetch(apiEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query,
                variables: {
                    fullText: fullText_,
                    searchSuggestionsFullText2: fullText_,
                    facetsFullText2: fullText_,
                    orderBy: orden,
                    from: parseInt(pageFrom),
                    to: parseInt(pageTo),
                    //selectedFacets: selectedFacetsSearch,
                    facetsSelectedFacets2: selectedFacetsSearchCat,
                },
            }),
        }).then((response) => response.json());
        const allData = Promise.all([fetchReq1]);
        allData.then((res) => {
            //console.log(" -------------------------------------- ");
            //console.log(res);
            //console.log(" -------------------------------------- ");
            setFacets(res[0].data.facets.facets);
            console.log("res[0].data.facets.facets ",res[0].data.facets.facets);
            setSuggest(res[0].data.searchSuggestions.searches);
            setAllProducts(res[0].data.productSearch.recordsFiltered);
            console.log(" => ",res[0].data.productSearch.recordsFiltered);
            const data = res[0].data.productSearch.products
            setListProducts(data);
            setProductos([...data].splice(0, PRODUCTOS_PER_PAGE));

            let datosp = []
            for (let index = 0; index < Math.ceil(data.length / PRODUCTOS_PER_PAGE); index++) {
                datosp.push(index)
                console.log("index ", index);
            }
            setNumPageProducto(datosp);

            setSearchProduct(false);
        });

    }, []);


    const AnteriorP = () => {
        const prevPage = currentPageProductos - 1;
        const firstIndex = prevPage * PRODUCTOS_PER_PAGE;
        if (firstIndex < 0) return;
        setProductos([...listProducts].splice(firstIndex, PRODUCTOS_PER_PAGE));
        setCurrentPageProductos(prevPage);
    }
    const SiguietneP = () => {
        const totalItems = listProducts.length;
        console.log(totalItems, "+++");
        const nextPage = currentPageProductos + 1;
        const firstIndex = nextPage * PRODUCTOS_PER_PAGE;
        if (firstIndex >= totalItems) return;
        setProductos([...listProducts].splice(firstIndex, PRODUCTOS_PER_PAGE));
        setCurrentPageProductos(nextPage);
    }

    const buscaPaginaP = (item) => {
        const firstIndex = item * PRODUCTOS_PER_PAGE;
        setProductos([...listProducts].splice(firstIndex, PRODUCTOS_PER_PAGE));
        setCurrentPageProductos(item);

    }


    return (
        <div>
            <div>
            {facets.map((item, index) => (
                    <p key={item.name}>{item.name}</p>
                ))} 
                <label> - - - - - - - - - - - - - - - - - - - - - - </label>
                <h1>Pagina {currentPageProductos + 1}</h1>
                {productos.map((item, index) => (
                    <p key={item.productName}>{item.productName}</p>
                ))}
                <button onClick={() => AnteriorP()}>AAnterior</button>
                {numPageProducto.map((item) => (
                    <label style={{ margin: 10 }} key={item} onClick={() => buscaPaginaP(item)}>{item + 1}</label>
                ))}
                <button onClick={() => SiguietneP()}>SSiguiente</button>
               

            </div>
        </div>
    )
}

export default Paginador