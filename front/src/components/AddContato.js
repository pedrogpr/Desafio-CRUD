import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export function AddContato({ props, onAdd, onUpdate }) {

    const handleOnAdd = (e) => {
        onAdd(e.target.nome.value, e.target.telefone.value, e.target.email.value)
    }

    const handleOnUpdate = (e) => {
        onUpdate(props.id, e.target.nome.value, e.target.telefone.value, e.target.email.value)
    }

    const handleOnOption = (e) => {
        if(props.nome) {
            handleOnUpdate(e);
        } else {
            handleOnAdd(e);
        }
    }

    return (
        <div style={{ marginBottom: 1 + "em"}}>
            <Form onSubmit={handleOnOption}>
                <Form.Group className="mb-3" controlId="formNome">
                    <Form.Label>{props.nome ? props.nome : "Nome"}</Form.Label>
                    <Form.Control type="text" placeholder="Digite o nome" name="nome" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTelefone">
                    <Form.Label>{props.telefone ? props.telefone : "Telefone"}</Form.Label>
                    <Form.Control type="text" placeholder="Digite o telefone" name="telefone" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>{props.email ? props.email : "E-mail"}</Form.Label>
                    <Form.Control type="email" placeholder="Digite o e-mail" name="email" />
                </Form.Group>
                <Button variant="success" type="submit"
                    onSubmit={handleOnAdd} disabled={props.nome ? true : false}>
                    Adicionar
                </Button>
                <Button style={{ marginLeft: 12 }} type="submit"
                    onSubmit={handleOnUpdate} disabled={props.nome ? false : true}>
                    Salvar
                </Button>
            </Form>
        </div>
    )
}