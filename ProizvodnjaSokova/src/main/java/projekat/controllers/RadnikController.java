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

import projekat.models.Radnik;
import projekat.services.RadnikService;

@RestController
public class RadnikController {
	
	@Autowired
	private RadnikService radnikService;
	
	public RadnikController(RadnikService radnikService) {
		this.radnikService = radnikService;
	}
	
	@GetMapping("radnik")
	public Collection<Radnik> getAllRadnike() {
		final var radnici = radnikService.getAll();
		final var listaRadnika = radnici.stream().sorted(Comparator.comparingInt(Radnik::getRadnikid)).toList();
		return listaRadnika;
	}
	
	@GetMapping("radnik/{radnikid}")
	public Radnik getRadnika(@PathVariable Integer radnikid) {
		final var oneRadnik = radnikService.getOne(radnikid);
		return oneRadnik;
	}
	
	@CrossOrigin
	@PostMapping("radnik")
	public ResponseEntity<Radnik> insertRadnika(@RequestBody Radnik radnik) {
		radnikService.insert(radnik);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("radnik/{radnikid}")
	public ResponseEntity<Radnik> updateRadnika(@RequestBody Radnik radnik) {
		radnikService.update(radnik);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("radnik/{radnikid}")
	public ResponseEntity<Radnik> deletePogon(@PathVariable Integer radnikid) {
		radnikService.delete(radnikid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
