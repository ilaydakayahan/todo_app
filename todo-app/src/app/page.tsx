"use client"

import React, { useEffect, useState } from 'react'
import { useTaskStore } from '../../store/useTaskStore'

export default function Home() {
  const { tasks, fetchTasks, addTask, updateTask, deleteTask } = useTaskStore()
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = async () => {
    if (newTitle.trim() === '') return
    await addTask(newTitle.trim())
    setNewTitle('')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a', // en koyu lacivert, arka plan tüm sayfa
      padding: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}>
      <div style={{
        width: 500,
        backgroundColor: '#1e293b', // orta lacivert kutu arka planı
        borderRadius: 16,
        padding: 30,
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: 30,
          fontWeight: 'bold',
          fontSize: 32,
          color: '#f472b6', // pembe başlık
          letterSpacing: 1.2,
        }}>
          Görev Listesi
        </h1>

        <div style={{ display: 'flex', gap: 15, marginBottom: 25 }}>
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Yeni görev ekle..."
            style={{
              flexGrow: 1,
              padding: '12px 16px',
              borderRadius: 10,
              border: 'none',
              fontSize: 16,
              outline: 'none',
              backgroundColor: '#0f172a', // koyu lacivert input
              color: '#e0e7ff', // açık yazı
              boxShadow: 'inset 0 0 5px #334155',
            }}
          />
          <button
            onClick={handleAddTask}
            style={{
              backgroundColor: '#f472b6',
              color: 'white',
              padding: '12px 25px',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: 16,
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#db2777')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f472b6')}
          >
            Ekle
          </button>
        </div>

        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {tasks.map(task => (
            <li
              key={task.id}
              style={{
                backgroundColor: '#334155', // koyu lacivert-mavi kutu
                padding: '14px 20px',
                borderRadius: 14,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 15,
                boxShadow: task.isDone ? '0 0 15px #22c55e' : 'none',
              }}
            >
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => updateTask(task.id, { isDone: !task.isDone })}
                style={{ accentColor: '#22c55e', width: 22, height: 22, cursor: 'pointer' }}
              />
              <span style={{
                flexGrow: 1,
                textDecoration: task.isDone ? 'line-through' : 'none',
                color: task.isDone ? '#94a3b8' : '#e0e7ff',
                fontWeight: 600,
                fontSize: 19,
                userSelect: 'none',
              }}>
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  backgroundColor: '#ef4444',
                  border: 'none',
                  borderRadius: 10,
                  color: 'white',
                  padding: '7px 16px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 15,
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b91c1c')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ef4444')}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
