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

import projekat.models.Pogon;
import projekat.repository.PogonRepository;

@RestController
public class PogonController {
	
	@Autowired
	private PogonRepository pogonRepository;
	
	public PogonController(PogonRepository pogonRepository) {
		this.pogonRepository = pogonRepository;
	}
	
	@GetMapping("pogon")
	public Collection<Pogon> getAllPogon() {
		return pogonRepository.findAll();
	}
	
	@GetMapping("pogon/{pogonid}")
	public Pogon getPogon(@PathVariable Integer pogonid) {
		return pogonRepository.getById(pogonid);
	}
	
	@CrossOrigin
	@PostMapping("pogon")
	public ResponseEntity<Pogon> insertPogon(@RequestBody Pogon pogon) {
		pogonRepository.save(pogon);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("pogon/{pogonid}")
	public ResponseEntity<Pogon> updatePogon(@RequestBody Pogon pogon) {
		if(pogonRepository.existsById(pogon.getPogonid()))
			pogonRepository.save(pogon);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("pogon/{pogonid}")
	public ResponseEntity<Pogon> deletePogon(@PathVariable Integer pogonid) {
		if(pogonRepository.existsById(pogonid))
			pogonRepository.deleteById(pogonid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
