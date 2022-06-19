package com.crud.teste;

import com.crud.teste.entidade.ContatoRepositorio;
import com.crud.teste.entidade.Contato;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/contato")
public class ContatoREST {
    @Autowired
    private ContatoRepositorio repositorio;

    @GetMapping
    public List<Contato> listar() {
        return repositorio.findAll();
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.PARTIAL_CONTENT)
    public Contato listarContato(@PathVariable Integer id) {
        return repositorio.findById(id).get();
/*
        repository
                .findById(id)
                .filter(contato -> {
                    repositorio.findById(contato.getId());
                    return false;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
*/
    }

    @PostMapping
    public void salvar(@RequestBody Contato contato) {
        repositorio.save(contato);
    }

//    @PutMapping
//    public void alterar(@RequestBody Contato contato) {
//        if (contato.getId() > 0)
//            repositorio.save(contato);
//    }

    @PutMapping("{id}")
    //@ResponseStatus(HttpStatus.PARTIAL_CONTENT)
    public void alterar(@RequestBody Contato newContato, @PathVariable Integer id) {
        repositorio
                .findById(id)
                .map(contato -> {
                    contato.setNome(newContato.getNome());
                    contato.setTelefone(newContato.getTelefone());
                    contato.setEmail(newContato.getEmail());
                    repositorio.save(contato);
                    return Void.TYPE;
                });
    }

//    @DeleteMapping()
//    public void excluir(@RequestBody Contato contato) {
//        repositorio.delete(contato);
//    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Integer id) {
        repositorio
                .findById(id)
                .map(contato -> {
                    repositorio.delete(contato);
                    return Void.TYPE;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }
}
