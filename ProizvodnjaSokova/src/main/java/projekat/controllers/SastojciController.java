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

import projekat.models.Sastojci;
import projekat.repository.SastojciRepository;

@RestController
public class SastojciController {
	
	@Autowired
	private SastojciRepository sastojciRepository;
	
	public SastojciController(SastojciRepository sastojciRepository) {
		this.sastojciRepository = sastojciRepository;
	}
	
	@GetMapping("sastojci")
	public Collection<Sastojci> getAllSastojci() {
		return sastojciRepository.findAll();
	}
	
	@GetMapping("sastojci/{sastojciid}")
	public Sastojci getSastojak(@PathVariable Integer sastojciid) {
		return sastojciRepository.getById(sastojciid);
	}
	
	@CrossOrigin
	@PostMapping("sastojci")
	public ResponseEntity<Sastojci> insertSastojak(@RequestBody Sastojci sastojci) {
		sastojciRepository.save(sastojci);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("sastojci/{sastojciid}")
	public ResponseEntity<Sastojci> updateSastojak(@RequestBody Sastojci sastojci) {
		if(sastojciRepository.existsById(sastojci.getSastojciid()))
			sastojciRepository.save(sastojci);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("sastojci/{sastojciid}")
	public ResponseEntity<Sastojci> deleteSastojak(@PathVariable Integer sastojciid) {
		if(sastojciRepository.existsById(sastojciid))
			sastojciRepository.deleteById(sastojciid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
