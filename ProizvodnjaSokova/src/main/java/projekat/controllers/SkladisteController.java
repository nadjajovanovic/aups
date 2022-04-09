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

import projekat.models.Skladiste;
import projekat.repository.SkladisteRepository;

@RestController
public class SkladisteController {
	
	@Autowired
	private SkladisteRepository skladisteRepository;
	
	public SkladisteController(SkladisteRepository skladisteRepository) {
		this.skladisteRepository = skladisteRepository;
	}
	
	@GetMapping("skladiste")
	public Collection<Skladiste> getAllSkladiste() {
		return skladisteRepository.findAll();
	}
	
	@GetMapping("skladiste/{skladisteid}")
	public Skladiste getSkladiste(@PathVariable Integer skladisteid) {
		return skladisteRepository.getById(skladisteid);
	}
	
	@CrossOrigin
	@PostMapping("skladiste")
	public ResponseEntity<Skladiste> insertSkladiste(@RequestBody Skladiste skladiste) {
		skladisteRepository.save(skladiste);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("skladiste/{skladisteid}")
	public ResponseEntity<Skladiste> updateSkladiste(@RequestBody Skladiste skladiste) {
		if(skladisteRepository.existsById(skladiste.getSkladisteid()))
			skladisteRepository.save(skladiste);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("skladiste/{skladisteid}")
	public ResponseEntity<Skladiste> deleteSkladiste(@PathVariable Integer skladisteid) {
		if(skladisteRepository.existsById(skladisteid))
			skladisteRepository.deleteById(skladisteid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
