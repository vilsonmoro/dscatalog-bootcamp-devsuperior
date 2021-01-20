package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService  {
   @Autowired
   CategoryRepository repository;
   
   @Transactional(readOnly = true)
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
   
   @Transactional(readOnly = true)
   public CategoryDTO findById(Long id) {
	  Optional<Category> obj = repository.findById(id);
	  //lança exceção quando objeto não encontrado
	  Category entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
			  
	  return new CategoryDTO(entity);
   }

   @Transactional(readOnly = true)
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
	}

   @Transactional(readOnly = true)
	public CategoryDTO update(Long id, CategoryDTO dto) {
	try {	
	   Category entity = repository.getOne(id);
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
	} catch(EntityNotFoundException e) {
	  throw new ResourceNotFoundException("id not found " + id);	
	}
	}
}
 