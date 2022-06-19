//import './App.css';
//import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import { Contatos } from './components/Contatos';
import { AddContato } from './components/AddContato';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [contatos, setContatos] = useState([]);
  const [contatoAtualizado, setContatoAtualizado] = useState({});

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await fetch('http://localhost:8080/contato')
      .then(res => res.json())
      .then(dados => setContatos(dados))
      .catch(err => console.log(err))
  }

  const loadContato = async (id) => {
    await fetch(`http://localhost:8080/contato/${id}`)
      .then(res => res.json())
      .then(dados => setContatoAtualizado(dados))
      .catch(err => console.log(err))
  }

  const onAdd = async (nome, telefone, email) => {
    await fetch('http://localhost:8080/contato', {
      method: 'POST',
      body: JSON.stringify({
        nome: nome,
        telefone: telefone,
        email: email
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
      .then(res => {
        if (res.status !== 201) {
          return
        } else {
          return res.json();
        }
      })
      .then(dados => {
        setContatos(contatos => [...contatos, dados])
      })
      .catch(err => console.log(err))
  }

  const onUpdate = async (id, nome, telefone, email) => {
    await fetch(`http://localhost:8080/contato/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        nome: nome,
        telefone: telefone,
        email: email
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
      .then(res => {
        setContatos(contatos.filter(contato => {
          return contato.id !== id;
        }))
        return res.json();
      })
      .then(dados => {
        setContatos(contatos => [...contatos, dados])
      })
      .catch(err => console.log(err))
  }

  const onDelete = async (id) => {
    await fetch(`http://localhost:8080/contato/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.status !== 200) {
          return;
        } else {
          setContatos(contatos.filter(contato => {
            return contato.id !== id;
          }))
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div style={{ padding: 1 + "em" }}>
      <AddContato props={contatoAtualizado} onAdd={onAdd} onUpdate={onUpdate} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {contatos.map(contato => (
            <Contatos props={contato} key={contato.id}
              onDelete={onDelete} loadContato={loadContato} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
