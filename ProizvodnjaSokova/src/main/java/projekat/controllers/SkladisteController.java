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

import projekat.models.Skladiste;
import projekat.services.SkladisteService;

@RestController
public class SkladisteController {
	
	@Autowired
	private SkladisteService skladisteService;
	
	public SkladisteController(SkladisteService skladisteService) {
		this.skladisteService = skladisteService;
	}
	
	@GetMapping("skladiste")
	public Collection<Skladiste> getAllSkladiste() {
		final var skladista = skladisteService.getAll();
		final var listaSkladista = skladista.stream().sorted(Comparator.comparingInt(Skladiste::getSkladisteid)).toList();
		return listaSkladista;
	}
	
	@GetMapping("skladiste/{skladisteid}")
	public Skladiste getSkladiste(@PathVariable Integer skladisteid) {
		final var oneSkladiste = skladisteService.getOne(skladisteid);
		return oneSkladiste;
	}
	
	@CrossOrigin
	@PostMapping("skladiste")
	public ResponseEntity<Skladiste> insertSkladiste(@RequestBody Skladiste skladiste) {
		skladisteService.insert(skladiste);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("skladiste/{skladisteid}")
	public ResponseEntity<Skladiste> updateSkladiste(@RequestBody Skladiste skladiste) {
		skladisteService.update(skladiste);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("skladiste/{skladisteid}")
	public ResponseEntity<Skladiste> deleteSkladiste(@PathVariable Integer skladisteid) {
		skladisteService.delete(skladisteid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
