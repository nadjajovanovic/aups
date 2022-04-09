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
import projekat.repository.ProizvodRepository;

@RestController
public class ProizvodController {
	
	@Autowired
	private ProizvodRepository proizvodRepository;
	
	public ProizvodController(ProizvodRepository proizvodRepository) {
		this.proizvodRepository = proizvodRepository;
	}
	
	@GetMapping("proizvod")
	public Collection<Proizvod> getAllProizvode() {
		return proizvodRepository.findAll();
	}
	
	@GetMapping("proizvod/{proizvodid}")
	public Proizvod getProizvod(@PathVariable Integer proizvodid) {
		return proizvodRepository.getById(proizvodid);
	}
	
	@CrossOrigin
	@PostMapping("proizvod")
	public ResponseEntity<Proizvod> insertProizvod(@RequestBody Proizvod proizvod) {
		proizvodRepository.save(proizvod);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("proizvod/{proizvodid}")
	public ResponseEntity<Proizvod> updateProizvod(@RequestBody Proizvod proizvod) {
		if(proizvodRepository.existsById(proizvod.getProizvodid()))
			proizvodRepository.save(proizvod);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("proizvod/{proizvodid}")
	public ResponseEntity<Proizvod> deleteProizvod(@PathVariable Integer proizvodid) {
		if(proizvodRepository.existsById(proizvodid))
			proizvodRepository.deleteById(proizvodid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
