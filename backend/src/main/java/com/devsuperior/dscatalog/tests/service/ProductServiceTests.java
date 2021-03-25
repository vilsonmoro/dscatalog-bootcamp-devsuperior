package com.devsuperior.dscatalog.tests.service;

import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.ProductService;




public class ProductServiceTests {
  @InjectMocks 
  private ProductService service;
  
 @Mock
  private ProductRepository repository;
}
