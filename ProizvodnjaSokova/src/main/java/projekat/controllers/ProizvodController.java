package projekat.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import projekat.models.Proizvod;
import projekat.services.ProizvodService;

@RestController
public class ProizvodController {
	
	@Autowired
	private ProizvodService proizvodService;
	
	public ProizvodController(ProizvodService proizvodService) {
		this.proizvodService = proizvodService;
	}
	
	@GetMapping("proizvod")
	public Collection<Proizvod> getAllProizvode() {
		final var proizovdi = proizvodService.getAll();
		final var listaProizvoda = proizovdi.stream().toList();
		return listaProizvoda;
	}
	
	@GetMapping("proizvod/{proizvodid}")
	public Proizvod getProizvod(@PathVariable Integer proizvodid) {
		final var oneProizvod = proizvodService.getOne(proizvodid);
		return oneProizvod;
	}
	
	@CrossOrigin
	@PostMapping("proizvod")
	public ResponseEntity<Proizvod> insertProizvod(@RequestBody Proizvod proizvod) {
		proizvodService.insert(proizvod);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("proizvod/{proizvodid}")
	public ResponseEntity<Proizvod> updateProizvod(@RequestBody Proizvod proizvod) {
		proizvodService.update(proizvod);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("proizvod/{proizvodid}")
	public ResponseEntity<Proizvod> deleteProizvod(@PathVariable Integer proizvodid) {
		proizvodService.delete(proizvodid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
