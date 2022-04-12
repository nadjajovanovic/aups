package projekat.controllers;

import java.util.Collection;
import java.util.Comparator;

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
import projekat.services.PogonService;

@RestController
public class PogonController {
	
	@Autowired
	private PogonService pogonService;
	
	public PogonController(PogonService pogonService) {
		this.pogonService = pogonService;
	}
	
	@GetMapping("pogon")
	public Collection<Pogon> getAllPogon() {
		final var pogoni = pogonService.getAll();
		final var listaPogona = pogoni.stream().sorted(Comparator.comparingInt(Pogon::getPogonid)).toList();
		return listaPogona;
	}
	
	@GetMapping("pogon/{pogonid}")
	public Pogon getPogon(@PathVariable Integer pogonid) {
		final var onePogon = pogonService.getOne(pogonid);
		return onePogon;
	}
	
	@CrossOrigin
	@PostMapping("pogon")
	public ResponseEntity<Pogon> insertPogon(@RequestBody Pogon pogon) {
		pogonService.insert(pogon);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("pogon/{pogonid}")
	public ResponseEntity<Pogon> updatePogon(@RequestBody Pogon pogon) {
		pogonService.update(pogon);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("pogon/{pogonid}")
	public ResponseEntity<Pogon> deletePogon(@PathVariable Integer pogonid) {
		pogonService.delete(pogonid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
