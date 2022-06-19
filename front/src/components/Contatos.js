import { Button } from 'react-bootstrap';

export function Contatos({ props, onDelete, loadContato }) {

    //console.log(props);
    const handleOnDelete = () => {
        onDelete(props.id);
        window.location.reload();
    }

    const handleOnLoadContato = () => {
        loadContato(props.id);
    }

    return (
        <tr>
            <td>{props.nome}</td>
            <td>{props.telefone}</td>
            <td>{props.email}</td>
            <td>
                <Button onClick={handleOnLoadContato}>
                    Alterar
                </Button>
                <Button style={{marginLeft: 12}} variant="danger" onClick={handleOnDelete}>
                    Excluir
                </Button>
            </td>
        </tr>
    );
}