import { useState, useEffect } from 'react'
import './App.css'

interface GroceryItem {
  id: number
  name: string
  checked: boolean
}

function App() {
  const [items, setItems] = useState<GroceryItem[]>(() => {
    const saved = localStorage.getItem('grocery-list')
    return saved ? JSON.parse(saved) : []
  })
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem('grocery-list', JSON.stringify(items))
  }, [items])

  const addItem = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setItems(prev => [...prev, { id: Date.now(), name: trimmed, checked: false }])
    setInput('')
  }

  const toggleItem = (id: number) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    )
  }

  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const clearAll = () => {
    setItems([])
  }

  const checked = items.filter(i => i.checked).length

  return (
    <div className="app">
      <header className="header">
        <div className="header-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <h1>Lista de Mercado</h1>
        <p className="subtitle">
          Semana de {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
        </p>
      </header>

      <div className="input-area">
        <input
          type="text"
          placeholder="Adicionar produto..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addItem()}
          className="product-input"
        />
        <button onClick={addItem} className="add-btn" aria-label="Adicionar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {items.length > 0 && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(checked / items.length) * 100}%` }} />
        </div>
      )}

      {items.length > 0 ? (
        <>
          <ul className="item-list">
            {items.map(item => (
              <li key={item.id} className={`item${item.checked ? ' checked' : ''}`}>
                <button
                  className="check-btn"
                  onClick={() => toggleItem(item.id)}
                  aria-label="Marcar item"
                >
                  {item.checked && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
                <span className="item-name">{item.name}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteItem(item.id)}
                  aria-label="Excluir item"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <div className="footer">
            <span className="count">{checked} de {items.length} {items.length === 1 ? 'item' : 'itens'}</span>
            <button onClick={clearAll} className="clear-btn">Limpar lista</button>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <line x1="9" y1="12" x2="15" y2="12" />
            <line x1="9" y1="16" x2="13" y2="16" />
          </svg>
          <p>Sua lista está vazia</p>
          <span>Adicione produtos acima para começar</span>
        </div>
      )}
    </div>
  )
}

export default App
