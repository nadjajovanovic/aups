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
import projekat.services.SastojciService;

@RestController
public class SastojciController {
	
	@Autowired
	private SastojciService sastojciService;
	
	public SastojciController(SastojciService sastojciService) {
		this.sastojciService = sastojciService;
	}
	
	@GetMapping("sastojci")
	public Collection<Sastojci> getAllSastojci() {
		final var sastojci = sastojciService.getAll();
		final var listaSastojaka = sastojci.stream().toList();
		return listaSastojaka;
	}
	
	@GetMapping("sastojci/{sastojciid}")
	public Sastojci getSastojak(@PathVariable Integer sastojciid) {
		final var oneSastojak = sastojciService.getOne(sastojciid);
		return oneSastojak;
	}
	
	@CrossOrigin
	@PostMapping("sastojci")
	public ResponseEntity<Sastojci> insertSastojak(@RequestBody Sastojci sastojci) {
		sastojciService.insert(sastojci);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("sastojci/{sastojciid}")
	public ResponseEntity<Sastojci> updateSastojak(@RequestBody Sastojci sastojci) {
		sastojciService.update(sastojci);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("sastojci/{sastojciid}")
	public ResponseEntity<Sastojci> deleteSastojak(@PathVariable Integer sastojciid) {
		sastojciService.delete(sastojciid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
