import { useReducer, useState, useRef, useCallback, useEffect } from 'react'

function getInitialState() {
  const savedInventory = localStorage.getItem('inventory');
  return {
    products: savedInventory ? JSON.parse(savedInventory) : [],
    searchTerm: ''
  };
}

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [
          ...state.products,
          {
            id: Date.now(),
            name: action.name,
            quantity: 1
          }
        ]
      }
    case 'INCREMENT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      }
    case 'DECREMENT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.id && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      }
    case 'REMOVE':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.id)
      }
    case 'CLEAR':
      return {
        ...state,
        products: []
      }
    case 'SEARCH':
      return {
        ...state,
        searchTerm: action.term
      }
    case 'LOAD':
      return {
        ...state,
        products: action.payload || []
      }
    default:
      return state
  }
}

export default function InventoryManager() {
  const [state, dispatch] = useReducer(inventoryReducer, getInitialState());
  const productInputRef = useRef(null);


  // Guardar en localStorage cuando cambia el inventario
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(state.products))
  }, [state.products])

  // Función para agregar producto
  const handleAddProduct = useCallback(() => {
    if (productInputRef.current.value.trim() !== '') {
      dispatch({ type: 'ADD_PRODUCT', name: productInputRef.current.value })
      productInputRef.current.value = ''
      productInputRef.current.focus()
    }
  }, [])

  // Función para incrementar cantidad
  const handleIncrement = useCallback(id => {
    dispatch({ type: 'INCREMENT', id })
  }, [])

  // Función para decrementar cantidad
  const handleDecrement = useCallback(id => {
    dispatch({ type: 'DECREMENT', id })
  }, [])

  // Función para eliminar producto
  const handleRemove = useCallback(id => {
    dispatch({ type: 'REMOVE', id })
  }, [])

  // Función para vaciar inventario
  const handleClearInventory = useCallback(() => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el inventario?')) {
      dispatch({ type: 'CLEAR' })
    }
  }, [])

  // Función para manejar búsqueda
  const handleSearch = useCallback(e => {
    dispatch({ type: 'SEARCH', term: e.target.value })
  }, [])

  // Filtrar productos según búsqueda
  const filteredProducts = state.products.filter(product =>
    product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
  )

  return (
    <div className="inventory-manager">

      {/* Formulario para agregar productos */}
      <div className="form-container">
        <input
          ref={productInputRef}
          className="product-input"
          type="text"
          placeholder="📝 Nombre del producto"
          onKeyPress={e => e.key === 'Enter' && handleAddProduct()}
        />
        <button className="add-button" onClick={handleAddProduct}>
          ➕ Agregar
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Buscar producto..."
          value={state.searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Botón para vaciar inventario */}
      {state.products.length > 0 && (
        <button className="clear-button" onClick={handleClearInventory}>
          🗑️ Vaciar Inventario
        </button>
      )}
      

      {/* Lista de productos */}
      <div className="list-container">
        {filteredProducts.length > 0 ? (
          <ul className="product-list">
            {filteredProducts.map(product => (
              <li key={product.id} className="product-item">
                <span className="product-name">
                  {product.name} - Cantidad: {product.quantity}
                </span>
                <div className="actions-container">
                  <button 
                    className="action-button increment-button"
                    onClick={() => handleIncrement(product.id)}
                  >
                    ➕
                  </button>
                  <button 
                    className="action-button decrement-button"
                    onClick={() => handleDecrement(product.id)}
                  >
                    ➖
                  </button>
                  <button 
                    className="action-button delete-button"
                    onClick={() => handleRemove(product.id)}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-message">
            {state.searchTerm
              ? '🔍 No se encontraron productos'
              : '📦 El inventario está vacío'}
          </p>
        )}
      </div>
    </div>
  )
}