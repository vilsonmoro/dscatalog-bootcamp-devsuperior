package com.devsuperior.dscatalog.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService  {
   @Autowired
   CategoryRepository repository;
   public List<CategoryDTO>  findAll(){
	  List<Category> list = repository.findAll();
	  
	  /*List<CategoryDTO> listDTO = new ArrayList<>();
	  for(Category cat : list) {
		  listDTO.add(new CategoryDTO(cat));
	  }*/
	  
	  //usando função de alta ordem
	  List<CategoryDTO> listDTO = list.stream()
			  .map(x -> new CategoryDTO(x))
			  .collect(Collectors.toList());
	  
	  return listDTO;
   }
}
 