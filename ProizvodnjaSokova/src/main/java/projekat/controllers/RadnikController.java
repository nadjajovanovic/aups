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

import projekat.models.Radnik;
import projekat.repository.RadnikRepository;

@RestController
public class RadnikController {
	
	@Autowired
	private RadnikRepository radnikRepository;
	
	public RadnikController(RadnikRepository radnikRepository) {
		this.radnikRepository = radnikRepository;
	}
	
	@GetMapping("radnik")
	public Collection<Radnik> getAllRadnike() {
		return radnikRepository.findAll();
	}
	
	@GetMapping("radnik/{radnikid}")
	public Radnik getRadnika(@PathVariable Integer radnikid) {
		return radnikRepository.getById(radnikid);
	}
	
	@CrossOrigin
	@PostMapping("radnik")
	public ResponseEntity<Radnik> insertRadnika(@RequestBody Radnik radnik) {
		radnikRepository.save(radnik);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("radnik/{radnikid}")
	public ResponseEntity<Radnik> updateRadnika(@RequestBody Radnik radnik) {
		if(radnikRepository.existsById(radnik.getRadnikid()))
			radnikRepository.save(radnik);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("radnik/{radnikid}")
	public ResponseEntity<Radnik> deletePogon(@PathVariable Integer radnikid) {
		if(radnikRepository.existsById(radnikid))
			radnikRepository.deleteById(radnikid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
