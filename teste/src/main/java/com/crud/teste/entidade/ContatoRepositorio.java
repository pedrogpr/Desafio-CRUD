package com.crud.teste.entidade;

import com.crud.teste.entidade.Contato;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepositorio extends JpaRepository<Contato, Integer> {
    
}
